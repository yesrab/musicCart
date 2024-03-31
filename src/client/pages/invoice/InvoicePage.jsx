import React, { Suspense } from "react";
import { Await, Link, defer, useLoaderData } from "react-router-dom";
import styles from "./invoiceStyles.module.css";
import arrow from "../../assets/backArrow.svg";
import itunes from "../../assets/itunes.svg";
import invoiseBlck from "../../assets/invoiseLogoBlack.svg";
import fetchUtils from "../../libs/fetchUtils";
import InvoiceList from "../../components/invoiceLists/InvoiceList";

export const loader = async ({ loginState, request, params }) => {
  const { token } = loginState;
  const invoiceURL = "/api/v1/invoices/getmyinvoice";
  const newInvoiceRequest = new Request(invoiceURL, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = fetchUtils(newInvoiceRequest);

  console.log("incovice loader fired");
  return defer({ data });
};

function InvoicePage() {
  const { data } = useLoaderData();
  return (
    <div>
      <header className={styles.mobileHeader}>
        <img src={itunes} alt='brand logo' />
        <h3>Musicart</h3>
      </header>
      <div className={styles.toprow}>
        <Link className={styles.backBtn} to='/'>
          Back to Home
        </Link>
        <Link className={styles.backarrow} to='/'>
          <img src={arrow} alt='go back' />
        </Link>
      </div>
      <div className={styles.invoiceheader}>
        <img className={styles.invoiceImg} src={invoiseBlck} alt='logo' />
        <h3 className={styles.inoiceHe}>My Invoices</h3>
      </div>
      <div className={styles.invoiceListContainer}>
        <Suspense fallback={<h3>Loading...</h3>}>
          <Await resolve={data}>
            {(responce) => {
              console.log(responce);
              return responce?.myInvoices?.map((item) => {
                return (
                  <InvoiceList
                    name={responce.name}
                    invoice={item}
                    key={item._id}
                  />
                );
              });
            }}
          </Await>
        </Suspense>
      </div>
    </div>
  );
}

export default InvoicePage;
