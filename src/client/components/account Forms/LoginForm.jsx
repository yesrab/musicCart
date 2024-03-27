import React from "react";
import { Form, useSubmit } from "react-router-dom";
import styles from "./formStyles.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
const schema = yup.object().shape({
  userIdentifier: yup
    .mixed()
    .test("emailOrMobile", "Invalid email or mobile number", function (value) {
      const isValidEmail = yup.string().email().isValidSync(value);
      const isValidMobile = /^\d{10}$/.test(value);
      const isRequired = value;
      return (isValidEmail || isValidMobile) && isRequired;
    })
    .required("Please enter your email or mobile number"),
  password: yup.string().required("Please enter your password"),
});
function LoginForm() {
  const submit = useSubmit();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  function handleFormSubmtion(data) {
    // console.log(data);
    submit(data, { method: "POST", encType: "application/json" });
  }
  return (
    <div className={styles.formContainer}>
      <Form onSubmit={handleSubmit(handleFormSubmtion)} method='post'>
        <div className={styles.formHeadings}>
          <h3>Sign in.</h3>
          <p className={styles.question}>Already a customer?</p>
        </div>
        <label name='userIdentifier' className={styles.formElements}>
          Enter your email or mobile number
          <input htmlFor='userIdentifier' type='text' {...register("userIdentifier")} />
        </label>
        <p className={styles.formErrors}>{errors.userIdentifier?.message}</p>
        <label name='password' className={styles.formElements}>
          Password
          <input htmlFor='password' type='password' {...register("password")} />
        </label>
        <p className={styles.formErrors}>{errors.password?.message}</p>
        <button className={styles.submitButton}>Continue</button>
        <p className={styles.TnC}>
          By continuing, you agree to Musicart privacy notice and conditions of use.
        </p>
      </Form>
    </div>
  );
}

export default LoginForm;
