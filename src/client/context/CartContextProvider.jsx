import { useReducer } from "react";
import { CartContext } from "./userCartContext";
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_INITIAL_STATE":
      return action.payload;
  }
};
function CartContextProvider({ children }) {
  const [cartState, dispatch] = useReducer(() => {}, {});
  const initialState = {
    _id: null,
    customerId: null,
    cartItems: [],
  };

  return (
    <CartContext.Provider value={{ cartState, initialState }}>
      {children}
    </CartContext.Provider>
  );
}
export default CartContextProvider;
