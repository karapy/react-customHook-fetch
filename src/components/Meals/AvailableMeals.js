import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import { useEffect, useState } from "react";
import Loading from "../UI/Loading";

const url =
  "https://react-http-e4fdc-default-rtdb.europe-west1.firebasedatabase.app/meals.json";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [httpError, setHttpError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const delay = (delayInms) => {
    return new Promise(resolve => setTimeout(resolve, delayInms));
  }
  useEffect(()=> {
    setIsLoading(true)
    console.log("useEffect is running")
    const fetchMeals = async () => {
      
      setIsLoading(null)
      await delay(5000);
      console.log('fetchMeals is running');
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error("Something went wrong!")
      }
      const responseData = await response.json();
      

      const loadedMeals = Object.entries(responseData).map((meal) => (
        {
          id: meal[0],
          name: meal[1].name,
          description: meal[1].description,
          price: meal[1].price
        }
      ))

      setMeals(loadedMeals)
      
    };

    
    fetchMeals().catch((error) => {
      console.log(error.message)
      setHttpError(error.message)
    });
    setIsLoading(false)    
  }, []);


  console.log(meals)
    
  const mealsList = meals.map((meal)=> (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  if (httpError) {
    console.log("http error is detected")
    return (
    <Loading>{httpError}</Loading>)
  }

  return (
    <section className={classes.meals}>
    {isLoading ? <Loading>loading...</Loading> : <Card><ul>{mealsList}</ul></Card>}
      
    </section>
  );
};

export default AvailableMeals;
