import React from "react";
import styles from "./orderStyles.module.css";
import { Form } from "react-router-dom";

function OrderForm({
  orderInfo,
  register,
  errors,
  handleSubmit,
  handleFormSubmtion,
  handleSubmitOrder,
}) {
  // console.log(orderInfo);
  return (
    <div className={styles.formContainer}>
      <Form
        className={styles.mobileForm}
        onSubmit={handleSubmit(handleFormSubmtion)}>
        <div className={styles.formObjs}>
          <div>
            <label className={styles.formLabels} htmlFor='customerAddress'>
              1. Delivery address
            </label>
          </div>
          <div className={styles.detaiFont}>
            <p>{orderInfo.customerName}</p>
            <textarea
              className={styles.addressblock}
              id='customerAddress'
              name='customerAddress'
              {...register("customerAddress")}
            />
            <p className={styles.error}>{errors?.customerAddress?.message}</p>
          </div>
        </div>
        <div className={styles.formObjs}>
          <div>
            <label className={styles.formLabels} htmlFor='paymentMethod'>
              2. Payment method
            </label>
          </div>
          <div>
            <select
              className={styles.modeOfPay}
              name='paymentMethod'
              id='paymentMethod'
              defaultValue={""}
              {...register("paymentMethod")}>
              <option value='' disabled>
                Mode of payment
              </option>
              <option value='POD'>Pay on Delivery</option>
              <option value='UPI'>UPI</option>
              <option value='CARD'>Card</option>
            </select>
            <p className={styles.error}>{errors?.paymentMethod?.message}</p>
          </div>
        </div>
        <div className={styles.formObjs}>
          <div>
            <label className={styles.formLabels} htmlFor='paymentMethod'>
              3. Review items and delivery
            </label>
          </div>
          <div className={styles.orderSummery}>
            <div>
              {orderInfo?.userCart?.cartItems?.map((item) => {
                return (
                  <img
                    key={item._id}
                    className={styles.orderSummeryimages}
                    src={item.image}
                  />
                );
              })}
            </div>
            <div className={styles.productList}>
              {orderInfo?.userCart?.cartItems?.map((item) => {
                return (
                  <span key={item._id}>
                    <h4>{item.name}</h4>
                    <p>{`color: ${item.color}`}</p>
                  </span>
                );
              })}
              <p>Estimated delivery : Monday — FREE Standard Delivery</p>
            </div>
          </div>
        </div>
      </Form>
      <div className={styles.submitBox}>
        <button
          onClick={handleSubmitOrder}
          type='submit'
          className={styles.submitBtn}>
          Place your order
        </button>
        <div>
          <label className={styles.formLabels}>
            Order Total : ₹{orderInfo.grandTotal || 0}
          </label>
          <p>
            By placing your order, you agree to Musicart privacy notice and
            conditions of use.
          </p>
        </div>
      </div>
    </div>
  );
}

export default OrderForm;
