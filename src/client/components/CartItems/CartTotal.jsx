import React from "react";
import styles from "./cartItems.module.css";
function CartTotal({ allProducts }) {
  // console.log(allProducts);
  return (
    <div className={styles.cartPriceTotal}>
      <div />
      <div className={styles.totalElements}>
        {allProducts?.cartItems?.length} items
      </div>
      <div />
      <div />
      <div className={styles.totalElements}>₹{allProducts?.totalMRP}</div>
    </div>
  );
}

export default CartTotal;
