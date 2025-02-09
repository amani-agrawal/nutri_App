"use client";
import { useState } from "react";
import './profile.css';

export default function HomePage() {
  const [age, setAge] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [gender, setGender] = useState<string>("");
  const [carbs, setCarbs] = useState<string>("");
  const [protein, setProtein] = useState<string>("");
  const [fats, setFats] = useState<string>("");
  const [calories, setCalories] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const fetchNutritionData = () => {
    setLoading(true);

    // Calculate BMR (Mifflin-St Jeor Equation)
    const bmr = gender === 'male'
      ? 10 * weight + 6.25 * height - 5 * age + 5
      : 10 * weight + 6.25 * height - 5 * age - 161;

    // Estimate TDEE (Assuming Sedentary Activity Level as default)
    const tdee = bmr * 1.2;  // Sedentary multiplier

    // Macronutrient distribution based on TDEE
    const carbs = (tdee * 0.55) / 4;  // 55% of total calories, divided by 4 for grams
    const protein = (tdee * 0.2) / 4; // 20% of total calories, divided by 4 for grams
    const fats = (tdee * 0.25) / 9;   // 25% of total calories, divided by 9 for grams

    // Set the state
    setCarbs(carbs.toFixed(2));  // Rounded to 2 decimal places
    setProtein(protein.toFixed(2));
    setFats(fats.toFixed(2));
    setCalories(tdee.toFixed(2));

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black p-6">
      <div className="text-center text-white">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
          Nutrition Calculator
        </h1>
        <p className="text-lg md:text-xl font-light">
          Calculate your daily nutritional needs based on your age, weight, height, and gender.
        </p>
      </div>

      {/* Input Section */}
      <div className="mt-6">
        <div className="mb-4">
        <label className="block text-white">Age:</label>
          <input
          type="number"
          value={age}
          onChange={(e) => setAge(Number(e.target.value))}
          className="px-4 py-2 w-60 rounded-lg border border-black text-black placeholder-gray-500"
          placeholder="Enter age"
        />
        </div>

        <div className="mb-4">
          <label className="block text-white">Weight (kg):</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
            className="px-4 py-2 w-60 rounded-lg text-black"
            placeholder="Enter weight"
          />
        </div>

        <div className="mb-4">
          <label className="block text-white">Height (cm):</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
            className="px-4 py-2 w-60 rounded-lg text-black"
            placeholder="Enter height"
          />
        </div>

        <div className="mb-4">
          <label className="block text-white">Gender:</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="px-4 py-2 w-60 rounded-lg text-black"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <button
          className="px-6 py-3 text-lg bg-white text-blue-600 font-semibold shadow-lg rounded-xl"
          onClick={fetchNutritionData}
          disabled={loading}
        >
          {loading ? "Calculating..." : "Calculate Nutrition"}
        </button>
      </div>

      {/* Displaying the Results */}
      <div className="mt-6 p-4 bg-white rounded-xl shadow-lg max-w-2xl">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">Recommended Daily Intake</h2>
        <div className="space-y-2">
          <p className="text-lg">
            <strong>Carbs (g):</strong> {carbs}
          </p>
          <p className="text-lg">
            <strong>Protein (g):</strong> {protein}
          </p>
          <p className="text-lg">
            <strong>Fats (g):</strong> {fats}
          </p>
          <p className="text-lg">
            <strong>Calories:</strong> {calories}
          </p>
        </div>
      </div>
    </div>
  );
}