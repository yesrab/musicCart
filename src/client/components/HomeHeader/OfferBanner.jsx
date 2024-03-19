import React from "react";
import styles from "./homeHeader.module.css";
import bannerWomen from "../../assets/bannerWomen.png";
function OfferBanner() {
  return (
    <div className={styles.banner}>
      <div className={styles.bannerContainer}>
        <div className={styles.bannerOverlay}>
          <div className={styles.overlayAd}>
            <h1>Grab upto 50% off on Selected headphones</h1>
            <button>Buy now</button>
          </div>
          <img className={styles.bannerImage} src={bannerWomen} alt='bannerWomen' />
        </div>
        <div className={styles.bannerGradient} />
      </div>
    </div>
  );
}

export default OfferBanner;
