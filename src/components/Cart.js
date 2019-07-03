import React, { Component } from "react";
import Axios from "axios";
import { Link, Redirect } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Col, Form, FormGroup, Label } from "reactstrap";
import { connect } from "react-redux";

class Cart extends Component {
  state = {
    cart: [],
    userid: {}
  };

  componentDidMount() {
    Axios.get("http://localhost:2019/cart", {
      params: {
        userid: this.props.user.id
      }
    }).then(res => {
      this.setState({ cart: res.data });
    });
  }

  getcart() {
    Axios.get("http://localhost:2019/cart", {
      params: {
        userid: this.props.user.id
      }
    }).then(res => {
      this.setState({ cart: res.data });
    });
  }

  Hapus = x => {
    Axios.delete(`http://localhost:2019/cart/${x}`).then(res => {
      this.getcart();
    });
  };

  totalharga = () => {
    var totalharga = 0;
    for (var i = 0; i < this.state.cart.length; i++) {
      totalharga += this.state.cart[i].qty * this.state.cart[i].price;
    }
    return totalharga;
  };

  cekout = () => {
    return this.state.cart.map(val => (
      <tr>
        <td>{val.id}</td>
        <td>{val.nameproduct}</td>
        <td>{val.qty}</td>
        <td>{val.price}</td>
        <td>{val.price * val.qty}</td>
      </tr>
    ));
  };

  cartmap = () => {
    return this.state.cart.map(val => (
      <tr>
        <td>{val.productid}</td>
        <td>{val.nameproduct}</td>
        <td>{val.desc}</td>
        <td>Rp. {val.price}</td>
        <td>{val.qty}</td>
        <td>
          <img className="list" src={val.src} alt="" />
        </td>
        <td>Rp. {val.price}</td>
        <td>
          <Button
            color="danger"
            onClick={() => {
              this.Hapus(val.id);
            }}
          >
            Delete
          </Button>
        </td>
      </tr>
    ));
  };

  render() {
    if (this.props.user.username === "") {
      return <Redirect to="/login" />;
    } else {
      return (
        <div className="container">
          <div className="d-flex justify-content-end">
            <Link to="/">
              <Button color="success">Continue Shopping</Button>
            </Link>
          </div>
          <h1 className="display-7 text-center">Cart Product</h1>
          <table className="table table-hover mb-4">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">NAME</th>
                <th scope="col">DESC</th>
                <th scope="col">PRICE</th>
                <th scope="col">QTY</th>
                <th scope="col">Picture</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>{this.cartmap()}</tbody>
            <tr>
              <Button color="primary" className="d-flex justify-">
                Checkout
              </Button>
            </tr>
          </table>
          <div>
            <table className="table table-hover mb-4">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">NAME</th>
                  <th scope="col">QTY</th>
                  <th scope="col">PRICE</th>
                  <th scope="col">TOTAL</th>
                </tr>
              </thead>
              <tbody>{this.cekout()}</tbody>
              <tbody>
                <tr>
                  <td />
                  <td />
                  <td />
                  <td>TOTAL</td>
                  <td>{this.totalharga()}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return { user: state.aut };
};

export default connect(mapStateToProps)(Cart);
