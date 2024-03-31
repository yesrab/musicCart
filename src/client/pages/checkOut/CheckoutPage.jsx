import React from "react";
import styles from "./checkout.module.css";
import fetchUtils from "../../libs/fetchUtils";
import { Link, defer, useLoaderData, useSubmit } from "react-router-dom";
import OrderForm from "../../components/orderProcessing/OrderForm";
import OrderTally from "../../components/orderProcessing/OrderTally";

export const loader = async ({ loginState, request, params }) => {
  console.log("check out loader fired");
  const token = loginState.token;
  if (!loginState.login) {
    return redirect("/", { replace: true });
  }
  const prderInfoURL = "/api/v1/products/placeOrder";
  const cartRequest = new Request(prderInfoURL, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const responce = await fetchUtils(cartRequest);
  return defer({ responce });
};
function CheckoutPage() {
  const { responce } = useLoaderData();
  // console.log(responce);
  const submit = useSubmit();
  return (
    <div className={styles.ChekOutpage}>
      <Link className={styles.BkBtn} to='/View Cart'>
        Back to Cart
      </Link>
      <h3 className={styles.heading}>Checkout</h3>
      <div className={styles.orderContainer}>
        <OrderForm orderInfo={responce} />
        <OrderTally submit={submit} />
      </div>
    </div>
  );
}

export default CheckoutPage;
