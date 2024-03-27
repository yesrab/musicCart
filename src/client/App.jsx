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
import HomeLayout from "./pages/Layouts/HomeLayout";
import CartPage from "./pages/cart/CartPage";
const browserRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={<HomeLayout />}>
        <Route index element={<Home />} />
        <Route path='detail' element={<h1>detail</h1>} />
        <Route path='mycart' element={<CartPage />} />
      </Route>
      <Route path='/account' element={<AccountLayout />}>
        <Route action={loginAction} path='login' element={<Login />} />
        <Route action={signupAction} path='signup' element={<Signup />} />
      </Route>
    </Route>
  )
);
function App() {
  return <RouterProvider router={browserRouter} />;
}

export default App;

