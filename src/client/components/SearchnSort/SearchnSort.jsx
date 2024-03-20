import React, { useState } from "react";
import search from "../../assets/search.svg";
import styles from "./SnS.module.css";
import gridIcon from "../../assets/gridView.svg";
import listIcon from "../../assets/listView.svg";
function SearchnSort() {
  const [gridView, setGridView] = useState(true);
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const [isBrandOpen, setIsBrandOpen] = useState(false);
  const [isColorOpen, setIsColorOpen] = useState(false);
  const [isPriceOpen, setIsPriceOpen] = useState(false);
  const [type, setType] = useState("");
  const [brand, setBrand] = useState("");
  const [color, setColor] = useState("");
  const [price, setPrice] = useState("");
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
          <input type='text' placeholder='Search by Product Name' />
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
          <button className={styles.dropdownButtons}>
            Headphone type <span class='material-symbols-outlined'>expand_more</span>
          </button>
          <button className={styles.dropdownButtons}>
            Company <span class='material-symbols-outlined'>expand_more</span>
          </button>
          <button className={styles.dropdownButtons}>
            Colour <span class='material-symbols-outlined'>expand_more</span>
          </button>
          <button className={styles.dropdownButtons}>
            Price <span class='material-symbols-outlined'>expand_more</span>
          </button>
        </div>
      </div>
    </section>
  );
}

export default SearchnSort;
