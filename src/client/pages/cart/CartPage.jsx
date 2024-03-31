import React, { Suspense } from "react";
import styles from "./cartStyles.module.css";
import { Await, Link, useLoaderData, defer, redirect } from "react-router-dom";
import cartBag from "../../assets/cartBasket.svg";
import fetchUtils from "../../libs/fetchUtils";
import CartItems from "../../components/CartItems/CartItems";
import CartTotal from "../../components/CartItems/CartTotal";
import CartTally from "../../components/CartItems/CartTally";
import backArrow from "../../assets/backArrow.svg";
export const loader = async ({ request, params, loginState }) => {
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
  // console.log(responce);
  return defer({ responce });
};

function CartPage() {
  const { responce } = useLoaderData();
  // console.log(responce);
  return (
    <div className={styles.mainCartPage}>
      <Link className={styles.purpleBtn} to={".."}>
        Back to products
      </Link>
      <Link className={styles.backBtn} to={".."}>
        <img src={backArrow} />
      </Link>
      <h1 className={styles.heading}>
        <img src={cartBag} /> My Cart
      </h1>
      <Suspense fallback={<h3>Loading</h3>}>
        <Await resolve={responce}>
          {(resolvedData) => {
            if (!resolvedData?.cartItems?.length) {
              return (
                <>
                  <h1 className={styles.empty}>YOUR CART IS EMPTY</h1>
                  <Link className={styles.empty} to='..'>
                    Go back!
                  </Link>
                </>
              );
            }
            return (
              <div className={styles.cartContainer}>
                <div className={styles.cartProductsList}>
                  {resolvedData?.cartItems?.map((item) => {
                    return <CartItems product={item} key={item._id} />;
                  })}
                  <CartTotal allProducts={resolvedData} />
                </div>
                <CartTally allProducts={resolvedData} />
              </div>
            );
          }}
        </Await>
      </Suspense>
    </div>
  );
}

export default CartPage;
