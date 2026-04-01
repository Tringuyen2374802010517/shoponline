import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "../utils/withRouter";
import MyContext from "../contexts/MyContext";

class LoginComponent extends Component {

  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      txtUsername: "",
      txtPassword: "",
      message: ""
    };
  }

  handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState({
      [name]: value
    });
  };

  btnLoginClick = (e) => {

    e.preventDefault();

    const account = {
      username: this.state.txtUsername,
      password: this.state.txtPassword
    };

    // ✅ FIX: bỏ localhost
    axios.post("/api/customer/login", account)

      .then(res => {

        const result = res.data;

        if (result.success === true) {

          // clear localStorage
          localStorage.clear();

          // lưu token + customer
          localStorage.setItem("token", result.token);
          localStorage.setItem("customer", JSON.stringify(result.customer));

          // cập nhật Context
          this.context.setToken(result.token);
          this.context.setCustomer(result.customer);

          console.log("TOKEN:", result.token);

          alert("Login success");

          this.props.router.navigate("/home");

        }
        else {
          this.setState({
            message: result.message
          });
        }

      })

      .catch(err => {
        console.error(err);
      });

  };

  render() {

    return (

      <div align="center">

        <h2>LOGIN</h2>

        <form>

          <table>

            <tbody>

              <tr>
                <td>Username</td>
                <td>
                  <input
                    type="text"
                    name="txtUsername"
                    value={this.state.txtUsername}
                    onChange={this.handleInputChange}
                  />
                </td>
              </tr>

              <tr>
                <td>Password</td>
                <td>
                  <input
                    type="password"
                    name="txtPassword"
                    value={this.state.txtPassword}
                    onChange={this.handleInputChange}
                  />
                </td>
              </tr>

              <tr>
                <td></td>
                <td>
                  <button
                    type="button"
                    onClick={this.btnLoginClick}
                  >
                    LOGIN
                  </button>
                </td>
              </tr>

            </tbody>

          </table>

        </form>

        <h3>{this.state.message}</h3>

      </div>

    );

  }

}

export default withRouter(LoginComponent);