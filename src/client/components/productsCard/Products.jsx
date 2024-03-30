import React, { useContext } from "react";
import styles from "./productStyles.module.css";
import greenCart from "../../assets/cartGreen.svg";
import { useNavigate, useRevalidator } from "react-router-dom";
import { LoginContext } from "../../context/loginContext";
import fetchUtils from "../../libs/fetchUtils";
import toast from "react-hot-toast";
function Products({ product, gridView }) {
  // console.log(product);
  const { loginState, dispatch } = useContext(LoginContext);
  let revalidator = useRevalidator();
  const navigate = useNavigate();
  const handleAddCart = async (e, product) => {
    e.stopPropagation();
    if (!loginState.login) {
      navigate("/account/login");
    } else {
      const { _id, name, price, images, color } = product;
      const url = images[0].altUrl;
      const data = {
        _id,
        name,
        price,
        url,
        color,
      };
      const addProductURL = "/api/v1/products/cart/additem";
      const addProductReq = new Request(addProductURL, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Authorization": `Bearer ${loginState.token}`,
          "Content-Type": "application/json",
        },
      });
      const result = await fetchUtils(addProductReq);
      // console.log(result);
      if (result.status == "success") {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
      revalidator.revalidate();
    }
  };
  const goToDeatilsPage = (id, name) => {
    navigate(`/details/${id}?pname=${name}`);
  };
  return (
    <div
      onClick={() => {
        goToDeatilsPage(product._id, product.name);
      }}
      className={`${gridView ? styles.products : styles.productsListView}`}>
      <div
        className={` ${
          gridView ? styles.imageContainer : styles.listViewImageContainer
        } `}>
        <img className={styles.productImage} src={product.images[0].altUrl} />
        <button
          onClick={(event) => {
            handleAddCart(event, product);
          }}
          className={styles.addToCartBtn}>
          <img src={greenCart} alt='add to cart' />
        </button>
      </div>
      <div className={styles.productDetails}>
        <h4 className={` ${!gridView ? styles.boldheading : null} `}>
          {product.name}
        </h4>
        <p>Price - ₹ {product.price}</p>
        <p>
          {product.color} | {product.productType} headphone
        </p>
        <p className={styles.productDiscription}>
          {!gridView ? product.description : null}
        </p>
        {!gridView ? (
          <button className={styles.detailsBtn}>Details</button>
        ) : null}
      </div>
    </div>
  );
}

export default Products;
