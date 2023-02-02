import React, { useEffect, useCallback, useReducer } from "react";

import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import Search from "./Search";
import style from "./Ingridients.module.css";
import ErrorModal from "../UI/ErrorModal";
import useHttp from "../../hooks/http";

const ingredientReducer = (state, action) => {
  //
  switch (action.type) {
    case "SET":
      return action.ingredients;

    case "ADD":
      return [...state, action.ingredient];

    case "DELETE":
      return state.filter((ing) => ing.id !== action.id);

    default:
      throw new Error("Should not get there!");
  }
};

const Ingredients = () => {
  const [userIngredients, dispatch] = useReducer(ingredientReducer, []);
  const { isLoading, data, error, sendRequest, reqExtra, reqIdentifier, clear } =
    useHttp();

  const filteredIngridientsHandler = useCallback((filteredIngridients) => {
    dispatch({ type: "SET", ingredients: filteredIngridients });
  }, []);

  const addIngredientHandler = useCallback(
    (ingredient) => {
      sendRequest(
        "https://react-http-e4fdc-default-rtdb.europe-west1.firebasedatabase.app/ingredient.json",
        "POST",
        JSON.stringify(ingredient),
        ingredient,
        "ADD_INGRIDIENT"
      );
    },
    [sendRequest]
  );

  const removeIngredientHandler = useCallback(
    (ingredientId) => {
      sendRequest(
        `https://react-http-e4fdc-default-rtdb.europe-west1.firebasedatabase.app/ingredient/${ingredientId}.json`,
        "DELETE",
        null,
        ingredientId,
        "REMOVE_INGRIDIENT"
      );
    },
    [sendRequest]
  );

  const modal = (
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

  useEffect(() => {
    if (!isLoading && reqIdentifier === "REMOVE_INGRIDIENT") {
      dispatch({ type: "DELETE", id: reqExtra });
    }
    if (!isLoading && !error && reqIdentifier === "ADD_INGRIDIENT") {
      dispatch({
        type: "ADD",
        ingredient: { id: data.name, ...reqExtra },
      });
    }
  }, [data, reqIdentifier, isLoading, reqExtra, error]);

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} />
      {error && (
        <ErrorModal
          onClose={() => {
            clear()
          }}
        >
          Something went wrong ...
        </ErrorModal>
      )}
      <section>
        <Search onLoadIngridents={filteredIngridientsHandler} />
        {isLoading === true && modal}
        <IngredientList
          ingredients={userIngredients}
          onRemoveItem={removeIngredientHandler}
        />
      </section>
    </div>
  );
};

export default Ingredients;
