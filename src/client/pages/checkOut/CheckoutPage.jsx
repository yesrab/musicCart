import React from "react";
import styles from "./checkout.module.css";
import fetchUtils from "../../libs/fetchUtils";
import { defer, useLoaderData } from "react-router-dom";
export const loader = async ({ loginState, request, params }) => {
  console.log("check out loader fired");
  const token = loginState.token;
  if (!loginState.login) {
    return redirect("/", { replace: true });
  }
  const cartURL = "/api/v1/products/cart/getcart";
  const cartRequest = new Request(cartURL, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const responce = fetchUtils(cartRequest);
  return defer({ responce });
};
function CheckoutPage() {
  const { responce } = useLoaderData();
  return <div className={styles.ChekOutpage}>CheckoutPage</div>;
}

export default CheckoutPage;
