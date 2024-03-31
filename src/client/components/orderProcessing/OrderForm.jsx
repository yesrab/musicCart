import React from "react";
import styles from "./orderStyles.module.css";
import { Form } from "react-router-dom";

function OrderForm({ orderInfo }) {
  console.log(orderInfo);
  return (
    <div className={styles.formContainer}>
      <Form>
        <div className={styles.formObjs}>
          <div>
            <label className={styles.formLabels} htmlFor='customerAddress'>
              1. Delivery address
            </label>
          </div>
          <div>
            <p>{orderInfo.customerName}</p>
            <textarea
              className={styles.addressblock}
              id='customerAddress'
              name='customerAddress'
            />
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
              defaultValue={""}>
              <option value='' disabled>
                Mode of payment
              </option>
              <option value='POD'>Pay on Delivery</option>
              <option value='UPI'>UPI</option>
              <option value='CARD'>Card</option>
            </select>
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
    </div>
  );
}

export default OrderForm;
