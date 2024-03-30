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
  const obj = {
    name: "JBL C100SI",
    color: "black",
    productId: "6603ee4117336c3885eb4281",
    productPrice: 599,
    image: "https://i.imgur.com/tLIqdO2.jpeg",
    quantity: 2,
    subTotal: 1198,
    _id: "66080f5a5e4aa67cba6b838a",
  };

  const a = {
    name: "PTron Boom Ultima",
    color: "blue",
    productId: "6603ee4117336c3885eb42a9",
    productPrice: 300,
    image: "https://i.imgur.com/G4wxQCu.jpeg",
    quantity: 1,
    subTotal: 300,
    _id: "660833ed326ba3b6df4ecd2c",
  };

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
        <img className={styles.productimage} src={product.image} />
        <div>
          <h3 className={styles.title}>{product.name}</h3>
          <p>Colour : {product.color}</p>
          <p>In Stock</p>
        </div>
        <div className={styles.priceBox}>
          <h3 className={styles.title}>Price</h3>
          <p>₹{product.productPrice}</p>
        </div>
        <div className={styles.priceBox}>
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
          <h3 className={styles.title}>Total</h3>
          <p>₹{product.subTotal}</p>
        </div>
      </div>
    </>
  );
}

export default CartItems;
