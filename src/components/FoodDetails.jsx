import { useEffect, useState } from "react";
import styles from "./foodDetails.module.css";
import ItemList from "./ItemList";

export default function FoodDetails({ foodId }) {
  const [food, setFood] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const URL = `https://api.spoonacular.com/recipes/${foodId}/information`;
  const API_KEY = "b9f5cde2a94041279aff4590499af0ec";

  //To make API call:
  useEffect(() => {
    async function fetchFood() {
      const res = await fetch(`${URL}?apiKey=${API_KEY}`);
      const data = await res.json();
      console.log(data);
      setFood(data);
      setIsLoading(false);
    }
    fetchFood();
  }, [foodId]);

  return (
    <div>
      <div className={styles.recipeCard}>
        <h1 className={styles.recipeName}>{food.title}</h1>

        <img className={styles.recipeImage} src={food.image} alt=" " />

        <div className={styles.recipeDetails}>
          <span>
            <strong>⏱️{food.readyInMinutes} Minutes</strong>
          </span>

          <span>
            👪<strong>Serves {food.servings} Minutes</strong>
          </span>

          <span>
            <strong>
              {food.vegetarian ? " 🥕 Vegeterian" : " 🍗 Non-Vegetarian"}
            </strong>
          </span>

          <span>
            <strong>{food.vegan ? " 🐮 Vegan" : " "}</strong>
          </span>
        </div>

        <div>
          {" "}
          <strong>
            💲<span>{(food.pricePerServing / 100).toFixed(2)} Per Serving</span>{" "}
          </strong>
        </div>

        <h2>Ingredients</h2>
        <ItemList food={food} isLoading={isLoading} />

        <h2>Instructions</h2>
        <div className={styles.recipeInstructions}>
          {food.analyzedInstructions && food.analyzedInstructions.length > 0 ? (
            <ol>
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                food.analyzedInstructions[0].steps.map((step, index) => (
                  <li key={index}>{step.step}</li>
                ))
              )}
            </ol>
          ) : (
            <p>No instructions available for this recipe.</p>
          )}
        </div>
      </div>
    </div>
  );
}
