import React from "react";
import styles from "./listStyles.module.css";
import greyInvoice from "../../assets/invoiceGrey.svg";
import { Link } from "react-router-dom";
function InvoiceList({ invoice, name }) {
  return (
    <div className={styles.InvoiceList}>
      <img className={styles.invoiceImage} src={greyInvoice} alt='invoice icon' />
      <div>
        <p>{name}</p>
        <p>{invoice.customerAddress}</p>
      </div>
      <Link to={`/invoice/${invoice._id}`} className={styles.invoiceLinks}>
        View Invoice
      </Link>
    </div>
  );
}

export default InvoiceList;
