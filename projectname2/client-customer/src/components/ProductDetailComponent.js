import axios from "axios";
import React, { Component } from "react";
import { withRouter } from "../utils/withRouter";
import MyContext from "../contexts/MyContext";

const API_URL = "https://your-api.replit.app";

class ProductDetailComponent extends Component {

  static contextType = MyContext;

  constructor(props){
    super(props);
    this.state={
      product: null,
      txtQuantity: 1
    }
  }

  componentDidMount(){
    this.apiGetProduct();
  }

  apiGetProduct(){
    const id = this.props.router.params.id;

    axios
      .get(`${API_URL}/api/customer/products/` + id)
      .then(res=>{
        this.setState({product: res.data})
      });
  }

  getImage(url){
    if(!url) return "";
    let clean = url.replace(/^\/?uploads\/?/,"");
    return `${API_URL}/uploads/${clean}`;
  }

  render(){

    const p = this.state.product;

    if(p==null){
      return <h2 style={{textAlign:"center"}}>Loading...</h2>
    }

    return(

      <div style={{width:"90%",margin:"auto"}}>

        <button
          onClick={()=>this.props.router.navigate(-1)}
          style={{ marginTop:"20px", padding:"8px 18px", cursor:"pointer" }}
        >
          ← Back
        </button>

        <h2 style={{textAlign:"center",marginTop:"10px"}}>
          PRODUCT DETAILS
        </h2>

        <div style={{
          display:"flex",
          justifyContent:"center",
          alignItems:"center",
          marginTop:"30px"
        }}>

          {p.images?.length > 0 && (
            <img
              src={this.getImage(p.images[0])}
              alt=""
              style={{
                width:"420px",
                height:"420px",
                objectFit:"cover"
              }}
            />
          )}

          <div style={{marginLeft:"60px"}}>

            <p><b>ID:</b> {p._id}</p>
            <p><b>Name:</b> {p.name}</p>

            <p style={{color:"red",fontWeight:"bold"}}>
              <b>Price:</b> {p.price}
            </p>

            <p>
              <b>Category:</b>
              {p.categories_id && p.categories_id.length > 0
                ? p.categories_id[0].name
                : ""}
            </p>

            <p>
              <b>Quantity:</b>
              <input
                type="number"
                min="1"
                max="99"
                value={this.state.txtQuantity}
                onChange={(e)=>this.setState({txtQuantity: e.target.value})}
                style={{width:"60px",marginLeft:"10px"}}
              />
            </p>

            <button
              onClick={(e)=>this.btnAdd2CartClick(e)}
              style={{
                padding:"10px 20px",
                marginTop:"10px",
                cursor:"pointer",
                background:"#ff4d4d",
                border:"none",
                color:"#fff"
              }}
            >
              ADD TO CART
            </button>

          </div>

        </div>

      </div>

    )
  }

  btnAdd2CartClick(e){
    e.preventDefault();

    const product = this.state.product;
    const quantity = parseInt(this.state.txtQuantity);

    if(quantity){
      const mycart = [...this.context.mycart];

      const index = mycart.findIndex(
        x => x.product._id === product._id
      );

      if(index === -1){
        mycart.push({ product, quantity });
      }else{
        mycart[index].quantity += quantity;
      }

      this.context.setMycart(mycart);

      alert("🛒 Thêm vào giỏ hàng thành công!");
    }else{
      alert("Vui lòng nhập số lượng");
    }
  }

}

export default withRouter(ProductDetailComponent);