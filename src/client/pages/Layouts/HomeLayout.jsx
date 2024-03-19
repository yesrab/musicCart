import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/header and footer/Header";
import Footer from "../../components/header and footer/Footer";
import styles from "./layoutStyles.module.css";
import HomeHeader from "../../components/HomeHeader/HomeHeader";
function HomeLayout() {
  return (
    <main className={styles.accountLayout}>
      <Header />
      <HomeHeader />
      <Outlet />
      <Footer />
    </main>
  );
}

export default HomeLayout;
