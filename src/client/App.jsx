import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home, { action as feedbackAction } from "./pages/Home/Home";
import Login, { action as loginAction } from "./pages/account/Login";
import Signup, { action as signupAction } from "./pages/account/Signup";
import AccountLayout from "./pages/Layouts/AccountLayout";
import HomeLayout, { loader as HomeLoader } from "./pages/Layouts/HomeLayout";
import CartPage, { loader as cartLoader } from "./pages/cart/CartPage";
import { Toaster } from "react-hot-toast";
import { LoginContext } from "./context/loginContext";
import { CartContext } from "./context/userCartContext";
import { useContext } from "react";
import DetailsPage, {
  loader as detailsLoader,
} from "./pages/details/DetailsPage";
import CheckoutPage, {
  loader as checkoutLoader,
  action as checkoutAction,
} from "./pages/checkOut/CheckoutPage";
import SuccessPage from "./pages/success/SuccessPage";
import InvoicePage, {
  loader as invoiceLoader,
} from "./pages/invoice/InvoicePage";
import InvoiceDetails, {
  loader as invoiceDetailsLoader,
} from "./pages/invoice/InvoiceDetails";
function App() {
  const { loginState, dispatch } = useContext(LoginContext);
  const { cartState, dispatch: cartDispatch } = useContext(CartContext);
  const browserRouter = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route
          loader={({ request, params }) => {
            return HomeLoader({ loginState, request, params });
          }}
          element={<HomeLayout />}>
          <Route action={feedbackAction} index element={<Home />} />
          <Route
            loader={({ request, params }) => {
              return cartLoader({ loginState, request, params });
            }}
            path='View Cart'
            element={<CartPage />}
          />
          <Route
            loader={({ request, params }) => {
              return checkoutLoader({ loginState, request, params });
            }}
            action={({ request, params }) => {
              return checkoutAction({ loginState, request, params });
            }}
            path='/Checkout'
            element={<CheckoutPage />}
          />
          <Route
            path='details/:productId'
            loader={detailsLoader}
            element={<DetailsPage />}
          />
          <Route path='success' element={<SuccessPage />} />
          <Route
            loader={({ request, params }) => {
              return invoiceLoader({ loginState, request, params });
            }}
            path='invoice'
            element={<InvoicePage />}
          />
          <Route
            loader={({ request, params }) => {
              return invoiceDetailsLoader({ loginState, request, params });
            }}
            path='invoice/:invoiceId'
            element={<InvoiceDetails />}
          />
        </Route>
        <Route path='/account' element={<AccountLayout />}>
          <Route
            action={({ request, params }) => {
              return loginAction({ request, params, dispatch });
            }}
            path='login'
            element={<Login />}
          />
          <Route
            action={({ request, params }) => {
              return signupAction({ request, params, dispatch });
            }}
            path='signup'
            element={<Signup />}
          />
          <Route path='test' element={<h1>Checkout</h1>} />
        </Route>
      </Route>
    )
  );

  return (
    <>
      <Toaster
        position='top-right'
        toastOptions={{
          style: {
            border: "2px solid #48C1B5",
            padding: "16px",
            color: "#27303A",
            backgroundColor: "#f6fff9",
            fontFamily: "Roboto",
            fontWeight: 500,
          },
        }}
      />
      <RouterProvider router={browserRouter} />
    </>
  );
}

export default App;

