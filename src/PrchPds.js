import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { userRequest } from "./requestMethod";
import Styles from "./components/products_list/productsList.module.scss";
import { Link } from "react-router-dom";

function PrchPds() {
  const { currentUser } = useSelector((state) => state.user);
  const { category } = useSelector((state) => state);
  const existingIdsRef = useRef();
  const [prchdPrd, setPrchdPrd] = React.useState([]);
  const [displayPrd, setDisplayPrd] = React.useState([]);
  const [filteredProducts, setFilteredProducts] = React.useState([]);

  useEffect(() => {
    const result = async () => {
      await userRequest
        .get(`/users/find?userId=${currentUser._id}`)
        .then((item) => setPrchdPrd(item.data.prchdPrd));
    };
    result();
  }, [currentUser]);

  // console.log(prchdPrd, "1");

  useEffect(() => {
    prchdPrd.map(
      (item) =>
        !existingIdsRef.current?.includes(item) &&
        userRequest
          .get(`/products/find/${item}`)
          .then((data) => {
            existingIdsRef.current = [
              ...(existingIdsRef.current || []),
              data.data._id,
            ];
            setDisplayPrd((displayPrd) => [...displayPrd, data.data]);
            // setDisplayPrd(data.data);
          })
          .catch((err) => {
            console.log(err);
            throw err;
          })
    );
  }, [prchdPrd]);

  useEffect(() => {
    Object.values(category).includes("All_Products")
      ? setFilteredProducts(displayPrd)
      : setFilteredProducts(
          displayPrd.filter((item) =>
            Object.entries(category).every(([key, value]) =>
              item[key].includes(value)
            )
          )
        );
  }, [displayPrd, category]);

  // setDisplayPrd((displayPrd) => [...displayPrd, data.data]);
  // console.log({ displayPrd, prchdPrd });
  console.log(filteredProducts, "filteredProducts");

  return (
    <>
      <div className={Styles.products_container}>
        {filteredProducts.length === 0 ? (
          <div style={{ position: "absolute", top: "50%" }}>
            <i>You've not purchased any products 😕</i>
            <br />
            <Link to="/explore/mall">Buy now</Link>
          </div>
        ) : (
          filteredProducts.map((product) => (
            <div key={product._id} className={Styles.individual_product}>
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
                <a target="blank" href={product.product}>
                  Download
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default PrchPds;
// {prchdPrd.includes(product._id) ? (
//   // <Link to={`/product/${product._id}`}>View</Link>
//   <Link to={`/prchPds`}>Download</Link>
// ) : (
//   <button>Add to cart</button>
// )}

// if (!existingIdsRef.current?.includes(item))
