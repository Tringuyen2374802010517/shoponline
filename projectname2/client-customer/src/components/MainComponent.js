import React, { Component } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import MenuComponent from "./MenuComponent";
import InformComponent from "./InformComponent";
import HomeComponent from "./HomeComponent";
import ProductComponent from "./ProductComponent";
import ProductDetailComponent from "./ProductDetailComponent";

import SignupComponent from "./SignupComponent";
import LoginComponent from "./LoginComponent";
import ActiveComponent from "./ActiveComponent";
import MyprofileComponent from "./MyprofileComponent";

// 🔥 thêm 2 component mới
import Mycart from "./MycartComponent";
import Myorders from "./MyordersComponent";

class MainComponent extends Component {

  render(){
    return(

      <div>

        <MenuComponent/>
        <InformComponent/>

        <Routes>

          <Route path="/" element={<Navigate replace to="/home"/>} />

          <Route path="/home" element={<HomeComponent/>} />

          <Route path="/product/category/:cid" element={<ProductComponent/>} />

          <Route path="/product/search/:keyword" element={<ProductComponent/>} />

          <Route path="/product/:id" element={<ProductDetailComponent/>} />

          {/* CUSTOMER ROUTES */}

          <Route path="/signup" element={<SignupComponent/>} />

          <Route path="/login" element={<LoginComponent/>} />

          <Route path="/active" element={<ActiveComponent/>} />

          <Route path="/myprofile" element={<MyprofileComponent/>} />

          {/* 🔥 thêm mới */}
          <Route path="/mycart" element={<Mycart/>} />

          <Route path="/myorders" element={<Myorders/>} />

        </Routes>

      </div>
    )
  }

}

export default MainComponent;