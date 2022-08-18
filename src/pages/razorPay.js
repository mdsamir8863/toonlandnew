import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { userRequest } from "../requestMethod";

function Razorpay() {
  const user = useSelector((state) => state.user.currentUser);

  const [products, setProducts] = useState([]);
  const [orderAmount, setOrderAmount] = useState(0);

  async function fetchProducts() {
    const { data } = await userRequest.get("products");
    setProducts(data);
    console.log(data, "losd");
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  const buyNow = async (_id) => {
    const res = await userRequest.get(`products/find/${_id}`);

    console.log(res, "----");

    const result = await userRequest.post("checkout/create-order", {
      amount: res.data.price + "00",
    });
    setOrderAmount(res.data.price);
    console.log(orderAmount, "order");
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
        console.log(result);
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

    rzp1.on("payment.failed", function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
  };

  return (
    <div>
      {products.map((product) => (
        <div key={product._id}>
          <div>
            <h1> {product.productCat}</h1>

            <img
              style={{ width: "300px", height: "300px", objectFit: "cover" }}
              src={product.img}
              alt="cover"
            />
          </div>
          <div>
            <h4> {product.title}</h4>
            <p>{product.desc} </p>
            <p>#{product.topics}</p>
            <p>₹{product.price}</p>
            <button onClick={() => buyNow(product._id)}>Buy now</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Razorpay;
