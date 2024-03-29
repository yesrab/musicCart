import React, { useEffect, useState, useContext } from "react";
import styles from "./HnF.module.css";
import { useNavigation, useLocation, NavLink } from "react-router-dom";
import home from "../../assets/home.svg";
import cart from "../../assets/cart.svg";
import login from "../../assets/logedIn.svg";
import invoice from "../../assets/invoice.svg";
import { LoginContext } from "../../context/loginContext";
function Footer({ cart: cartCount }) {
  const { loginState } = useContext(LoginContext);
  const [show, setShow] = useState(false);
  const navigation = useLocation();
  useEffect(() => {
    setShow(navigation.pathname.includes("/account"));
  }, []);
  return (
    <>
      <footer className={`${show ? styles.footerFix : ""}  ${styles.footerbar}`}>
        <p>Musicart | All rights reserved</p>
      </footer>
      <footer
        className={` ${show ? styles.footerUnfix : ""}  ${styles.mobileNav} `}>
        <NavLink className={styles.navlinks} to='/'>
          {({ isActive }) => (
            <>
              <div
                className={isActive ? styles.possitionIndicator : styles.blank}
              />
              <div className={styles.navIconsContainer}>
                <img className={styles.navIcons} src={home} />
                Home
              </div>
            </>
          )}
        </NavLink>
        <NavLink
          className={styles.navlinks}
          to={loginState.login ? "View Cart" : "/account/login"}>
          {({ isActive }) => (
            <>
              <div
                className={isActive ? styles.possitionIndicator : styles.blank}
              />
              <div className={styles.navIconsContainer}>
                <div className={styles.cartCount}>{cartCount}</div>
                <img className={styles.navIcons} src={cart} />
                Cart
              </div>
            </>
          )}
        </NavLink>
        <NavLink className={styles.navlinks} to='/invoice'>
          {({ isActive }) => (
            <>
              <div
                className={isActive ? styles.possitionIndicator : styles.blank}
              />
              <div className={styles.navIconsContainer}>
                <img className={styles.navIcons} src={invoice} />
                Invoice
              </div>
            </>
          )}
        </NavLink>
        <NavLink className={styles.navlinks} to='/account/login'>
          {({ isActive }) => (
            <>
              <div
                className={isActive ? styles.possitionIndicator : styles.blank}
              />
              <div className={styles.navIconsContainer}>
                <img className={styles.navIcons} src={login} />
                Login
              </div>
            </>
          )}
        </NavLink>
      </footer>
    </>
  );
}

export default Footer;
