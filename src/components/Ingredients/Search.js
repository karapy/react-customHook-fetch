import React, { useEffect, useRef, useState } from "react";

import Card from "../UI/Card";
import "./Search.css";
import useHttp from "../../hooks/http";
import ErrorModal from "../UI/ErrorModal";
import style from "./Ingridients.module.css";

const Search = React.memo((props) => {
  const {
    isLoading,
    data,
    error,
    sendRequest,
    clear,
  } = useHttp();
  const [enteredFilter, setEnteredFilter] = useState("");
  const { onLoadIngridents } = props;
  const inputRef = useRef();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (enteredFilter === inputRef.current.value) {
        const query =
          enteredFilter.length === 0
            ? ""
            : `?orderBy="title"&equalTo="${enteredFilter}"`;

        console.log("Send request for search");
        sendRequest(
          "https://react-http-e4fdc-default-rtdb.europe-west1.firebasedatabase.app/ingredient.json" +
            query,
          "GET"
        );
      }
    }, 1000);

    return () => {
      clearTimeout(timer);
      console.log("clearing timer");
    };
  }, [enteredFilter, sendRequest, inputRef]);

  useEffect(() => {
    if (!error && !isLoading && data) {
      const loadedIngredients = [];
      for (const key in data) {
        loadedIngredients.push({
          id: key,
          title: data[key].title,
          amount: data[key].amount,
        });
      }
      onLoadIngridents(loadedIngredients);
    }
    console.log(error);
  }, [data, isLoading, error, onLoadIngridents]);

  if (isLoading) {
    return (
      <div
        style={{ display: isLoading ? "flex" : "none" }}
        className={style.modal}
      >
        <div className={style.modalcontent}>
          <div className={style.loader}></div>
          <div className={style.modaltext}>Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <section className="search">
      {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input
            ref={inputRef}
            type="text"
            value={enteredFilter}
            onChange={(event) => setEnteredFilter(event.target.value)}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
