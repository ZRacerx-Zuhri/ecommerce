import React, { Component } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Home from "./Home";
import Header from "./Header";
import cookies from "universal-cookie";
import { connect } from "react-redux";
import { keeplogin } from "../action";

import ManageProduct from "./ManageProduct";
import DetailProduct from "./DetailProduct";

const cookie = new cookies();

class App extends Component {
  componentDidMount() {
    const objCookie = cookie.get("userName");
    if (objCookie !== undefined) {
      this.props.keeplogin(objCookie);
    }
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Route path="/" exact component={Home} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/manageproduct" component={ManageProduct} />
          <Route path="/detailproduct/:product_id" component={DetailProduct} />
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(
  null,
  { keeplogin }
)(App);
