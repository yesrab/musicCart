import React, { useContext } from "react";
import styles from "./cartItems.module.css";
import { LoginContext } from "../../context/loginContext";
import fetchUtils from "../../libs/fetchUtils";
import { useRevalidator } from "react-router-dom";
import toast from "react-hot-toast";
function CartItems({ product }) {
  // console.log(product);
  const { loginState, dispatch } = useContext(LoginContext);
  const revalidator = useRevalidator();

  const changeQuantity = async (value) => {
    const { _id: cartBlock, productId } = product;
    const data = {
      cartBlock,
      newQuantity: value,
      productId,
    };
    const addProductURL = "/api/v1/products/cart/additem";
    const modifyQuantity = new Request(addProductURL, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Authorization": `Bearer ${loginState.token}`,
        "Content-Type": "application/json",
      },
    });
    const responce = await fetchUtils(modifyQuantity);

    if (responce.status == "success") {
      toast.success("updated quantity");
      revalidator.revalidate();
    }
  };

  return (
    <>
      <div className={styles.cartProduct}>
        <img className={styles.productimage} src={product?.image} />
        <div>
          <h3 className={styles.title}>{product.name}</h3>
          <p>Colour : {product?.color}</p>
          <p>In Stock</p>
        </div>
        <div className={` ${styles.dummyBox} `}></div>
        <div className={` ${styles.priceBox} ${styles.mobilePriceBox} `}>
          <h3 className={styles.title}>Price</h3>
          <p>₹{product?.productPrice}</p>
        </div>
        <div className={` ${styles.priceBox} ${styles.mobilePriceBox} `}>
          <label htmlFor='quantity'>
            <h3 className={styles.title}>Quantity</h3>
          </label>
          <select
            onChange={(e) => {
              changeQuantity(e.target.value);
            }}
            defaultValue={product.quantity}
            className={styles.quantity}
            name='quantity'
            id='quantity'>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
            <option value='6'>6</option>
            <option value='7'>7</option>
            <option value='8'>8</option>
          </select>
        </div>
        <div className={styles.priceBox}>
          <h3 className={styles?.title}>Total</h3>
          <p>₹{product?.subTotal}</p>
        </div>
      </div>
    </>
  );
}

export default CartItems;
