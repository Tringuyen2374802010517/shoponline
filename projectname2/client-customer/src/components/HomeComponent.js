import axios from "axios";
import React, { Component } from "react";

class HomeComponent extends Component {

  constructor(props){
    super(props);
    this.state={
      newproducts:[],
      hotproducts:[]
    }
  }

  componentDidMount(){

    // ✅ FIX API
    axios.get("/api/customer/products/new")
    .then(res=>{
      this.setState({newproducts: res.data})
    })

    axios.get("/api/customer/products/hot")
    .then(res=>{
      this.setState({hotproducts: res.data})
    })

  }

  renderProducts(list){
    return list.map((item)=>(
      <div
        key={item._id}
        onClick={()=>window.location="/product/"+item._id}
        style={{
          width:"23%",
          display:"inline-block",
          margin:"1%",
          background:"#fff",
          borderRadius:"10px",
          boxShadow:"0 2px 8px rgba(0,0,0,0.1)",
          padding:"15px",
          textAlign:"center",
          verticalAlign:"top",
          cursor:"pointer"
        }}
      >

        <img
          src={"/uploads/" + item.images[0]}   // ✅ FIX IMAGE
          alt=""
          style={{
            width:"260px",
            height:"260px",
            objectFit:"cover",
            borderRadius:"8px"
          }}
        />

        <h4 style={{marginTop:"10px"}}>{item.name}</h4>

        <p style={{color:"red",fontWeight:"bold"}}>
          Price: {item.price}
        </p>

      </div>
    ))
  }

  render(){
    return(
      <div style={{width:"90%",margin:"auto"}}>

        <h2 style={{textAlign:"center",marginTop:"20px"}}>
          NEW PRODUCTS
        </h2>

        <div style={{textAlign:"center"}}>
          {this.renderProducts(this.state.newproducts)}
        </div>

        <h2 style={{textAlign:"center",marginTop:"40px"}}>
          HOT PRODUCTS
        </h2>

        <div style={{textAlign:"center"}}>
          {this.renderProducts(this.state.hotproducts)}
        </div>

      </div>
    )
  }

}

export default HomeComponent;