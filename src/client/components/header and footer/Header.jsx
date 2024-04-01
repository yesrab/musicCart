import React, { useContext } from "react";
import styles from "./HnF.module.css";
import callImage from "../../assets/phone.svg";
import { Link, useNavigate, useLocation } from "react-router-dom";
import searchIcon from "../../assets/search.svg";
import { LoginContext } from "../../context/loginContext";
function Header({ searchProduct, setSearchProduct }) {
  const { loginState, dispatch } = useContext(LoginContext);
  const nav = useNavigate();
  const logoutFunction = () => {
    dispatch({ type: "LOGOUT" });
    nav("/", { replace: true });
  };
  const location = useLocation();
  const backToHome = () => {
    if (location.pathname != "/") {
      nav("/");
    }
  };
  if (location.pathname === "/success") {
    return <></>;
  }
  return (
    <header className={styles.headerbar}>
      <div className={styles.desktopHeader}>
        <div className={styles.envolup}>
          <img className={styles.icons} src={callImage} />
          <p>912121131313</p>
        </div>
        <p>Get 50% off on selected items | Shop Now</p>
        {!loginState.login ? (
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
        ) : (
          <span className={styles.links} onClick={logoutFunction}>
            Logout
          </span>
        )}
      </div>
      {location.pathname != "/invoice" ? (
        <div className={styles.searchBox}>
          <img className={styles.search} src={searchIcon} />
          <input
            value={searchProduct}
            onChange={(e) => {
              setSearchProduct(e.target.value);
            }}
            onMouseDown={backToHome}
            type='text'
            placeholder='Search Musicart'
          />
        </div>
      ) : null}
    </header>
  );
}

export default Header;
