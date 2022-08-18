import React, { useEffect, useState } from "react";
import Styles from "./productsList.module.scss";
import { Link } from "react-router-dom";
import { addProduct } from "../../redux/cartRedux";
import { useDispatch, useSelector } from "react-redux";
import { userRequest } from "../../requestMethod";
import axios from "axios";
// import { addProductt } from "../../redux/cartRedux2";

function SingleProduct({ product }) {
  // const { prchdPrd } = useSelector((state) => state.user.currentUser);
  const { currentUser } = useSelector((state) => state.user);
  // console.log(product, "..");
  const [prchdPrd, setPrchdPrd] = React.useState([]);
  // const [cartItems, setCartItems] = React.useState([]);

  console.log(currentUser, "kll");

  useEffect(() => {
    const prchdPrd = async () =>
      await userRequest
        .get(`/users/find?username=${currentUser.username}`)
        .then((data) => setPrchdPrd(data.data.prchdPrd));
    prchdPrd();
  }, [currentUser]);

  const dispatch = useDispatch();
  const addToCart = () => {
    currentUser
      ? dispatch(addProduct({ ...product }))
      : alert("Login to add to cart");

    // addProduct(dispatch, {
    //   userId: currentUser._id,
    //   productId: product._id,
    // });
    // try {
    //   axios.put(
    //     `http://localhost:8800/api/users/${currentUser._id}/cartitems`,
    //     {
    //       cartItems: product._id,
    //     }
    //   );
    //   dispatch(addProduct({ ...product }));
    // } catch (err) {
    //   console.log(err, "asw");
    // }
  };

  return (
    <>
      <div className={Styles.individual_product}>
        <div>
          <img src={product.img} alt="cover" />
        </div>
        <div className={Styles.about}>
          <h5>{product.productCat}</h5>
          <p className={Styles.description}>{product.title}</p>
          <p className={Styles.description}>{product.desc}</p>
          <p className={Styles.description}>₹{product.price}</p>
          <p>#{product.topics[0]}</p>
          {product.topics[1] ? "#" : null}
          {product.topics[1] ? product.topics[1] : null}
          <div className={Styles.Star}>★★★★★</div>

          {prchdPrd !== [] && prchdPrd.includes(product._id) ? (
            <Link to={`/prchPds`}>Download</Link>
          ) : (
            <button onClick={addToCart}>Add to cart</button>
          )}
        </div>
      </div>
    </>
  );
}

export default SingleProduct;
