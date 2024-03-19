import React from "react";
import Header from "../../components/header and footer/Header";
import OfferBanner from "../../components/HomeHeader/OfferBanner";
import styles from "./HomeStyles.module.css";
import SearchnSort from "../../components/SearchnSort/SearchnSort";
function Home() {
  return (
    <main className={styles.HomepageMain}>
      <OfferBanner />
      <SearchnSort />
      Home
    </main>
  );
}

export default Home;
