import React, { useContext } from "react";
import styles from "./productStyles.module.css";
import greenCart from "../../assets/cartGreen.svg";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../context/loginContext";
function Products({ product, gridView }) {
  // console.log(product);
  const { loginState, dispatch } = useContext(LoginContext);

  const navigate = useNavigate();
  const handleAddCart = (e) => {
    e.stopPropagation();
    if (!loginState.login) {
      navigate("/account/login");
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
        <button onClick={handleAddCart} className={styles.addToCartBtn}>
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
