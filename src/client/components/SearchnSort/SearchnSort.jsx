import React, { useState } from "react";
import search from "../../assets/search.svg";
import styles from "./SnS.module.css";
import gridIcon from "../../assets/gridView.svg";
import listIcon from "../../assets/listView.svg";
import DropDown from "../DropDown/DropDown";

import { useFloating } from "@floating-ui/react";
function SearchnSort({ searchProduct, setSearchProduct }) {
  const [gridView, setGridView] = useState(true);
  const setView = (view) => {
    if (view === "grid") {
      setGridView(true);
    } else {
      setGridView(false);
    }
  };
  return (
    <section className={styles.SnScontainer}>
      <div className={styles.searchBoxContainer}>
        <div className={styles.searchBox}>
          <img src={search} alt='search' />
          <input
            value={searchProduct}
            onChange={(e) => {
              setSearchProduct(e.target.value);
            }}
            type='text'
            placeholder='Search by Product Name'
          />
        </div>
      </div>
      <div className={styles.sortBox}>
        <div className={styles.sortOptionsContainer}>
          <button
            onClick={() => {
              setView("grid");
            }}
            className={`material-symbols-outlined  ${gridView ? styles.filled : styles.unfilled} `}>
            grid_view
          </button>
          <button
            onClick={() => {
              setView("list");
            }}
            className={`material-symbols-outlined ${gridView ? styles.unfilled : styles.filled} `}>
            view_list
          </button>
          <DropDown
            name={"Headphone type"}
            options={["Featured", "In-ear headphone", "On-ear headphone", "Over-ear headphone"]}
          />
          <DropDown
            name={"Company"}
            options={["Featured", "JBL", "Sony", "Boat", "Zebronics", "Marshall", "Ptron"]}
          />
          <DropDown name={"Colour"} options={["Featured", "Blue", "Black", "White", "Brown"]} />
          <DropDown
            name={"Price"}
            options={["Featured", "₹0 - ₹1,000", "₹1,000 - ₹10,000", "₹10,000 - ₹20,000"]}
          />
          <DropDown
            name={"Sort by :"}
            type={"sort"}
            options={[
              "Featured",
              "Price : Lowest",
              "Price : Highest",
              "Name : (A-Z)",
              "Name : (Z-A)",
            ]}
          />
        </div>
      </div>
    </section>
  );
}

export default SearchnSort;
