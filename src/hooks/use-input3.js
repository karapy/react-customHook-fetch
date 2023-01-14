import { useState } from 'react'

function useInput(validateFunction) {
    const [enteredValue, setEnteredValue] = useState("");
    const [error, setError] = useState(false);

    const valueIsValid = validateFunction(enteredValue);
    
    
    const onBlurValueHandler = () => {
        if (!valueIsValid) {
          setError(true)
        }
      };
    
    const valueChangeHandler = (event) => {
        event.preventDefault();
        setError(false)
        setEnteredValue(event.target.value)
      }

  return ({
    onBlurValueHandler: onBlurValueHandler,
    valueChangeHandler: valueChangeHandler,
    enteredValue: enteredValue,
    error: error,
    valueIsValid: valueIsValid
  })
}

export default useInput