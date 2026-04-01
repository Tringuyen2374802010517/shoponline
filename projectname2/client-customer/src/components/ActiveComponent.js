import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "../utils/withRouter";

class ActiveComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      txtID: "",
      txtToken: "",
      message: ""
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });
  };

  btnActiveClick = (e) => {
    e.preventDefault();

    const account = {
      id: this.state.txtID,
      token: this.state.txtToken
    };

    // ✅ FIX: bỏ localhost
    axios.post("/api/customer/active", account)

      .then((res) => {

        if (res.data) {
          this.setState({
            message: "Account activated successfully"
          });
        } else {
          this.setState({
            message: "Activation failed"
          });
        }

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

        <h2>ACTIVE ACCOUNT</h2>

        <form onSubmit={this.btnActiveClick}>

          <table>

            <tbody>

              <tr>
                <td>ID</td>
                <td>
                  <input
                    type="text"
                    name="txtID"
                    value={this.state.txtID}
                    onChange={this.handleInputChange}
                  />
                </td>
              </tr>

              <tr>
                <td>Token</td>
                <td>
                  <input
                    type="text"
                    name="txtToken"
                    value={this.state.txtToken}
                    onChange={this.handleInputChange}
                  />
                </td>
              </tr>

              <tr>
                <td></td>
                <td>
                  <input type="submit" value="ACTIVE" />
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

export default withRouter(ActiveComponent);