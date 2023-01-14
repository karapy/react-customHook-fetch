import { useState } from 'react'

function useInput(validateValue) {
    const [inputValue, setInputValue] = useState('');
    const [isTouched, setIsTouched] = useState(false);

    

    const isValueValid = validateValue(inputValue);
    console.log("input value is ", inputValue, " and is Value valid is ", isValueValid)
    const hasError = !isValueValid && isTouched;

    const valueOnBlur = () => {
        setIsTouched(true)
        console.log("is Touched: ", isTouched)
    };

    
    console.log("isValueValid: ", isValueValid)
    console.log("hasError ", hasError)



    const valueChangeHandler = event => {
        setInputValue(event.target.value)
    }

  return (
    {
        inputValue: inputValue,
        valueChangeHandler: valueChangeHandler,
        isValueValid: isValueValid,
        hasError: hasError,
        valueOnBlur: valueOnBlur
    }
  )
}

export default useInput