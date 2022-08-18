import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { removeProduct, emptyCart } from "../../redux/cartRedux";
import { userRequest } from "../../requestMethod";
import Styles from "./cart.module.scss";

function Cart() {
  const { cart } = useSelector((state) => state);
  const productIds = cart.products.map((item) => item._id);
  console.log(cart, "dd");
  const { currentUser } = useSelector((state) => state.user);

  // let navigate = useNavigate();
  console.log(currentUser?._id, "ll");

  // const [cartProducts, setCartProducts] = React.useState([]);
  // useEffect(() => {
  //   const res = async () => {
  //     const result = await userRequest.get(`/users/find/${currentUser._id}`);
  //     setCartProducts(result.data.cartItems);
  //   };
  //   res();
  // }, [currentUser._id, cartProducts]);
  // console.log(cartProducts, "lop");
  const buyNow = async () => {
    try {
      const result = await userRequest.post("checkout/create-order", {
        userId: currentUser._id,
        products: [],
        amount: cart.total + "00",
      });
      const { amount, id: order_id } = result.data;

      const options = {
        key: "rzp_test_7TqdKPPKCPVAAk", // Enter the Key ID generated from the Dashboard
        amount: amount.toString(),
        currency: "INR",
        name: "Toonland",
        description: "Test Transaction",
        image: "https://toonland.in/assets/logo.png",
        order_id: order_id,

        handler: async function (response) {
          const result = await userRequest.post("checkout/pay-order", {
            amount: amount,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          });
          // result.status === 200 ? Navigate("/practise") : Navigate("/");
          if (result.status === 200) {
            alert("succ");
            dispatch(emptyCart());
            try {
              userRequest.put(`users/${currentUser._id}/purchasedProducts`, {
                prchdPrd: productIds,
              });
            } catch (err) {
              console.log(err, "asw");
            }
          }
          console.log(result.data.msg, "result.data.msg");
        },

        prefill: {
          name: "Mentoons Developer",
          email: "mentoonsdeveloper@gmail.com",
          contact: "9999999999",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#f00",
        },
      };
      var rzp1 = new window.Razorpay(options);
      rzp1.open();

      // navigate("/home");

      rzp1.on("payment.failed", function (response) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
      });
    } catch (err) {
      console.log(err);
      if (currentUser === null) {
        alert("Pls login to purchase");
      }
    }
  };

  const dispatch = useDispatch();

  return (
    <>
      <Link to="/explore/mall">
        <h4 style={{ padding: "1rem 4rem", textDecoration: "none" }}>
          ↼ Back to cart
        </h4>
      </Link>
      <div className={Styles.container}>
        <div>
          {cart.products.map((product) => (
            <div key={product._id} className={Styles.wrapper}>
              <div className={Styles.item}>
                <img src={product.img} alt="cover" />
              </div>
              <div className={Styles.desc_item}>
                <h3> {product.productCat}</h3>
                <p> {product.title}</p>
              </div>
              <div>
                <p>₹{product.price}</p>
                <button
                  onClick={() => {
                    dispatch(removeProduct(product));
                  }}
                >
                  Remove{" "}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className={Styles.total}>
          <h4>Cart description</h4>
          <div className={Styles.total_item}>
            <p>Total items </p>
            <p>{cart.quantity.length}</p>
          </div>
          <div className={Styles.total_item}>
            <p>Grand Total </p>
            <p>₹ {cart.total}</p>
          </div>
          <Link to="/explore/mall">
            <h4>Add more items</h4>
          </Link>
          <button onClick={() => buyNow()}>Buy now</button>
        </div>
      </div>
    </>
  );
}

export default Cart;
