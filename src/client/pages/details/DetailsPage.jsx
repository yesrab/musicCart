import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./DetailsStyles.module.css";
export const loader = async ({ request, params }) => {
  console.log(params.productId);
  const id = params.productId;
  const getProductURL = `/api/v1/products/product/${id}`;

  return null;
};

function DetailsPage() {
  return (
    <div className={styles.detailsContainer}>
      <Link className={styles.backToBtn} to='/'>
        Back to products
      </Link>
    </div>
  );
}

export default DetailsPage;
