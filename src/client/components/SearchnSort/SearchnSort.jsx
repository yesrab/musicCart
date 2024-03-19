import React from "react";
import search from "../../assets/search.svg";
import styles from "./SnS.module.css";
function SearchnSort() {
  return (
    <section className={styles.SnScontainer}>
      <div className={styles.searchBoxContainer}>
        <div className={styles.searchBox}>
          <img src={search} alt='search' />
          <input type='text' placeholder='Search by Product Name' />
        </div>
      </div>
    </section>
  );
}

export default SearchnSort;
