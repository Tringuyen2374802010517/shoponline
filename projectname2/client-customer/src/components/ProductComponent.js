import axios from "axios";
import React, { Component } from "react";
import { withRouter } from "../utils/withRouter";

const API_URL = "https://your-api.replit.app";

class ProductComponent extends Component {

  constructor(props){
    super(props);
    this.state={
      products:[]
    }
  }

  componentDidMount(){
    this.apiGetProducts();
  }

  componentDidUpdate(prevProps){
    const oldPath = prevProps.router.location.pathname;
    const newPath = this.props.router.location.pathname;

    if(oldPath !== newPath){
      this.apiGetProducts();
    }
  }

  apiGetProducts(){
    const cid = this.props.router.params.cid;
    const keyword = this.props.router.params.keyword;

    if(cid){
      axios.get(`${API_URL}/api/customer/products/category/` + cid)
        .then(res=>{
          this.setState({products: res.data})
        })
    }
    else if(keyword){
      axios.get(`${API_URL}/api/customer/products/search/` + keyword)
        .then(res=>{
          this.setState({products: res.data})
        })
    }
    else{
      axios.get(`${API_URL}/api/customer/products`)
        .then(res=>{
          this.setState({products: res.data})
        })
    }
  }

  getImage(url){
    if(!url) return "";

    // loại bỏ /uploads hoặc uploads nếu đã có
    let clean = url.replace(/^\/?uploads\/?/,"");

    return `${API_URL}/uploads/${clean}`;
  }

  renderProducts(){
    return this.state.products.map((item)=>(
      <div
        key={item._id}
        onClick={()=>this.props.router.navigate("/product/"+item._id)}
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

        {item.images?.length > 0 && (
          <img
            src={this.getImage(item.images[0])}
            alt=""
            style={{
              width:"260px",
              height:"260px",
              objectFit:"cover",
              borderRadius:"8px"
            }}
          />
        )}

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
          LIST PRODUCTS
        </h2>

        <div style={{textAlign:"center"}}>
          {this.renderProducts()}
        </div>

      </div>
    )
  }

}

export default withRouter(ProductComponent);