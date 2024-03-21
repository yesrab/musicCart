import React from "react";
import styles from "./HnF.module.css";
import callImage from "../../assets/phone.svg";
import { Link, useNavigation } from "react-router-dom";
import searchIcon from "../../assets/search.svg";
function Header({ searchProduct, setSearchProduct }) {
  return (
    <header className={styles.headerbar}>
      <div className={styles.desktopHeader}>
        <div className={styles.envolup}>
          <img className={styles.icons} src={callImage} />
          <p>912121131313</p>
        </div>
        <p>Get 50% off on selected items | Shop Now</p>
        <span>
          <Link to='/account/login' className={styles.links}>
            Login{" "}
          </Link>
          |
          <Link to='/account/signup' className={styles.links}>
            {" "}
            Signup
          </Link>
        </span>
        {/* <p>Login | Signup</p> */}
      </div>
      <div className={styles.searchBox}>
        <img className={styles.search} src={searchIcon} />
        <input
          value={searchProduct}
          onChange={(e) => {
            setSearchProduct(e.target.value);
          }}
          type='text'
          placeholder='Search Musicart'
        />
      </div>
    </header>
  );
}

export default Header;
