import React, { Component } from 'react';
import MyContext from './MyContext';
import axios from 'axios';

class MyProvider extends Component {

  constructor(props) {
    super(props);

    this.state = {
      token: '',
      customer: null,
      mycart: [],

      setToken: this.setToken,
      setCustomer: this.setCustomer,
      setMycart: this.setMycart
    };
  }

  componentDidMount() {

    // ✅ FIX QUAN TRỌNG
    axios.defaults.baseURL = '';

    axios.interceptors.request.use(config => {

      const token = localStorage.getItem("token");

      if (token) {
        config.headers['x-access-token'] = token;
      }

      return config;
    });

    // ================= LOAD LOCAL =================
    let token = localStorage.getItem("token") || '';

    let customer = null;
    try {
      customer = JSON.parse(localStorage.getItem("customer"));
    } catch {
      customer = null;
    }

    let mycart = [];
    try {
      mycart = JSON.parse(localStorage.getItem("mycart")) || [];
    } catch {
      mycart = [];
    }

    if (token && customer) {
      this.setState({
        token: token,
        customer: customer
      });
    }

    this.setState({ mycart: mycart });
  }

  setToken = (value) => {
    const cleanToken =
      typeof value === "string" ? value : value?.token;

    this.setState({ token: cleanToken });

    localStorage.setItem("token", cleanToken);
  }

  setCustomer = (value) => {
    this.setState({ customer: value });
    localStorage.setItem("customer", JSON.stringify(value));
  }

  setMycart = (value) => {

    const cart = value || [];

    this.setState({ mycart: cart });

    localStorage.setItem("mycart", JSON.stringify(cart));
  }

  render() {
    return (
      <MyContext.Provider value={this.state}>
        {this.props.children}
      </MyContext.Provider>
    );
  }
}

export default MyProvider;