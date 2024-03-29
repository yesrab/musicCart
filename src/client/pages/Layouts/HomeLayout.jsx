import React, {
  useState,
  useEffect,
  useMemo,
  Suspense,
  useCallback,
} from "react";
import {
  Outlet,
  useLoaderData,
  useSearchParams,
  defer,
  Await,
} from "react-router-dom";
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

  const productsRequest = new Request(FetchURL.toString(), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${loginState.token}`,
    },
  });
  const products = fetchUtils(productsRequest);
  return defer({ products });
};
function HomeLayout() {
  const { products } = useLoaderData();
  const [allProducts, setAllProducts] = useState("");
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

  const setAllData = useCallback(async () => {
    const data = await products;
    setAllProducts(data);
  }, [products]);
  useEffect(() => {
    setAllData();
  }, [products, setAllData]);
  return (
    <main className={styles.accountLayout}>
      <Header searchProduct={searchProduct} setSearchProduct={setSearchProduct} />
      <HomeHeader cart={allProducts?.cartSize} />
      <Outlet
        context={[searchProduct, setSearchProduct, allProducts, products]}
      />
      <Footer cart={allProducts?.cartSize} />
    </main>
  );
}

export default HomeLayout;
