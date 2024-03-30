import React from "react";
import styles from "./cartItems.module.css";
import { useNavigate } from "react-router-dom";
function CartTally({ allProducts }) {
  const nav = useNavigate();
  return (
    <div className={styles.tallyContainer}>
      <h3>PRICE DETAILS</h3>
      <div />
      <p>Total MRP</p>
      <p className={styles.numerics}>₹{allProducts?.totalMRP}</p>
      <p>Discount on MRP</p>
      <p className={styles.numerics}>₹{allProducts?.discountMRP}</p>
      <p>Convenience Fee</p>
      <p className={styles.numerics}>₹{allProducts?.convenienceFee}</p>
      <div />
      <div />
      <div />
      <div />
      <h3>Total Amount</h3>
      <p className={styles.numerics}>₹{allProducts?.grandTotal}</p>
      <button
        onClick={() => {
          nav("/Checkout");
        }}
        className={styles.orderBtn}>
        PLACE ORDER
      </button>
    </div>
  );
}

export default CartTally;
