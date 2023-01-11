import { useState, useRef, useEffect } from 'react';

const SimpleInput = (props) => {
  const [EnteredName, setEnteredName] = useState('');
  const [error, setError] = useState(false)
  const [readyToSubmit, setReadyToSubmit] = useState(false)
  const inputNameRef = useRef(null)
  

  useEffect(()=>{
    if (readyToSubmit) {
      console.log("Name input is valid")
    }
    setReadyToSubmit(false)
  },[readyToSubmit])

  const nameInputChangeHandler = (event) => {
    event.preventDefault();
    setError(false)
    setEnteredName(event.target.value)
  }

  const formSubmitionHandler = event => {
    event.preventDefault();
    if (EnteredName.length === 0) {
      setError(true)
      return;
    } 
    setReadyToSubmit(true)
    console.log("validated")
    setEnteredName('')
  }

  const nameInputClasses = error ? 'form-control invalid' : 'form-control'

  

  return (
    <form onSubmit={formSubmitionHandler}>
      
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input ref={inputNameRef} onChange={nameInputChangeHandler} type='text' id='name' value={EnteredName}/>
        {error && <span style={{color: "red"}}>Should not be empty</span>}
        {error && inputNameRef.current.focus()}
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
