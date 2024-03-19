import React from "react";
import { Form } from "react-router-dom";
import styles from "./formStyles.module.css";
function LoginForm() {
  return (
    <div className={styles.formContainer}>
      <Form>
        <div className={styles.formHeadings}>
          <h3>Sign in.</h3>
          <p className={styles.question}>Already a customer?</p>
        </div>
        <label className={styles.formElements}>
          Enter your email or mobile number
          <input type='text' />
        </label>
        <label className={styles.formElements}>
          Password
          <input type='password' />
        </label>
        <button className={styles.submitButton}>Continue</button>
        <p className={styles.TnC}>
          By continuing, you agree to Musicart privacy notice and conditions of use.
        </p>
      </Form>
    </div>
  );
}

export default LoginForm;
