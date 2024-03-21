import React from "react";
import OfferBanner from "../../components/HomeHeader/OfferBanner";
import styles from "./HomeStyles.module.css";
import SearchnSort from "../../components/SearchnSort/SearchnSort";
import { useOutletContext } from "react-router-dom";

function Home() {
  const [searchProduct, setSearchProduct] = useOutletContext();

  return (
    <main className={styles.HomepageMain}>
      <OfferBanner />
      <SearchnSort searchProduct={searchProduct} setSearchProduct={setSearchProduct} />
      home page
    </main>
  );
}

export default Home;
