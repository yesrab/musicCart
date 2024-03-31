import React from "react";
import styles from "./orderStyles.module.css";
function OrderTally({ handleSubmitOrder, orderInfo }) {
  return (
    <div className={styles.tallyContainer}>
      <div className={styles.odrContiner}>
        <button
          className={styles.ordBoxSubmit}
          onClick={handleSubmitOrder}
          type='submit'>
          Place your order
        </button>
        <p className={styles.tnc}>
          By placing your order, you agree to Musicart privacy notice and
          conditions of use.
        </p>
      </div>
      <div className={styles.odrContiner}>
        <h3>Order Summary</h3>
        <div className={styles.tallyGrid}>
          <p>Items :</p>
          <p className={styles.tallyChildren}>₹{orderInfo.totalMRP || 0}</p>
          <p>Delivery :</p>
          <p className={styles.tallyChildren}>₹{orderInfo.convenienceFee || 0}</p>
        </div>
      </div>
      <div className={styles.total}>
        <p>Order Total :</p>
        <p className={styles.tallyChildren}>₹{orderInfo.grandTotal || 0}</p>
      </div>
    </div>
  );
}

export default OrderTally;
