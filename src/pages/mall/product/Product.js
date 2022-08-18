import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../../../components/navbar/Navbar";
import Styles from "./product.module.scss";
import { addProduct } from "../../../redux/cartRedux";
import { useDispatch } from "react-redux";
import ComicsHeader from "../../../components/products_header/ProductsHeader";
import { publicRequest } from "../../../requestMethod";

function Product() {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  // const dispatch = useDispatch();
  // const handleClick = () => {
  //   dispatch(addProduct({ ...product }));
  // };
  console.log(product, "popo");
  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("products/find/" + id);
        console.log(res, "?????=======");
        setProduct(res.data);
      } catch (err) {
        console.log(err, "err");
      }
    };
    getProduct();
  }, [id]);

  return (
    <div>
      <Navbar />
      <ComicsHeader />
      <div className={Styles.wrapper}>
        <div className={Styles.item}>
          <h1> {product.productCat}</h1>

          <img src={product.img} alt="cover" />
        </div>
        <div className={Styles.desc_item}>
          <h4> {product.title}</h4>
          <p>
            {product.desc} Lorem Ipsum is simply dummy text of the printing and
            typesetting industry. Lorem Ipsum has been the industry's standard
            dummy text ever since the 1500s, when an unknown printer took a
            galley of type and scrambled it to make a type specimen book.
          </p>
          <p>#{product.topics}</p>
          <p>₹{product.price}</p>
        </div>
      </div>
    </div>
  );
}

export default Product;
