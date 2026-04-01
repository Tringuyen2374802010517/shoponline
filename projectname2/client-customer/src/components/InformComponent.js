import React, { Component } from "react";
import { Link } from "react-router-dom";
import MyContext from "../contexts/MyContext";

class InformComponent extends Component {

  static contextType = MyContext;

  render(){

    return(

      <div style={{marginBottom:"10px"}}>

        <div style={{float:"left"}}>

          {this.context.token === "" ?

            <div>
              <Link to="/login">Login</Link> |{" "}
              <Link to="/signup">Sign-up</Link> |{" "}
              <Link to="/active">Active</Link>
            </div>

          :

            <div>
              Hello <b>{this.context.customer.name}</b> |{" "}
              <Link to="/home" onClick={()=>this.lnkLogoutClick()}>
                Logout
              </Link> |{" "}
              <Link to="/myprofile">My profile</Link> |{" "}
              <Link to="/myorders">My orders</Link>
            </div>

          }

        </div>

        <div style={{float:"right"}}>
          <Link to="/mycart">
            My cart have <b>{this.context.mycart.length}</b> items
          </Link>
        </div>

        <div style={{clear:"both"}}></div>

        <hr/>

      </div>

    )
  }

  lnkLogoutClick(){
    this.context.setToken("");
    this.context.setCustomer(null);

    // 🔥 clear giỏ hàng khi logout
    this.context.setMycart([]);
  }

}

export default InformComponent;