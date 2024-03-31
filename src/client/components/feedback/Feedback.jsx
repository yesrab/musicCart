import React from "react";
import styles from "./feedbackStyles.module.css";
import { Form, useSubmit } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
const schema = yup.object().shape({
  feedbackType: yup.string().required("*Required Field"),
  feedbackDetails: yup.string().required("*Required Field"),
});
function Feedback({ setFeedback }) {
  const submit = useSubmit();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  function handleFormSubmtion(data) {
    console.log(data);
    // submit(data, { method: "POST", encType: "application/json" });
  }
  return (
    <div
      onMouseLeave={() => {
        setFeedback(false);
      }}
      className={styles.FeedbackBox}>
      <Form
        onSubmit={handleSubmit(handleFormSubmtion)}
        className={styles.FeedbackForm}>
        <h3 htmlFor='feedbackType'>Type of feedback</h3>
        <select
          {...register("feedbackType")}
          className={styles.drop}
          name='feedbackType'
          id='feedbackType'>
          <option value='' disabled selected>
            Choose the type
          </option>
          <option value='Bugs'>Bugs</option>
          <option value='Feedback'>Feedback</option>
          <option value='Query'>Query</option>
        </select>
        <p className={styles.error}>{errors.feedbackType?.message}</p>
        <h3>Feedback</h3>
        <textarea
          placeholder='Type your feedback'
          {...register("feedbackDetails")}
          name='feedbackDetails'
        />
        <p className={styles.error}>{errors.feedbackDetails?.message}</p>
        <button className={styles.FeedbackBtn}>Submit</button>
      </Form>
    </div>
  );
}

export default Feedback;
