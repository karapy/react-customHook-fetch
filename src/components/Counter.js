import { Button, Card } from "flowbite-react";
import React, { useEffect, useReducer } from "react";
import useFetch from "../hooks/useFetch";

const reducer = (status, action) => {
  switch (action.type) {
    case "increment":
      if (status.counter > 9) {
        return { counter: status.counter };
      }
      return { counter: status.counter + 1 };
    case "decriment":
      if (status.counter < 1) {
        return { counter: status.counter };
      }
      return { counter: status.counter - 1 };
    case "reset":
      return { counter: (status.counter = 0) };
    default:
      break;
  }
};
const Counter = () => {
  const [state, dispatch] = useReducer(reducer, { counter: 0 });

  const increment = () => {
    // setCounter(prevValue => prevValue + 1)
    dispatch({ type: "increment" });
  };
  const decriment = () => {
    // setCounter(prevValue => prevValue - 1)
    dispatch({ type: "decriment" });
  };
  console.log(`${state.counter}`);
  useEffect(() => {
    console.log("useEffect runs");
    document.title = `${state.counter}`;
  });
  console.log("component rerendered");

  const { data, error, isLoading, refetch } = useFetch(
    "https://v2.jokeapi.dev/joke/any"
  );

  if (isLoading) {
    return <p>isloading...</p>;
  }
  console.log(data);
  if (!isLoading && !error) {
    return (
      <>
      <div className="flex flex-col items-center">
      <Card className="max-h-64 max-w-2xl">
        <p>
          {data?.setup} : {data?.joke} {data?.delivery}
        </p>
        </Card>
        <Button onClick={refetch}>Refetch</Button>
        </div>
      </>
    );
  }
  return (
    <div className="flex items-center justify-center h-full mt-10">
      <Card>
        <div className="flex space-x-4 text-center justify-center">
          <Button onClick={increment}>increment +</Button>
          <h1 className="flex text-center text-4xl">{state.counter}</h1>
          <Button onClick={decriment}>- decriment</Button>
        </div>
        <div className="flex space-x-4 text-center justify-center">
          <Button onClick={() => dispatch({ type: "reset" })}>Reset</Button>
        </div>
      </Card>
      {/* {!error && data.delivery} */}
    </div>
  );
};

export default Counter;
