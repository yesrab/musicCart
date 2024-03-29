import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import Login, { action as loginAction } from "./pages/account/Login";
import Signup, { action as signupAction } from "./pages/account/Signup";
import AccountLayout from "./pages/Layouts/AccountLayout";
import HomeLayout, { loader as HomeLoader } from "./pages/Layouts/HomeLayout";
import CartPage from "./pages/cart/CartPage";
import { Toaster } from "react-hot-toast";
import { LoginContext } from "./context/loginContext";
import { useContext } from "react";
import DetailsPage, {
  loader as detailsLoader,
} from "./pages/details/DetailsPage";

function App() {
  const { loginState, dispatch } = useContext(LoginContext);

  const browserRouter = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route
          loader={({ request, params }) => {
            return HomeLoader({ loginState, request, params });
          }}
          element={<HomeLayout />}>
          <Route index element={<Home />} />
          <Route path='View Cart' element={<CartPage />} />
          <Route path='test' element={<h1>Checkout</h1>} />
          <Route
            path='details/:productId'
            loader={detailsLoader}
            element={<DetailsPage />}
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

