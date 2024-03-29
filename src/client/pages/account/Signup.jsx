import React from "react";
import itunes from "../../assets/itunes.svg";
import styles from "./account.module.css";
import { Link, redirect } from "react-router-dom";
import SignUpForm from "../../components/account Forms/SignUpForm";
import fetchUtils from "../../libs/fetchUtils";
import { toast } from "react-hot-toast";
export const action = async ({ request, params, dispatch }) => {
  const userData = await request.json();
  const signUpURL = "/api/v1/account/create";
  const signUpRequest = new Request(signUpURL, {
    method: "POST",
    body: JSON.stringify(userData),
    headers: { "Content-Type": "application/json" },
  });
  const submitedResponce = await fetchUtils(signUpRequest);
  if (submitedResponce.status instanceof Error) {
    toast.error("sometning went wrong, please try again later");
  }
  if (submitedResponce.status === "Error") {
    toast.error(submitedResponce.message);
  }
  if (submitedResponce.status === "success") {
    toast.success(`${submitedResponce.message} now you can login`);
    console.log(submitedResponce);
    const { _id, name, token } = submitedResponce;
    dispatch({
      type: "LOGIN",
      payload: { token, id: _id, name: name },
    });
    return redirect("/");
  }
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
