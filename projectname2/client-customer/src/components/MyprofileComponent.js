import React, { Component } from "react";
import axios from "axios";
import MyContext from "../contexts/MyContext";

class MyProfileComponent extends Component {

  static contextType = MyContext;

  constructor(props){
    super(props);

    this.state = {
      _id: "",
      txtUsername: "",
      txtPassword: "",
      txtName: "",
      txtPhone: "",
      txtEmail: ""
    };
  }

  componentDidMount(){
    const customer = this.context.customer;

    if(customer){
      this.setState({
        _id: customer._id,
        txtUsername: customer.username,
        txtPassword: customer.password,
        txtName: customer.name,
        txtPhone: customer.phone,
        txtEmail: customer.email
      });
    }
  }

  render(){
    return(
      <div align="center">
        <h2>MY PROFILE</h2>

        <table>
          <tbody>

            <tr>
              <td>Username</td>
              <td>
                <input
                  value={this.state.txtUsername}
                  readOnly
                />
              </td>
            </tr>

            <tr>
              <td>Password</td>
              <td>
                <input
                  type="password"
                  value={this.state.txtPassword}
                  onChange={(e)=>this.setState({txtPassword:e.target.value})}
                />
              </td>
            </tr>

            <tr>
              <td>Name</td>
              <td>
                <input
                  value={this.state.txtName}
                  onChange={(e)=>this.setState({txtName:e.target.value})}
                />
              </td>
            </tr>

            <tr>
              <td>Phone</td>
              <td>
                <input
                  value={this.state.txtPhone}
                  onChange={(e)=>this.setState({txtPhone:e.target.value})}
                />
              </td>
            </tr>

            <tr>
              <td>Email</td>
              <td>
                <input
                  value={this.state.txtEmail}
                  onChange={(e)=>this.setState({txtEmail:e.target.value})}
                />
              </td>
            </tr>

            <tr>
              <td></td>
              <td>
                <button onClick={()=>this.btnUpdateClick()}>
                  UPDATE
                </button>
              </td>
            </tr>

          </tbody>
        </table>
      </div>
    )
  }

  // ================= UPDATE =================
  btnUpdateClick(){

    // 🔥 LẤY TOKEN CHẮC CHẮN
    const token = this.context.token || localStorage.getItem("token");

    console.log("TOKEN:", token);

    if(!token){
      alert("Please login again");
      return;
    }

    const config = {
      headers: {
        "x-access-token": token // 🔥 GỬI TRỰC TIẾP
      }
    };

    const body = {
      username: this.state.txtUsername,
      password: this.state.txtPassword,
      name: this.state.txtName,
      phone: this.state.txtPhone,
      email: this.state.txtEmail
    };

    axios.put(
      "/api/customer/customers/" + this.state._id,
      body,
      config
    )
    .then(res => {

      const result = res.data;

      console.log("UPDATE RESPONSE:", result);

      if(result){

        alert("Update successful!");

        // 🔥 update UI ngay
        this.setState({
          txtUsername: result.username,
          txtPassword: result.password,
          txtName: result.name,
          txtPhone: result.phone,
          txtEmail: result.email
        });

        // 🔥 update context
        this.context.setCustomer(result);

        // 🔥 lưu local
        localStorage.setItem("customer", JSON.stringify(result));
      }

    })
    .catch(err => {
      console.error("UPDATE ERROR:", err);
      alert("Update failed!");
    });

  }

}

export default MyProfileComponent;