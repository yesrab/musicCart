import React, { useState, useEffect } from "react";
import { Outlet, useSearchParams } from "react-router-dom";
import Header from "../../components/header and footer/Header";
import Footer from "../../components/header and footer/Footer";
import styles from "./layoutStyles.module.css";
import HomeHeader from "../../components/HomeHeader/HomeHeader";
import useDebounce from "../../hooks/useDebounce";
function HomeLayout() {
  const [searchProduct, setSearchProduct] = useState("");
  const debouncedInputSearch = useDebounce(searchProduct, 300);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchObj = {};
  useEffect(() => {
    searchParams.forEach((value, key) => {
      searchObj[key] = value;
    });
    if (debouncedInputSearch.trim()) {
      searchObj.product = debouncedInputSearch;
    } else {
      delete searchObj.product;
    }
    setSearchParams(searchObj);
  }, [debouncedInputSearch]);

  return (
    <main className={styles.accountLayout}>
      <Header searchProduct={searchProduct} setSearchProduct={setSearchProduct} />
      <HomeHeader />
      <Outlet context={[searchProduct, setSearchProduct]} />
      <Footer />
    </main>
  );
}

export default HomeLayout;
