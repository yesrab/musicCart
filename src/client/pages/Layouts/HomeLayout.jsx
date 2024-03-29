import React, { useState, useEffect, useMemo } from "react";
import { Outlet, useLoaderData, useSearchParams } from "react-router-dom";
import Header from "../../components/header and footer/Header";
import Footer from "../../components/header and footer/Footer";
import styles from "./layoutStyles.module.css";
import HomeHeader from "../../components/HomeHeader/HomeHeader";
import useDebounce from "../../hooks/useDebounce";
import fetchUtils from "../../libs/fetchUtils";
export const loader = async ({ loginState, request, params }) => {
  console.log("homeLoader triggered");
  const getProductsURL = "/api/v1/products/allProducts";
  const clientURL = new URL(request.url);
  const FetchURL = new URL(getProductsURL, window.location.origin);

  // const type = clientURL.searchParams.get("Headphone type");
  // const Company = clientURL.searchParams.get("Company");
  // const Colour = clientURL.searchParams.get("Colour");
  // const Price = clientURL.searchParams.get("Price");
  // const product = clientURL.searchParams.get("product");

  // if (type) {
  //   FetchURL.searchParams.set("Headphone type", type);
  // } else {
  //   FetchURL.searchParams.delete("Headphone type");
  // }
  // if (Company) {
  //   FetchURL.searchParams.set("Company", Company);
  // } else {
  //   FetchURL.searchParams.delete("Company");
  // }
  // if (Colour) {
  //   FetchURL.searchParams.set("Colour", Colour);
  // } else {
  //   FetchURL.searchParams.delete("Colour");
  // }
  // if (Price) {
  //   FetchURL.searchParams.set("Price", Price);
  // } else {
  //   FetchURL.searchParams.delete("Price");
  // }
  // if (product) {
  //   FetchURL.searchParams.set("product", product);
  // } else {
  //   FetchURL.searchParams.delete("product");
  // }

  const queryParams = [
    "Headphone type",
    "Company",
    "Colour",
    "Price",
    "product",
    "Sort by :",
  ];
  queryParams.forEach((param) => {
    const value = clientURL.searchParams.get(param);
    if (value) {
      FetchURL.searchParams.set(param, value);
    } else {
      FetchURL.searchParams.delete(param);
    }
  });
  const products = await fetchUtils(FetchURL.toString());
  return products;
};
function HomeLayout() {
  const products = useLoaderData();

  // console.log(products);
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
      <HomeHeader cart={products.cartSize} />
      <Outlet context={[searchProduct, setSearchProduct, products]} />
      <Footer cart={products.cartSize} />
    </main>
  );
}

export default HomeLayout;
