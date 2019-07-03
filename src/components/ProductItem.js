import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { Button } from "reactstrap";
import axios from "axios";
import { Col, Form, FormGroup, Label } from "reactstrap";
import { connect } from "react-redux";

class ProductItem extends Component {
  state = {
    cartproses: {}
  };

  tocart = () => {
    var { id, name, desc, price, src } = this.props.barang;
    const pricecart = price;
    const productid = id;
    const userid = this.props.user.id;
    const picpro = src;
    const des = desc;
    const nameproduct = name;
    const qty = parseInt(this.jumlah.value);

    if (qty <= 0) {
      alert("Qty Belum dimasukan");
    } else {
      axios
        .post(" http://localhost:2019/cart", {
          productid: productid,
          userid: userid,
          nameproduct: nameproduct,
          price: pricecart,
          desc: des,
          src: picpro,
          qty: qty
        })
        .then(res => this.setState({ cartproses: res.data }));
      alert("Data Berhasil Masuk Cart");
    }
  };

  render() {
    var { id, name, desc, price, src } = this.props.barang;

    if (this.props.user.username == "") {
      return <Redirect to="/login" />;
    } else {
      return (
        <div className="card col-3 m-5">
          <img className="card-img-top" src={src} alt="" />
          <div className="card-body">
            <h5 className="card-title">{name} </h5>
            <p className="card-text">{desc}</p>
            <p className="card-text">Rp. {price}</p>
            <input
              placeholder="0"
              type="number"
              ref={input => {
                this.jumlah = input;
              }}
            />
            <p />
            <Link to={`/detailproduct/${id}`}>
              <Button color="success">Details</Button>
            </Link>
            <Button
              color="primary"
              onClick={() => {
                this.tocart();
              }}
            >
              Add To Cart
            </Button>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return { user: state.aut };
};

export default connect(mapStateToProps)(ProductItem);
