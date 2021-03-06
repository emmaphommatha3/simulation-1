import React, { Component } from 'react';
import axios from 'axios';

import Product from '../Product/Product.js';
// import Form from '../Form/Form.js';

class Dashboard extends Component {
  constructor() {
    super()
    this.state = {
      products: [],
      name: '',
      price: '',
      imageurl: '',
      productid: '',
    }
    this.deleteProduct = this.deleteProduct.bind(this)
  }

  componentDidMount() {
    axios.get('/api/products').then(res => {
      this.setState({
        products: res.data
      })
    });
  }

  deleteProduct(id) {
    axios.delete(`/api/product/${id}`).then(res => {
      this.setState({
        products: res.data
      })
    })
  }

  render() {
    const { products, name, price, imageurl } = this.state;
    let newProduct = products.map((product, i) => {
      const { name, price, imageurl, productid } = product;
      return (
        <Product deleteProduct={this.deleteProduct} name={name} price={price} imageurl={imageurl} product={product} productid={productid} />
      )
    });

    return (
      <div>
        {newProduct}
      </div>
    )
  }
}


export default Dashboard;