import React from "react";
import Navbar from "../../components/navbar/Navbar";
import ComicsHeader from "../../components/products_header/ProductsHeader";
import PrchPds from "../../PrchPds";

function PurchasedProducts() {
  return (
    <div>
      <Navbar />
      <ComicsHeader />
      <PrchPds />
    </div>
  );
}

export default PurchasedProducts;
