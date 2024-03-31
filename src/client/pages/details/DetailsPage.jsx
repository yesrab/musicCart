import React, { useEffect, useState, useContext, Suspense } from "react";
import {
  Await,
  Link,
  ScrollRestoration,
  defer,
  useLoaderData,
  useNavigate,
  useRevalidator,
} from "react-router-dom";
import styles from "./DetailsStyles.module.css";
import fetchUtils from "../../libs/fetchUtils";
import star from "../../assets/star.svg";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useMediaQuery } from "@react-hooks-hub/use-media-query";
import { LoginContext } from "../../context/loginContext";
import toast from "react-hot-toast";
import backArrow from "../../assets/backArrow.svg";
export const loader = async ({ request, params }) => {
  console.log(params.productId);
  const id = params.productId;
  const getProductURL = `/api/v1/products/product/${id}`;
  const productRequest = new Request(getProductURL, {
    method: "GET",
  });
  const product = fetchUtils(productRequest);

  return defer({ product });
};

function DetailsPage() {
  const { product } = useLoaderData();
  const { loginState, dispatch } = useContext(LoginContext);
  let revalidator = useRevalidator();

  // console.log(productData);
  const { device, orientation } = useMediaQuery();
  // const [currentImage, setCurretnImage] = useState("");
  // useEffect(() => {
  //   setCurretnImage(productData?.product.images[0].altUrl);
  // }, []);

  // const switchImage = (index) => {
  //   setCurretnImage(productData?.product.images[index].altUrl);
  // };
  // console.log(device);

  const navigate = useNavigate();
  const addtoCart = async (product) => {
    if (!loginState.login) {
      navigate("/account/login", { replace: true });
    } else {
      const { _id, name, price, images, color } = product;
      const url = images[0].altUrl;
      const data = {
        _id,
        name,
        price,
        url,
        color,
      };
      const addProductURL = "/api/v1/products/cart/additem";
      const addProductReq = new Request(addProductURL, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Authorization": `Bearer ${loginState.token}`,
          "Content-Type": "application/json",
        },
      });
      const result = await fetchUtils(addProductReq);
      // console.log(result);
      if (result.status == "success") {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
      revalidator.revalidate();
    }
    console.log(product);
  };
  return (
    <div className={styles.detailsContainer}>
      <ScrollRestoration />
      <Link className={styles.backToBtn} to='/'>
        Back to products
      </Link>
      <Link className={styles.backArrow} to='/'>
        <img src={backArrow} />
      </Link>
      <br />
      <Suspense fallback={<h3>Loading...</h3>}>
        <Await resolve={product}>
          {(productData) => {
            return (
              <>
                <button
                  onClick={() => {
                    addtoCart(productData.product);
                    navigate("/View Cart");
                  }}
                  className={styles.detailsButonsz}>
                  Buy Now
                </button>
                <h4 className={styles.productDescription}>
                  {productData?.product.description +
                    " " +
                    "(" +
                    productData?.product.color +
                    ")"}
                </h4>
                <div className={styles.productDataContainer}>
                  <div className={styles.imagesContainer}>
                    <Carousel
                      // width={device == "desktop" ? "65%" : "100%"}
                      height='60%'
                      showThumbs={device == "desktop" ? true : false}
                      showStatus={false}
                      emulateTouch>
                      {productData.product.images.length &&
                        productData.product.images.map((image, key) => {
                          return (
                            <div
                              onClick={() => {
                                switchImage(key);
                              }}
                              className={styles.carouselDivs}
                              key={key}>
                              <img
                                className={styles.listImages}
                                src={image.altUrl}
                              />
                            </div>
                          );
                        })}
                    </Carousel>
                  </div>
                  <div className={styles.DetailsContaier}>
                    <h1>{productData.product.name}</h1>
                    <div className={styles.ratingBox}>
                      {Array.from({ length: productData.product.rating }).map(
                        (_, index) => (
                          <img key={index} src={star} alt='stars' />
                        )
                      )}{" "}
                      <p>(50 Customer reviews)</p>
                    </div>
                    <h3 className={styles.priceLable}>
                      Price-₹ {productData.product.price}{" "}
                    </h3>
                    <p>{`${productData.product.color} | ${productData.product.productType} headphone`}</p>
                    <p>About This item</p>
                    <ul className={styles.aboutList}>
                      {productData.product.details.length &&
                        productData.product.details.map((text, key) => {
                          return <li key={key}>{text}</li>;
                        })}
                    </ul>
                    <p>
                      <span className={styles.bldFont}>Available</span> -
                      {productData.product.avaliable
                        ? " In stock"
                        : " Out of stock!"}
                    </p>
                    <p>
                      <span className={styles.bldFont}>Brand</span> -{" "}
                      {productData.product.brand}
                    </p>
                    <button
                      onClick={() => {
                        addtoCart(productData.product);
                      }}
                      className={styles.detailsButonsa}>
                      Add to cart
                    </button>
                    <button
                      onClick={() => {
                        addtoCart(productData.product);
                        navigate("/View Cart");
                      }}
                      className={styles.detailsButons}>
                      Buy Now
                    </button>
                  </div>
                </div>
              </>
            );
          }}
        </Await>
      </Suspense>
    </div>
  );
}

export default DetailsPage;
