import React from "react";
import styles from "./homeHeader.module.css";
import itunes from "../../assets/itunes.svg";
function HomeHeader() {
  return (
    <div className={styles.brandingContainer}>
      <img className={styles.logo} src={itunes} alt='Musicart' />
      <h1>Musicart</h1>
      <div className={styles.breadCrumb}>
        <p>Home</p>
      </div>
    </div>
  );
}

export default HomeHeader;
