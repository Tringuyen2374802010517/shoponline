import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "../utils/withRouter";

class SignupComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      txtUsername: "",
      txtPassword: "",
      txtName: "",
      txtPhone: "",
      txtEmail: "",
      message: ""
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });
  };

  btnSignupClick = (e) => {
    e.preventDefault();

    const account = {
      username: this.state.txtUsername,
      password: this.state.txtPassword,
      name: this.state.txtName,
      phone: this.state.txtPhone,
      email: this.state.txtEmail
    };

    // ✅ FIX
    axios.post("/api/customer/signup", account)

      .then((res) => {
        const result = res.data;

        this.setState({
          message: result.message
        });
      })

      .catch((err) => {
        console.log(err);

        this.setState({
          message: "Server error"
        });
      });
  };

  render() {
    return (
      <div align="center">

        <h2>SIGN-UP</h2>

        <form onSubmit={this.btnSignupClick}>

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
                <td>Name</td>
                <td>
                  <input
                    type="text"
                    name="txtName"
                    value={this.state.txtName}
                    onChange={this.handleInputChange}
                  />
                </td>
              </tr>

              <tr>
                <td>Phone</td>
                <td>
                  <input
                    type="text"
                    name="txtPhone"
                    value={this.state.txtPhone}
                    onChange={this.handleInputChange}
                  />
                </td>
              </tr>

              <tr>
                <td>Email</td>
                <td>
                  <input
                    type="text"
                    name="txtEmail"
                    value={this.state.txtEmail}
                    onChange={this.handleInputChange}
                  />
                </td>
              </tr>

              <tr>
                <td></td>
                <td>
                  <input type="submit" value="SIGN-UP" />
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

export default withRouter(SignupComponent);