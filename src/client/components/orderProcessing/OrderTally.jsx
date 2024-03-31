import React from "react";
import styles from "./orderStyles.module.css";
function OrderTally({ submit }) {
  return (
    <div>
      <button
        onClick={() => {
          submit({ method: "GET" });
        }}
        type='submit'>
        place order
      </button>
    </div>
  );
}

export default OrderTally;
