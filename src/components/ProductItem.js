import React, { Component } from "react";
import { Link } from "react-router-dom";

class ProductItem extends Component {
  render() {
    var { id, name, desc, price, src } = this.props.barang;
    return (
      <div className="card col-3 m-5">
        <img className="card-img-top" src={src} alt="" />
        <div className="card-body">
          <h5 className="card-title">{name} </h5>
          <p className="card-text">{desc}</p>
          <p className="card-text">Rp. {price}</p>
          <input type="text" />
          <Link to={`/detailproduct/${id}`}>
            <button>Details</button>
          </Link>
          <button>Add To Cart</button>
        </div>
      </div>
    );
  }
}

export default ProductItem;
