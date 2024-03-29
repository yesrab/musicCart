import React from "react";
import itunes from "../../assets/itunes.svg";
import styles from "./account.module.css";
import LoginForm from "../../components/account Forms/LoginForm";
import { NavLink, redirect, redirectDocument } from "react-router-dom";
import fetchUtils from "../../libs/fetchUtils";
import toast from "react-hot-toast";
export const action = async ({ request, params, dispatch }) => {
  const userData = await request.json();
  const loginURL = "/api/v1/account/login";
  const loginRequest = new Request(loginURL, {
    method: "POST",
    body: JSON.stringify(userData),
    headers: { "Content-Type": "application/json" },
  });
  const submitedResponce = await fetchUtils(loginRequest);
  if (submitedResponce.status instanceof Error) {
    toast.error("sometning went wrong, please try again later");
  }
  if (submitedResponce.status === "Error") {
    toast.error(submitedResponce.message);
  }
  if (submitedResponce.status === "success") {
    toast.success(`${submitedResponce.message}`);
    console.log(submitedResponce);
    const { _id, name, token } = submitedResponce;
    dispatch({
      type: "LOGIN",
      payload: { token, id: _id, name: name },
    });
    return redirectDocument("/");
  }
  return null;
};
function Login() {
  return (
    <main>
      <div className={styles.branding}>
        <img className={styles.barndImage} src={itunes} alt='Musicart' />
        <h1>Musicart</h1>
      </div>
      <h1 className={styles.greetings}>Welcome</h1>
      <LoginForm />
      <div className={styles.redirectionContainer}>
        <div className={styles.section}>
          <div className={styles.partiton} />
          <p>New to Musicart?</p>
          <div className={styles.partiton} />
        </div>
      </div>
      <div className={styles.redirectionContainer}>
        <NavLink className={styles.redirection} to='/account/signup'>
          Create your Musicart account
        </NavLink>
      </div>
    </main>
  );
}

export default Login;
