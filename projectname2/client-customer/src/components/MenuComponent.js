import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";

class MenuComponent extends Component {

  constructor(props){
    super(props);
    this.state = {
      categories: [],
      txtKeyword: ""
    }
  }

  componentDidMount(){

    // ✅ FIX: bỏ localhost
    axios.get("/api/customer/categories")
    .then(res=>{
      this.setState({categories: res.data})
    })

  }

  renderCategories(){
    return this.state.categories.map((item)=>(
      <Link key={item._id} to={"/product/category/"+item._id}>
        {item.name.toUpperCase()} &nbsp;&nbsp;
      </Link>
    ))
  }

  handleInput(e){
    this.setState({txtKeyword: e.target.value})
  }

  btnSearchClick(e){
    e.preventDefault()
    window.location.href = "/product/search/"+this.state.txtKeyword
  }

  render(){
    return(
      <div>

        <Link to="/home">HOME</Link> &nbsp;&nbsp;

        {this.renderCategories()}

        <span style={{float:"right"}}>

          <input
            type="text"
            placeholder="Enter keyword"
            value={this.state.txtKeyword}
            onChange={(e)=>this.handleInput(e)}
          />

          <button onClick={(e)=>this.btnSearchClick(e)}>
            SEARCH
          </button>

        </span>

        <br/>

        <hr/>

      </div>
    )
  }

}

export default MenuComponent;