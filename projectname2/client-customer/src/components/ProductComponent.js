import axios from "axios";
import React, { Component } from "react";
import { withRouter } from "../utils/withRouter";

// ✅ FIX: dùng đúng link backend của bạn
const API_URL = "https://shoponline--tringuyen210120.replit.app";

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

  // ================= API =================
  apiGetProducts(){
    const cid = this.props.router.params.cid;
    const keyword = this.props.router.params.keyword;

    // 👉 Debug xem có nhận param không
    console.log("CID:", cid);
    console.log("KEYWORD:", keyword);

    // ================= CATEGORY =================
    if(cid){
      axios.get(`${API_URL}/api/customer/products/category/${cid}`)
        .then(res=>{
          console.log("CATEGORY DATA:", res.data);
          this.setState({products: res.data})
        })
        .catch(err=>{
          console.log("CATEGORY ERROR:", err);
        })
    }

    // ================= SEARCH =================
    else if(keyword){
      axios.get(`${API_URL}/api/customer/products/search/${keyword}`)
        .then(res=>{
          console.log("SEARCH DATA:", res.data);
          this.setState({products: res.data})
        })
        .catch(err=>{
          console.log("SEARCH ERROR:", err);
        })
    }

    // ================= ALL =================
    else{
      axios.get(`${API_URL}/api/customer/products`)
        .then(res=>{
          console.log("ALL DATA:", res.data);
          this.setState({products: res.data})
        })
        .catch(err=>{
          console.log("ALL ERROR:", err);
        })
    }
  }

  // ================= IMAGE =================
  getImage(url){
    if(!url) return "";

    // loại bỏ /uploads nếu đã có
    let clean = url.replace(/^\/?uploads\/?/,"");

    return `${API_URL}/uploads/${clean}`;
  }

  // ================= RENDER LIST =================
  renderProducts(){

    // 👉 nếu không có sản phẩm
    if(this.state.products.length === 0){
      return <h3>Không có sản phẩm</h3>
    }

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

        {/* IMAGE */}
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

        {/* NAME */}
        <h4 style={{marginTop:"10px"}}>{item.name}</h4>

        {/* PRICE */}
        <p style={{color:"red",fontWeight:"bold"}}>
          Price: {item.price}
        </p>

      </div>
    ))
  }

  // ================= UI =================
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