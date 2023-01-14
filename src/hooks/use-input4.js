import { useReducer } from "react";

const initialStateReducer = {
  value: '',
  isTouched: false
};

const inputStateReducer = (state, action) => {
  if (action.type === 'INPUT') {
    return {
      value: action.value,
      isTouched: state.isTouched
    };
  }
  if (action.type === 'BLUR') {
    return {
      value: state.value,
      isTouched: true
    };
  }
  if (action.type === 'RESET') {
    return initialStateReducer
  };
  return initialStateReducer;
}

function useInput(validateValue) {
  const [inputState, dispatch] = useReducer(inputStateReducer, initialStateReducer);

  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  const valueChangeHandler = (event) => {
    dispatch({type: 'INPUT', value: event.target.value})
  };

  const inputBlurHandler = (event) => {
    dispatch({type: 'BLUR'})
  };

  const reset = () => {
    dispatch({type: 'RESET'})
  }

  return {
    value: inputState.value,
    valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset
  };
}

export default useInput;
