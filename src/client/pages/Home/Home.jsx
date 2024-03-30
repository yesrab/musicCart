import React, { Suspense, useState } from "react";
import OfferBanner from "../../components/HomeHeader/OfferBanner";
import styles from "./HomeStyles.module.css";
import SearchnSort from "../../components/SearchnSort/SearchnSort";
import { Await, useOutletContext } from "react-router-dom";
import Products from "../../components/productsCard/Products";
import feedbackImg from "../../assets/feedback.svg";
import Feedback from "../../components/feedback/Feedback";
function Home() {
  const [searchProduct, setSearchProduct, allProducts, products] =
    useOutletContext();
  const [gridView, setGridView] = useState(true);
  const [feedback, setFeedback] = useState(false);
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
      <Suspense fallback={<h1>Loading</h1>}>
        <Await errorElement={<h3>Error loading data</h3>} resolve={products}>
          {(res) => {
            return (
              <div
                className={`  ${
                  gridView ? styles.productsContainer : styles.listViewContainer
                }`}>
                {allProducts?.allProducts?.map((item, key) => {
                  return (
                    <Products gridView={gridView} product={item} key={key} />
                  );
                })}
              </div>
            );
          }}
        </Await>
      </Suspense>
      <div className={styles.feedbackContainer}>
        {feedback ? <Feedback setFeedback={setFeedback} /> : null}
        <br />
        <button
          onMouseDown={(e) => {
            e.preventDefault(); // Prevents the button from receiving focus
            setFeedback(true);
          }}
          className={styles.feedbackbtn}>
          <img src={feedbackImg} alt='feedback' />
        </button>
      </div>
    </main>
  );
}

export default Home;
