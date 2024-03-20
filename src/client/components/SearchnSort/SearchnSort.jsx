import React, { useState } from "react";
import search from "../../assets/search.svg";
import styles from "./SnS.module.css";
import gridIcon from "../../assets/gridView.svg";
import listIcon from "../../assets/listView.svg";
import DropDown from "../DropDown/DropDown";
function SearchnSort() {
  const [gridView, setGridView] = useState(true);
  const setView = (view) => {
    if (view === "grid") {
      setGridView(true);
    } else {
      setGridView(false);
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const Options = ["option1", "option2", "option3"];
  const [dropDownData, setDropDownData] = useState(Options);
  const name = "lalo";
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
          <DropDown name={"Headphone type"} />
          <DropDown name={"Company"} />
          <DropDown name={"Colour"} />
          <DropDown name={"Price"} />
        </div>
      </div>
    </section>
  );
}

export default SearchnSort;
