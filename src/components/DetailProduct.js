import React, { Component } from "react";
// import { Button } from "react-bootstrap";

import axios from "axios";

class DetailProduct extends Component {
  state = {
    product: {}
  };

  componentDidMount() {
    let proid = this.props.match.params.product_id;

    axios
      .get("http://localhost:2019/product/" + proid)
      .then(res => this.setState({ product: res.data }));
  }

  render() {
    return (
      <div>
        <h1>Detail Product: {this.state.product.id}</h1>
        <h1>
          pic
          <img src={this.state.product.src} />
        </h1>
        <h1>Detail Product: {this.state.product.name}</h1>
      </div>
    );
  }
}

export default DetailProduct;
