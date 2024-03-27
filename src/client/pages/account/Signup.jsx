import React from "react";
import itunes from "../../assets/itunes.svg";
import styles from "./account.module.css";
import { Link } from "react-router-dom";
import SignUpForm from "../../components/account Forms/SignUpForm";
export const action = async ({ request, params }) => {
  console.log(await request.json());
  return null;
};
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
        <span className={styles.toLogin}>
          Already have an account?{" "}
          <Link to='/account/login' className={styles.linkStyles}>
            Sign in
          </Link>
        </span>
      </div>
    </main>
  );
}

export default Signup;
