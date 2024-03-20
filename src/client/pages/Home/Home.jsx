import React from "react";
import Header from "../../components/header and footer/Header";
import OfferBanner from "../../components/HomeHeader/OfferBanner";
import styles from "./HomeStyles.module.css";
import SearchnSort from "../../components/SearchnSort/SearchnSort";
import DropDown from "../../components/DropDown/DropDown";
function Home() {
  return (
    <main className={styles.HomepageMain}>
      <OfferBanner />
      <SearchnSort />
      home page
    </main>
  );
}

export default Home;
