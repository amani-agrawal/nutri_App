"use client";
import { useState } from "react";
import './profile.css';
import dishData from "./dishData";
import Fuse from "fuse.js";

export default function DishNutritionCalculator() {
  // State to hold input values
  const [dishName, setDishName] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1); // Default quantity (1 serving)

  // State to hold the calculated results
  const [totalCalories, setTotalCalories] = useState<number>(0);
  const [totalCarbs, setTotalCarbs] = useState<number>(0);
  const [totalProtein, setTotalProtein] = useState<number>(0);
  const [totalFats, setTotalFats] = useState<number>(0);

  const fuse = new Fuse(Object.keys(dishData), {
    includeScore: true,
    threshold: 0.3, // Adjust this value for more or less lenient matching
  });

  const handleCalculate = () => {
    // Check if the dish name exists in the predefined list
    const results = fuse.search(dishName);
    if (results.length > 0) {
        const matchedDish = results[0].item; // Get the closest match
    }

    const dish = dishData[dishName];

    if (dish) {
      // Calculate total nutritional values based on servings/quantity
      setTotalCalories(dish.calories * quantity);
      setTotalCarbs(dish.carbs * quantity);
      setTotalProtein(dish.protein * quantity);
      setTotalFats(dish.fats * quantity);
    } else {
      // Handle invalid dish name
      setTotalCalories(350 * quantity);
      setTotalCarbs(200 * quantity);
      setTotalProtein(15 * quantity);
      setTotalFats(30 * quantity);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black p-6">
      <div className="text-center text-white">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
          Dish Nutrition Calculator
        </h1>
        <p className="text-lg md:text-xl font-light">
          Calculate the nutritional values of your favorite dish!
        </p>
      </div>

      <div className="mt-6">
        {/* Dish Name */}
        <div className="mb-4">
          <label className="block">Dish Name:</label>
          <input
            type="text"
            value={dishName}
            onChange={(e) => setDishName(e.target.value)}
            className="px-4 py-2 w-60 rounded-lg text-black"
            placeholder="Enter dish name"
          />
        </div>

        {/* Quantity */}
        <div className="mb-4">
          <label className="block">Quantity (Servings):</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="px-4 py-2 w-60 rounded-lg text-black"
            placeholder="Enter quantity (servings)"
          />
        </div>

        {/* Calculate Button */}
        <button
          className="px-6 py-3 text-lg bg-white text-blue-600 font-semibold shadow-lg rounded-xl"
          onClick={handleCalculate}
        >
          Calculate Nutrition
        </button>
      </div>

      {/* Displaying the Results */}
      <div className="mt-6 p-4 bg-white rounded-xl shadow-lg max-w-2xl">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">Total Nutritional Intake</h2>
        <div className="space-y-2">
          <p className="text-lg">
            <strong>Dish Name:</strong> {dishName}
          </p>
          <p className="text-lg">
            <strong>Total Calories:</strong> {totalCalories} kcal
          </p>
          <p className="text-lg">
            <strong>Total Carbs:</strong> {totalCarbs} g
          </p>
          <p className="text-lg">
            <strong>Total Protein:</strong> {totalProtein} g
          </p>
          <p className="text-lg">
            <strong>Total Fats:</strong> {totalFats} g
          </p>
        </div>
      </div>
    </div>
  );
}