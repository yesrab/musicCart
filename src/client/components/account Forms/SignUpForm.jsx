import React from "react";
import { Form, useSubmit } from "react-router-dom";
import styles from "./formStyles.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
const schema = yup.object().shape({
  name: yup.string().required("*Please enter your name"),
  email: yup.string().required("*Please enter your email address").email(),
  mobileNumber: yup
    .number()
    .min(10)
    .typeError("*Please enter your mobile phone number")
    .required("*Please enter your mobile phone number")
    .positive("*Please enter an actual phone number")
    .integer("*Please enter an actual phone number")
    .test("len", "*Mobile number must be exactly 10 digits", (val) => (val + "").length === 10),
  password: yup
    .string()
    .required("*Please enter a password")
    .min(6, "*Password must be at least 6 characters"),
});
function SignUpForm() {
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
          <h3>Create account.</h3>
          <p className={styles.question}>Don’t have an account?</p>
        </div>
        <label name='name' className={styles.formElements}>
          Your name
          <input htmlFor='name' type='text ' {...register("name")} />
        </label>
        <p className={styles.formErrors}>{errors.name?.message}</p>
        <label name='mobileNumber' className={styles.formElements}>
          Mobile number
          <input htmlFor='mobileNumber' type='tel' {...register("mobileNumber")} />
        </label>
        <p className={styles.formErrors}>{errors.mobileNumber?.message}</p>
        <label name='email' className={styles.formElements}>
          Email Id
          <input htmlFor='email' type='email' {...register("email")} />
        </label>
        <p className={styles.formErrors}>{errors.email?.message}</p>
        <label name='password' className={styles.formElements}>
          Password
          <input htmlFor='password' type='password' {...register("password")} />
        </label>
        <p className={styles.formErrors}>{errors.password?.message}</p>
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
