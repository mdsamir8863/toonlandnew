import React from "react";
import Cart from "../../components/cart/Cart";
import Navbar from "../../components/navbar/Navbar";

function CartPage() {
  return (
    <div>
      <div style={{ position: "sticky", top: "0" }}>
        <Navbar />
      </div>
      <Cart />
    </div>
  );
}

export default CartPage;
