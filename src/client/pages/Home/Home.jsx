import React, { useState } from "react";
import OfferBanner from "../../components/HomeHeader/OfferBanner";
import styles from "./HomeStyles.module.css";
import SearchnSort from "../../components/SearchnSort/SearchnSort";
import { useOutletContext } from "react-router-dom";
import Products from "../../components/productsCard/Products";

function Home() {
  const [searchProduct, setSearchProduct, products] = useOutletContext();
  const [gridView, setGridView] = useState(true);
  const setView = (view) => {
    if (view === "grid") {
      setGridView(true);
    } else {
      setGridView(false);
    }
  };
  return (
    <main className={styles.HomepageMain}>
      <OfferBanner />
      <SearchnSort
        gridView={gridView}
        setView={setView}
        searchProduct={searchProduct}
        setSearchProduct={setSearchProduct}
      />
      <div
        className={`  ${
          gridView ? styles.productsContainer : styles.listViewContainer
        }`}>
        {products.allProducts.map((item, key) => {
          return <Products gridView={gridView} product={item} key={key} />;
        })}
      </div>
    </main>
  );
}

export default Home;
