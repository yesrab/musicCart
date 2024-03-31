import React from "react";
import { Link } from "react-router-dom";
import styles from "./invoiceStyles.module.css";
import arrow from "../../assets/backArrow.svg";
import itunes from "../../assets/itunes.svg";
import invoiseBlck from "../../assets/invoiseLogoBlack.svg";
function InvoicePage() {
  return (
    <div>
      <header className={styles.mobileHeader}>
        <img src={itunes} alt='brand logo' />
        <h3>Musicart</h3>
      </header>
      <div className={styles.toprow}>
        <Link className={styles.backBtn} to='/'>
          Back to Home
        </Link>
        <Link className={styles.backarrow} to='/'>
          <img src={arrow} alt='go back' />
        </Link>
      </div>
      <div className={styles.invoiceheader}>
        <img className={styles.invoiceImg} src={invoiseBlck} alt='logo' />
        <h3 className={styles.inoiceHe}>My Invoices</h3>
      </div>
      <div className={styles.invoiceListContainer}>sasd</div>
    </div>
  );
}

export default InvoicePage;
