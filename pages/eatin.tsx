"use client";
import { useState } from "react";
import './profile.css';
// Predefined list of dishes and their nutritional values per serving
const dishData = {
  "Spaghetti Bolognese": { calories: 350, carbs: 45, protein: 20, fats: 15 },
  "Fettuccine Alfredo": { calories: 600, carbs: 50, protein: 18, fats: 30 },
  "Lasagna": { calories: 400, carbs: 35, protein: 22, fats: 25 },
  "Penne Arrabbiata": { calories: 300, carbs: 55, protein: 12, fats: 8 },
  "Mac and Cheese": { calories: 500, carbs: 55, protein: 15, fats: 25 },
  "Ravioli": { calories: 450, carbs: 50, protein: 20, fats: 20 },
  "Chicken Curry": { calories: 500, carbs: 30, protein: 40, fats: 25 },
  "Vegetable Stir Fry": { calories: 250, carbs: 40, protein: 10, fats: 8 },
  "Grilled Salmon": { calories: 400, carbs: 0, protein: 40, fats: 22 },
  "Beef Tacos": { calories: 400, carbs: 30, protein: 25, fats: 20 },
  "Chicken Salad": { calories: 300, carbs: 10, protein: 25, fats: 18 },
  "Hamburger": { calories: 500, carbs: 40, protein: 30, fats: 25 },
  "Veggie Burger": { calories: 350, carbs: 45, protein: 20, fats: 15 },
  "Sushi": { calories: 300, carbs: 50, protein: 10, fats: 5 },
  "Peking Duck": { calories: 600, carbs: 20, protein: 40, fats: 35 },
  "Fish and Chips": { calories: 700, carbs: 60, protein: 25, fats: 40 },
};

export default function DishNutritionCalculator() {
  // State to hold input values
  const [dishName, setDishName] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1); // Default quantity (1 serving)

  // State to hold the calculated results
  const [totalCalories, setTotalCalories] = useState<number>(0);
  const [totalCarbs, setTotalCarbs] = useState<number>(0);
  const [totalProtein, setTotalProtein] = useState<number>(0);
  const [totalFats, setTotalFats] = useState<number>(0);

  const handleCalculate = () => {
    // Check if the dish name exists in the predefined list
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