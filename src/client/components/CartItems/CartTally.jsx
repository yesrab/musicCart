import React from "react";
import styles from "./cartItems.module.css";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@react-hooks-hub/use-media-query";
function CartTally({ allProducts }) {
  const nav = useNavigate();
  const { device, orientation } = useMediaQuery();
  return (
    <>
      {device === "mobile" ? (
        <div>
          <div className={styles.seperator} />
          <p>Convenience Fee ₹45*</p>
          <h2>Total Amount ₹{allProducts?.grandTotal}</h2>
          <button
            className={styles.mobileOrderBtn}
            onClick={() => {
              nav("/Checkout");
            }}>
            PLACE ORDER
          </button>
        </div>
      ) : (
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
      )}
    </>
  );
}

export default CartTally;
