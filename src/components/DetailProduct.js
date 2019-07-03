import React, { Component } from "react";
import { Button } from "reactstrap";

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
      <div className="card col-3 m-5">
        <img className="card-img-top" src={this.state.product.src} alt="" />
        <div className="card-body">
          <h5 className="card-title">{this.state.product.name} </h5>
          <p className="card-text">{this.state.product.desc}</p>
          <p className="card-text">Rp. {this.state.product.price}</p>
          <input type="text" />
          <Button color="primary">Add To Cart</Button>
        </div>
      </div>
    );
  }
}

export default DetailProduct;
