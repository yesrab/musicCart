import React, { useState } from "react";
import styles from "./dropDown.module.css";
function DropDown({ name, data }) {
  const [isOpen, setIsOpen] = useState(false);
  const Options = ["option1", "option2", "option3"];
  const [dropDownData, setDropDownData] = useState(Options);

  return (
    <div className={styles.dropDown}>
      <button
        onFocus={() => {
          setIsOpen(true);
        }}
        onBlur={() => {
          setIsOpen(false);
        }}
        className={styles.dropdownButtons}>
        {name} <span className='material-symbols-outlined'>expand_more</span>
      </button>
      {isOpen ? (
        <div open={isOpen} className={styles.dropDownMenu}>
          <ul className={styles.dropDownList}>
            {dropDownData && dropDownData.map((option, key) => <li key={key}>{option}</li>)}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export default DropDown;
