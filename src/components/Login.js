import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { onLoginUser } from "../action";
// import Axios from "axios";

class Login extends Component {
  onButtonClick = () => {
    const user = this.username.value;
    const pass = this.password.value;

    this.props.onLoginUser(user, pass);
  };

  render() {
    if (this.props.user.username === "") {
      return (
        <div>
          <div className="mt-5 row">
            <div className="col-sm-4 mx-auto card">
              <div className="card-body">
                <div className=" border-bottom border-secondary card-title">
                  <p>{this.props.user.username}</p>
                  <h1>Login</h1>
                </div>

                <div className="card-title">
                  <h4>Username</h4>
                </div>
                <form className="input-group">
                  <input
                    className="form-control"
                    type="text"
                    ref={input => {
                      this.username = input;
                    }}
                  />
                </form>

                <div className="card-title">
                  <h4>Password</h4>
                </div>
                <form className="input-group">
                  <input
                    className="form-control"
                    type="password"
                    ref={input => {
                      this.password = input;
                    }}
                  />
                </form>

                <button
                  onClick={this.onButtonClick}
                  className="btn btn-success"
                >
                  Login
                </button>
                <p>
                  Belum punya akun?
                  <Link to="/register">register here</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return <Redirect to="/" />;
  }
}
const mapStateToProps = state => {
  return {
    user: state.aut // {id, username}
  };
};

export default connect(
  mapStateToProps,
  { onLoginUser }
)(Login);
