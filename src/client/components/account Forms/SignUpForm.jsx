import React from "react";
import { Form } from "react-router-dom";
import styles from "./formStyles.module.css";
function SignUpForm() {
  return (
    <div className={styles.formContainer}>
      <Form>
        <div className={styles.formHeadings}>
          <h3>Create account.</h3>
          <p className={styles.question}>Don’t have an account?</p>
        </div>
        <label className={styles.formElements}>
          Your name
          <input type='text ' />
        </label>
        <label className={styles.formElements}>
          Mobile number
          <input type='tel' />
        </label>
        <label className={styles.formElements}>
          Email Id
          <input type='email' />
        </label>
        <label className={styles.formElements}>
          Password
          <input type='password' />
        </label>
        <p className={styles.TnC}>
          By enrolling your mobile phone number, you consent to receive automated security
          notifications via text message from Musicart. Message and data rates may apply.
        </p>
        <button className={styles.submitButton}>Continue</button>
        <p className={styles.TnC}>
          By continuing, you agree to Musicart privacy notice and conditions of use.
        </p>
      </Form>
    </div>
  );
}

export default SignUpForm;
