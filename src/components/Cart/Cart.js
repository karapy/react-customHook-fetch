import React, { useContext, useState } from "react";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [isCheckout, isSetIsCheckout] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [didSubmiting, setDidSubmiting] = useState(false);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const orderHandler = () => {
    isSetIsCheckout(true);
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );
  const url =  "https://react-http-e4fdc-default-rtdb.europe-west1.firebasedatabase.app/orders.json";
  const submitOrderHandler = async (userData) => {
    setIsSubmiting(true);
    await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        user: userData,
        orderedItems: cartCtx.items
      })
    });
    setIsSubmiting(false)
    setDidSubmiting(true);
    cartCtx.clearCart()
  };

  const cartModalConetent = <React.Fragment>
    {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={()=> isSetIsCheckout(false)}/>}
      {!isCheckout && modalActions}
  </React.Fragment>
  const isSubmitingModalConent = <p>is submiting ...</p>

  const didSubmitingModalConent = <p>Successfully submited order!</p>
  return (
    <Modal onClose={props.onClose}>
      {!isSubmiting && !didSubmiting && cartModalConetent}
      {isSubmiting && isSubmitingModalConent}
      {!isSubmiting && didSubmiting && didSubmitingModalConent}
    </Modal>
  );
};

export default Cart;
