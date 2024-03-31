import React from "react";
import styles from "./success.module.css";
import itune from "../../assets/itunes.svg";
import confetti from "../../assets/confetti.svg";
import { Link } from "react-router-dom";
function SuccessPage() {
  return (
    <div className={styles.successContainer}>
      <div className={styles.itunesHeader}>
        <img src={itune} />
        <h1>Musicart</h1>
      </div>
      <div className={styles.party}>
        <img src={confetti} />
        <div className={styles.texts}>
          <h2>Order is placed successfully!</h2>
          <h3>You will be receiving a confirmation email with order details</h3>
        </div>
        <Link to='/' className={styles.backTohome}>
          Go back to Home page
        </Link>
      </div>
    </div>
  );
}

export default SuccessPage;
