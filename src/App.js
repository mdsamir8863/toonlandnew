import MallHomepage from "./pages/mall/homepage/MallHomepage";
import Product from "./pages/mall/product/Product";
import "./app.scss";
import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
// import Home from "./pages/home";
import CartPage from "./pages/cart/Cart";
import Razorpay from "./pages/razorPay";
import Razorpayy from "./pages/razorPayDummy";
import Login from "./pages/auth/Login";
// import Register from "./pages/auth/Register";
import { useSelector } from "react-redux";
import Practise from "./components/Practise";
import Home from "./pages/home/Home";
// import PrchPds from "./PrchPds";
import FirebaseUpload from "./firebase";
import PurchasedProducts from "./pages/purchasedProducts/PurchasedProducts";
import Profile from "./pages/profile/Profile";
import EditProfile from "./pages/profile/EditProfile";
import OtherUsers from "./pages/profile/OtherUsers";
import Test from "./Test";
import AboutUs from "./pages/about_us/AboutUs.js";
import  Workshop  from "./pages/Workshop/Workshop.js";

function App() {
  const user = useSelector((state) => state.user.currentUser);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<Test />} />
        <Route path="/firebase" element={<FirebaseUpload />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/explore/mall" element={<MallHomepage />} />
        <Route path="/explore/profile/:username" element={<Profile />} />
        <Route path="/explore/profile" element={<OtherUsers />} />
        <Route path="/explore/profile/edit" element={<EditProfile />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/Razorpay" element={<Razorpay />} />
        <Route path="/Razorpayy" element={<Razorpayy />} />
        <Route path="/practise" element={<Practise />} />
        <Route path="/prchPds" element={<PurchasedProducts />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/Workshop" element={<Workshop />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
