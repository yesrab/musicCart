import React, { Suspense, useEffect } from "react";
import styles from "./invoiceStyles.module.css";
import { Link, defer, useLoaderData, Form, Await } from "react-router-dom";
import back from "../../assets/backArrow.svg";
import fetchUtils from "../../libs/fetchUtils";
export const loader = async ({ loginState, request, params }) => {
  const { token } = loginState;
  const invoiceId = params.invoiceId;
  const invoiceURL = `/api/v1/invoices/${invoiceId}`;
  const newInvoiceRequest = new Request(invoiceURL, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log("invoice details loader");
  const responce = fetchUtils(newInvoiceRequest);
  return defer({ responce });
};
function InvoiceDetails() {
  const { responce } = useLoaderData();
  useEffect(() => {
    // console.log(responce);
  }, []);
  return (
    <div className={styles.InvoiceDetailsContainer}>
      <div className={styles.InvoiceDetailsHeader}>
        <Link to='/View Cart' className={styles.backBtn}>
          Back to cart
        </Link>
        <Link to='/View Cart' className={styles.backarrow}>
          <img className={styles.backArrow} src={back} alt='back' />
        </Link>
        <div className={styles.InvoiceDetailsHeaderLeft}>
          <h3>Invoice</h3>
        </div>
      </div>
      <Suspense fallback={<h3>Loading...</h3>}>
        <Await resolve={responce}>
          {(responce) => {
            return (
              <div className={styles.InvoiceDetailsMain}>
                <div className={styles.formContainer}>
                  <div className={styles.mobileForm}>
                    <div className={styles.formObjs}>
                      <div>
                        <label
                          className={styles.formLabels}
                          htmlFor='customerAddress'>
                          1. Delivery address
                        </label>
                      </div>
                      <div className={styles.detaiFont}>
                        <p>{responce?.name}</p>
                        <p>{responce?.oneInvoice?.customerAddress}</p>
                      </div>
                    </div>
                    <div className={styles.formObjs}>
                      <div>
                        <label
                          className={styles.formLabels}
                          htmlFor='paymentMethod'>
                          2. Payment method
                        </label>
                      </div>
                      <div className={styles.modeOfPay}>
                        {responce?.oneInvoice?.paymentMethod === "POD"
                          ? "Payment on Delivery"
                          : responce?.oneInvoice?.paymentMethod}
                      </div>
                    </div>
                    <div className={styles.formObjs}>
                      <div>
                        <label
                          className={styles.formLabels}
                          htmlFor='paymentMethod'>
                          3. Review items and delivery
                        </label>
                      </div>
                      <div className={styles.orderSummery}>
                        <div>
                          {responce?.oneInvoice?.purchasedItems?.map((item) => {
                            return (
                              <img
                                key={item._id}
                                className={styles.orderSummeryimages}
                                src={item.image}
                              />
                            );
                          })}
                        </div>
                        <div className={styles.productList}>
                          {responce?.oneInvoice?.purchasedItems?.map((item) => {
                            return (
                              <span key={item._id}>
                                <h4>{item.name}</h4>
                                <p>{`color: ${item.color}`}</p>
                              </span>
                            );
                          })}
                          <p>
                            Estimated delivery : Monday — FREE Standard Delivery
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.tallyContainer}>
                  <div className={styles.odrContiner}>
                    <h3>Order Summary</h3>
                    <div className={styles.tallyGrid}>
                      <p>Items :</p>
                      <p className={styles.tallyChildren}>
                        ₹{responce?.oneInvoice?.totalMRP || 0}
                      </p>
                      <p>Delivery :</p>
                      <p className={styles.tallyChildren}>
                        ₹{responce?.oneInvoice?.convenienceFee || 0}
                      </p>
                    </div>
                  </div>
                  <div className={styles.total}>
                    <p>Order Total :</p>
                    <p className={styles.tallyChildren}>
                      ₹{responce?.oneInvoice?.grandTotal || 0}
                    </p>
                  </div>
                </div>
              </div>
            );
          }}
        </Await>
      </Suspense>
    </div>
  );
}

export default InvoiceDetails;
