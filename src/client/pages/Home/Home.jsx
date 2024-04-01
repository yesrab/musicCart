import React, {Suspense, useState} from "react";
import OfferBanner from "../../components/HomeHeader/OfferBanner";
import styles from "./HomeStyles.module.css";
import SearchnSort from "../../components/SearchnSort/SearchnSort";
import {Await, useOutletContext} from "react-router-dom";
import Products from "../../components/productsCard/Products";
import feedbackImg from "../../assets/feedback.svg";
import Feedback from "../../components/feedback/Feedback";
import useOutsideClick from "../../hooks/useOutsideClick";
import fetchUtils from "../../libs/fetchUtils.js";
import toast from "react-hot-toast";

export const action = async ({request, params}) => {
  const feedBackURl = "/api/v1/feedback/submitFeedback";
  const data = await request.json()
  const feedbackRequest = new Request(feedBackURl, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  })
  const responce = await fetchUtils(feedbackRequest)
  if (responce.status === 'success') {
    toast.success("feedback submitted!")
  }
  return null;
};

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

  const closeFeedBack = () => {
    setFeedback(false);
  };
  const menuRef = useOutsideClick(closeFeedBack);
  return (
    <main className={styles.HomepageMain}>
      <OfferBanner/>
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
                    <Products gridView={gridView} product={item} key={key}/>
                  );
                })}
              </div>
            );
          }}
        </Await>
      </Suspense>
      <div className={styles.feedbackContainer}>
        {feedback ? (
          <Feedback menuRef={menuRef} closeFeedBack={closeFeedBack}/>
        ) : null}
        <br/>
        <button
          onClick={() => {
            setFeedback(true);
          }}
          className={styles.feedbackbtn}>
          <img src={feedbackImg} alt='feedback'/>
        </button>
      </div>
    </main>
  );
}

export default Home;
