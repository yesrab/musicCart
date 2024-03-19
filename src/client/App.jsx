import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/account/Login";
import Signup from "./pages/account/Signup";
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
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<Signup />} />
      </Route>
    </Route>
  )
);
function App() {
  return <RouterProvider router={browserRouter} />;
}

export default App;

