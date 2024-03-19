import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/header and footer/Header";
import Footer from "../../components/header and footer/Footer";
import styles from "./layoutStyles.module.css";
function AccountLayout() {
  return (
    <main className={styles.accountLayout}>
      <Outlet />
      <Footer />
    </main>
  );
}

export default AccountLayout;
