import React, { useEffect, useCallback, useReducer } from "react";

import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import Search from "./Search";
import style from "./Ingridients.module.css";
import ErrorModal from "../UI/ErrorModal";


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

const httpReducer = (state, action) => {
  switch (action.type) {
    case 'SEND_REQUEST':
      return {isLoading: true, error: null};
    case 'RESPONSE':
      return {...state, isLoading: false};
    case 'ERROR':
      return {isLoading: false, error: action.error};
    
    
    default:
      throw new Error('Should not get there!')
  }

};


const Ingredients = () => {
  const [userIngredients, dispatch] = useReducer(ingredientReducer, []);
  const [httpState, dispatchHttp] = useReducer(httpReducer, { isLoading: false, error: null})
  // const [userIngredients, setUserIngredients] = useState([]);
  // const [isLoading, setIsloading] = useState(false);
  // const [error, setError] = useState(false);

  const filteredIngridientsHandler = useCallback((filteredIngridients) => {
    // setUserIngredients(filteredIngridient);
    dispatch({ type: "SET", ingredients: filteredIngridients });
  }, []);

  useEffect(() => {
    console.log("rendering");
  }, [userIngredients]);

  const addIngredientHandler = (ingredient) => {
    // setIsloading(true);
    dispatchHttp({ type: 'SEND_REQUEST'})

    fetch(
      "https://react-http-e4fdc-default-rtdb.europe-west1.firebasedatabase.app/ingredient.json",
      {
        method: "POST",
        body: JSON.stringify(ingredient),
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        // setUserIngredients((prevIngredients) => [
        //   ...prevIngredients,
        //   { id: responseData.name, ...ingredient },
        // ]);
        console.log({ id: responseData.name, ...ingredient })
        dispatch({
          type: "ADD",
          ingredient: { id: responseData.name, ...ingredient },
        });
      })
      .catch((error) => {
        // setError(error.message);
        dispatchHttp({type: 'ERROR', error: "can not add !!!"})
        // setIsloading(false);
        dispatchHttp({ type: 'RESPONSE'})
      });
    const timer = setTimeout(() => {
      dispatchHttp({ type: 'RESPONSE'})
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  };

  const removeIngredientHandler = (ingredientId) => {
    // setIsloading(true);
    dispatchHttp({ type: 'SEND_REQUEST'})
    fetch(
      `https://react-http-e4fdc-default-rtdb.europe-west1.firebasedatabase.app/ingredient/${ingredientId}.j1son`,
      {
        method: "DELETE",
      }
    )
      .then((response) => {
        // setUserIngredients((prevIngredients) =>
        //   prevIngredients.filter((ingredient) => ingredient.id !== ingredientId)
        // );
        dispatch({ type: 'DELETE', id: ingredientId})
      })
      .catch((error) => {
        // setError(error.message);
        // setIsloading(false);
        dispatchHttp({type: 'ERROR', error: "can not remove !!!"})
        dispatchHttp({ type: 'RESPONSE'})
      });
    const timer = setTimeout(() => {
      dispatchHttp({ type: 'RESPONSE'})
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  };

  const modal = (
    <div
      style={{ display: httpState.isLoading ? "flex" : "none" }}
      className={style.modal}
    >
      <div className={style.modalcontent}>
        <div className={style.loader}></div>
        <div className={style.modaltext}>Loading...</div>
      </div>
    </div>
  );

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} />
      {httpState.error === 'can not remove !!!' && (
        <ErrorModal
          onClose={() => {
            // setError(null);
            dispatchHttp({type: 'ERROR', error: ''})
            console.log(httpState)
          }}
        >
          Something went wrong ...
        </ErrorModal>
      )}
      <section>
        <Search onLoadIngridents={filteredIngridientsHandler} />
        {httpState.isLoading === true && modal}
        <IngredientList
          ingredients={userIngredients}
          onRemoveItem={removeIngredientHandler}
        />
      </section>
    </div>
  );
};

export default Ingredients;
