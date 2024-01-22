import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ContactUs from "./pages/ContactUs";
import Menu from "./pages/Menu";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import AboutUs from "./pages/AboutUs";
import CreateItem from "./pages/CreateItem";
import Payment from "./pages/Payment";
import Category from "./pages/Category";
import Cart from "./pages/Cart";
import MenuDetails from "./pages/MenuDetails";
import OrderTrack from "./pages/OrderTrack";
import AdminRoute from "./components/ProtectedRouteAdmin";
import UserRoute from "./components/ProtectedRouteUser";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
//import OrderHistory from "./pages/OrderHistory";
import CurrentOrders from "./pages/CurrentOrders";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/category" element={<Category />} />
        <Route path="/category/:category" element={<Menu />} />
        <Route path="/food/:id" element={<MenuDetails />} />
        <Route element={<AdminRoute />}>
          <Route path="/create-item" element={<CreateItem />} />
          <Route path="/current-orders" element={<CurrentOrders />} />
        </Route>
        <Route element={<UserRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/track/:id" element={<OrderTrack />} />
        </Route>

        {/* <Route path="/order-history" element={<OrderHistory />} /> */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
