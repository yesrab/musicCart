import React from "react";
import itunes from "../../assets/itunes.svg";
import styles from "./account.module.css";
import { NavLink } from "react-router-dom";
import SignUpForm from "../../components/account Forms/SignUpForm";
function Signup() {
  return (
    <main>
      <div className={styles.branding}>
        <img className={styles.barndImage} src={itunes} alt='Musicart' />
        <h1>Musicart</h1>
      </div>
      <h1 className={styles.greetings}>Welcome</h1>
      <SignUpForm />
      {/* <div className={styles.redirectionContainer}>
        <div className={styles.section}>
          <div className={styles.partiton} />
          <p>New to Musicart?</p>
          <div className={styles.partiton} />
        </div>
      </div> */}
      <div className={styles.redirectionContainer}>
        <NavLink className={styles.redirection} to='/account/signup'>
          Create your Musicart account
        </NavLink>
      </div>
    </main>
  );
}

export default Signup;
