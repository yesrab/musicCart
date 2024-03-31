import React, { useContext, useState, useEffect } from "react";
import styles from "./homeHeader.module.css";
import itunes from "../../assets/itunes.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import initials from "../../libs/initials";
import { LoginContext } from "../../context/loginContext";

function HomeHeader({ cart }) {
  const [locatonName, setLocationName] = useState("");
  const { loginState, dispatch } = useContext(LoginContext);
  const navigate = useNavigate();
  let location = useLocation();
  // console.log(location.search);
  function getPathString(pathname) {
    const pathMap = {
      "/": `Home`,
      "/View%20Cart": "Home/View Cart",
      "/Checkout": "Home/Checkout",
      "/details": "Home/name",
      "/invoice": "Home/Invoices",
    };
    if (pathname.includes("/details")) {
      const paramValue = location.search.split("=")[1];
      const formattedValue = decodeURIComponent(paramValue).replace(/[%+]/g, " ");
      return `Home/${formattedValue}`;
    }
    if (pathname.includes("/invoice")) {
      return "Home/Invoices";
    }
    return pathMap[pathname] || pathname;
  }
  useEffect(() => {
    setLocationName(getPathString(location.pathname));
  }, [location.pathname]);
  const [isOpen, setIsOpen] = useState(false);
  if (location.pathname === "/success") {
    return <></>;
  }
  return (
    <div className={styles.brandingContainer}>
      <img className={styles.logo} src={itunes} alt='Musicart' />
      <h1
        onClick={() => {
          navigate("/");
        }}>
        Musicart
      </h1>
      <div className={styles.breadCrumb}>
        {location.pathname === "/" && loginState.login ? (
          <div className={styles.invoiceLinks}>
            <p>Home</p>{" "}
            <Link className={styles.links} to='/invoice'>
              Invoice
            </Link>
          </div>
        ) : (
          <p>{locatonName}</p>
        )}
      </div>
      {loginState.login ? (
        <div className={styles.accountOptions}>
          <Link
            to={loginState.login ? "View Cart" : "/account/login"}
            className={styles.CartLink}>
            <span className='material-symbols-outlined'>shopping_cart</span> View
            Cart {cart}
          </Link>
          {!location.pathname.includes("/details") ? (
            <button
              onFocus={() => {
                setIsOpen(true);
              }}
              onBlur={() => {
                setIsOpen(false);
              }}
              className={styles.profileIcon}>
              {initials(loginState.name || "NA")}
            </button>
          ) : null}
          {isOpen ? (
            <div
              onMouseDown={(e) => e.preventDefault()}
              className={styles.settings}>
              <h4>{loginState.name}</h4>
              <button
                onClick={() => {
                  setIsOpen(false);
                  dispatch({ type: "LOGOUT" });
                }}
                className={styles.Logoutbtn}>
                Logout
              </button>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export default HomeHeader;
