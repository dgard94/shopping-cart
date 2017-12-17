import React, { Component } from 'react';
import Nav from "./components/Nav";
import ItemPage from "./components/ItemPage";
import CartPage from "./components/CartPage";

import "./index.css";
import { items } from "./static-data";


class App extends Component {

  state = {
    activeTab: 0,
    cart: []
  } 

  handleTabChange = (index) => {
    this.setState({
      activeTab: index
    })
  }

  handleAddToCart = (item) => {
    this.setState({
      cart: [...this.state.cart, item.id]
    });
  }

  handleRemoveOne = (item) => {
    let index = this.state.cart.indexOf(item.id);
    this.setState({
      cart:[
        ...this.state.cart.slice(0, index),
        ...this.state.cart.slice(index + 1)
      ]
    })
  }

  renderContent(){
    switch(this.state.activeTab){
      default:
      case 0: return(
          <ItemPage 
            items={ items } 
            onAddToCart={ this.handleAddToCart }/>
        ); 
      case 1: return this.renderCart();
    }
  }

  renderCart(){
    let itemsCounts = this.state.cart.reduce((itemsCounts, itemId) => {
      itemsCounts[itemId] = itemsCounts[itemId] || 0;
      itemsCounts[itemId]++;
      return itemsCounts;
    }, {});

    let cartItems = Object.keys(itemsCounts).map(itemId => {
      var item = items.find(item => 
        item.id === parseInt(itemId, 10)
      );

      return {
        ...item,
        count: itemsCounts[itemId]
      }
    })


    return(
        <CartPage 
          items={ cartItems } 
          onAddOne={ this.handleAddToCart }
          onRemoveOne={ this.handleRemoveOne } />
      )
  }


  render() {
    let { activeTab } = this.state; 
    return (
      <div className="App">
        <Nav activeTab={ activeTab } onTabChange={ this.handleTabChange }/>
        <main className="App-content">
          {this.renderContent()}
        </main>
      </div>
    );
  }
}

export default App;