import { Alert, Tooltip } from "flowbite-react";
import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (val) => val.trim() === "";
const isFiveChar = (val) => val.trim().length === 5;

const Checkout = (props) => {
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const [formInputValdity, setFormInputValidity] = useState({
    name: true,
    street: true,
    postalcode: true,
    city: true,
  })

  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredPostalIsValid = isFiveChar(enteredPostal);
    const enteredCityIsValid = !isEmpty(enteredCity);

    setFormInputValidity({
        name: enteredNameIsValid,
        street: enteredStreetIsValid,
        postalcode: enteredPostalIsValid,
        city: enteredCityIsValid,
    })

    const formIsValid = enteredNameIsValid && enteredStreetIsValid && enteredPostalIsValid && enteredCityIsValid;

    if (!formIsValid) {
        return;
    }

    //submit the cart data
    props.onConfirm({
        name:enteredName,
        street: enteredStreet,
        postalcode: enteredPostal,
        city: enteredCity,
    })
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={`${classes.control} ${!formInputValdity.name && classes.invalid}`}>
      <Tooltip content="Please enter your full Name">
        <label htmlFor="name">
          Your Name
        </label>
        </Tooltip>
        <input type="text" id="name" ref={nameInputRef}/>
        {!formInputValdity.name && <Alert color="failure"><span><span className="font-medium">Please enter a valid name</span></span></Alert>}
      </div>
      <div className={classes.control}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputValdity.street && <Alert color="failure"><span><span className="font-medium">Please enter a valid street</span></span></Alert>}
      </div>
      <div className={classes.control}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalInputRef} />
        {!formInputValdity.postalcode && <Alert color="failure"><span><span className="font-medium">Please enter a valid postl code</span></span></Alert>}
      </div>
      <div className={classes.control}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputValdity.city && <Alert color="failure"><span><span className="font-medium">Please enter a valid city</span></span></Alert>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
