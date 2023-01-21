import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { uiActions } from "./components/store/ui-slice";
import Notification from "./components/UI/Notification";

let isInitial = true;

function App() {
  const dispatch = useDispatch();

  const notification = useSelector((state) => state.ui.notification);
  const showCard = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    //
    const sendCartdata = async () => {
      //
      dispatch(
        uiActions.showNotification({
          status: "pending",
          title: "Sending...",
          message: "Sending cart data",
        })
      );
      const response = await fetch(
        "https://react-http-e4fdc-default-rtdb.europe-west1.firebasedatabase.app/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );
      if (!response.ok) {
        //
        throw new Error("sending cart data filed");
      }

      // const responseData = await response.json();
      dispatch(
        uiActions.showNotification({
          status: "sucess",
          title: "Sucess...",
          message: "Sent cart data sucessfully",
        })
      );
    };
    if (isInitial) {
      isInitial = false;
      return;
    }
    sendCartdata().catch((error) => {
      //
      dispatch(
        uiActions.showNotification({
          status: "Error",
          title: "Error...",
          message: "failed to send data",
        })
      );
    });
  }, [cart, dispatch]);

  return (
    <>
      {notification && 
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      }
      <Layout>
        {showCard && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
