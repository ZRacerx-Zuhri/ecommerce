import React, { Component } from "react";
import Axios from "axios";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Col, Form, FormGroup, Label } from "reactstrap";
//import Modals from "./Modals";

class ManageProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: [],
      modal: false,
      editproduct: {}
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  edit1(data) {
    this.toggle();
    this.setState({ editproduct: data });
  }

  edit2 = () => {
    const desc = this.nameddes.value;
    const name = this.named.value;
    const price = parseInt(this.namedharga.value).toLocaleString();
    const pict = this.namedpic.value;
    Axios.put(`http://localhost:2019/product/${this.state.editproduct.id}`, {
      desc,
      name,
      price,
      src: pict
    }).then(res => {
      //
      this.getProduct();
    });
    this.toggle();
  };

  componentDidMount() {
    // Akses database
    this.getProduct();
  }

  getProduct = () => {
    Axios.get("http://localhost:2019/product").then(res => {
      this.setState({ product: res.data });
      console.log(res);
    });
  };

  hapus = x => {
    Axios.delete(`http://localhost:2019/product/${x}`).then(res => {
      console.log(res);
      this.getProduct();
    });
  };

  edit3() {}
  addProduct = () => {
    const name = this.name.value;
    const desc = this.desc.value;
    const price = parseInt(this.price.value);
    const pict = this.pic.value;

    Axios.post("http://localhost:2019/product", {
      name,
      desc,
      price,
      src: pict
    }).then(res => {
      // GET DATA
      this.getProduct();
    });
  };

  RenderList = () => {
    return this.state.product.map(item => {
      return (
        <tr>
          <td contentEditable="true">{item.id}</td>
          <td>{item.name}</td>
          <td>{item.desc}</td>
          <td>Rp. {item.price}</td>
          <td>
            <img className="list" src={item.src} alt="" />
          </td>
          <td>
            <Button
              color="primary"
              onClick={() => {
                this.edit1(item);
              }}
            >
              Edit
            </Button>
            <td>
              <Modal
                isOpen={this.state.modal}
                toggle={this.toggle}
                className={this.props.className}
              >
                <ModalHeader toggle={this.toggle}>ubah product</ModalHeader>
                <ModalBody />

                <Form>
                  <FormGroup row>
                    <Label sm={2}>Name</Label>
                    <Col sm={10}>
                      <input
                        className="form-control"
                        type="text"
                        ref={input => {
                          this.named = input;
                        }}
                        defaultValue={this.state.editproduct.name}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label sm={2}>Desc</Label>
                    <Col sm={10}>
                      <input
                        className="form-control"
                        type="text"
                        ref={input => {
                          this.nameddes = input;
                        }}
                        defaultValue={this.state.editproduct.desc}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label sm={2}>Price</Label>
                    <Col sm={10}>
                      <input
                        className="form-control"
                        type="text"
                        ref={input => {
                          this.namedharga = input;
                        }}
                        defaultValue={this.state.editproduct.price}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label sm={2}>Picture</Label>
                    <Col sm={10}>
                      <input
                        className="form-control"
                        type="text"
                        ref={input => {
                          this.namedpic = input;
                        }}
                        defaultValue={this.state.editproduct.pict}
                      />
                    </Col>
                  </FormGroup>
                </Form>
                <ModalFooter>
                  <Button
                    color="primary"
                    onClick={() => {
                      this.edit2(item);
                    }}
                  >
                    Save
                  </Button>{" "}
                  <Button color="secondary" onClick={this.toggle}>
                    Cancel
                  </Button>
                </ModalFooter>
              </Modal>
            </td>
          </td>
          <td>
            <button
              className="btn btn-warning"
              onClick={() => {
                this.hapus(item.id);
              }}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  };

  render() {
    return (
      <div className="container">
        <h1 className="display-4 text-center">List Product</h1>
        <table className="table table-hover mb-5">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">NAME</th>
              <th scope="col">DESC</th>
              <th scope="col">PRICE</th>
              <th scope="col">PICTURE</th>
              <th scope="col">ACTION</th>
            </tr>
          </thead>
          <tbody>{this.RenderList()}</tbody>
          <tbody />
        </table>
        <h1 className="display-4 text-center">Input Product</h1>
        <table className="table text-center">
          <thead>
            <tr>
              <th scope="col">NAME</th>
              <th scope="col">DESC</th>
              <th scope="col">PRICE</th>
              <th scope="col">PICTURE</th>
              <th scope="col">ACTION</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="col">
                <input
                  ref={input => (this.name = input)}
                  className="form-control"
                  type="text"
                />
              </th>
              <th scope="col">
                <input
                  ref={input => (this.desc = input)}
                  className="form-control"
                  type="text"
                />
              </th>
              <th scope="col">
                <input
                  ref={input => (this.price = input)}
                  className="form-control"
                  type="text"
                />
              </th>
              <th scope="col">
                <input
                  ref={input => (this.pic = input)}
                  className="form-control"
                  type="text"
                />
              </th>
              <th scope="col">
                <button
                  className="btn btn-outline-warning"
                  onClick={this.addProduct}
                >
                  Add
                </button>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default ManageProduct;
