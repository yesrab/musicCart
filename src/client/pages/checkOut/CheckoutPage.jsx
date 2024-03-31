import React, { Suspense } from "react";
import styles from "./checkout.module.css";
import fetchUtils from "../../libs/fetchUtils";
import backArrow from "../../assets/backArrow.svg";
import {
  Await,
  Link,
  defer,
  useLoaderData,
  useSubmit,
  redirect,
} from "react-router-dom";
import OrderForm from "../../components/orderProcessing/OrderForm";
import OrderTally from "../../components/orderProcessing/OrderTally";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
const schema = yup.object().shape({
  customerAddress: yup.string().required("*Please enter your address"),
  paymentMethod: yup.string().required("*Please select a method"),
});
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
  const responce = fetchUtils(cartRequest);
  return defer({ responce });
};

export const action = async ({ loginState, request, params }) => {
  const purchaseURL = "/api/v1/products/placeOrder";
  const data = await request.json();
  const { login, token } = loginState;
  const purchaseRequest = new Request(purchaseURL, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });
  const responce = await fetchUtils(purchaseRequest);
  if (responce.status == "success") {
    return redirect("/success", { replace: true });
  }
  return null;
};

function CheckoutPage() {
  const { responce } = useLoaderData();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  function handleFormSubmtion(data) {
    console.log(data);
    submit(data, { method: "POST", encType: "application/json" });
  }
  const submit = useSubmit();
  return (
    <div className={styles.ChekOutpage}>
      <Link className={styles.BkBtn} to='/View Cart'>
        Back to Cart
      </Link>
      <Link className={styles.backBtn} to={".."}>
        <img src={backArrow} />
      </Link>
      <h3 className={styles.heading}>Checkout</h3>
      <div className={styles.orderContainer}>
        <Suspense fallback={<h1 className={styles.loading}>LOADING...</h1>}>
          <Await resolve={responce}>
            {(responce) => {
              if (responce.status == "Error") {
                return <h1>Why are you here?</h1>;
              }
              return (
                <>
                  <OrderForm
                    register={register}
                    errors={errors}
                    handleSubmit={handleSubmit}
                    handleFormSubmtion={handleFormSubmtion}
                    orderInfo={responce}
                    handleSubmitOrder={handleSubmit(handleFormSubmtion)}
                  />
                  <OrderTally
                    orderInfo={responce}
                    handleSubmitOrder={handleSubmit(handleFormSubmtion)}
                  />
                </>
              );
            }}
          </Await>
        </Suspense>
      </div>
    </div>
  );
}

export default CheckoutPage;
