"use client";
import { useState } from "react";

// Make sure the API key is correctly set up
const apiKey = process.env.REACT_APP_API_KEY;
console.log(apiKey);

const baseURL = "https://api.aimlapi.com/v1";
const systemPrompt = "You are a nutrition expert. Provide the carbs, protein, fats, and calories of the dish in one word for each category as a list, formatted like: carbs, protein, fats, calories.";

export default function HomePage() {
  const [dish, setDish] = useState<string>("");
  const [carbs, setCarbs] = useState<string>("");
  const [protein, setProtein] = useState<string>("");
  const [fats, setFats] = useState<string>("");
  const [calories, setCalories] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const fetchNutritionData = async () => {
    setLoading(true);
    try {
      const res = await fetch(baseURL + "/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "mistralai/Mistral-7B-Instruct-v0.2",
          messages: [
            {
              role: "system",
              content: systemPrompt,
            },
            {
              role: "user",
              content: `Provide the carbs, protein, fats, and calories for the dish named: ${dish}.`,
            },
          ],
          temperature: 0.7,
          max_tokens: 256,
        }),
      });
  
      if (!res.ok) {
        // Log the response status and text for more insight
        const errorText = await res.text();
        console.error("Error response status:", res.status);
        console.error("Error response body:", errorText);
        throw new Error("Failed to fetch response: " + errorText);
      }
  
      const data = await res.json();
      const aiResponse = data.choices[0].message.content;
  
      // Assuming the AI provides the nutrition data in a parseable format
      const parsedResponse = aiResponse.split(",");
      setCarbs(parsedResponse[0].trim());
      setProtein(parsedResponse[1].trim());
      setFats(parsedResponse[2].trim());
      setCalories(parsedResponse[3].trim());
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setCarbs("Error fetching carbs.");
      setProtein("Error fetching protein.");
      setFats("Error fetching fats.");
      setCalories("Error fetching calories.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-green-400 p-6">
      {/* Hero Section */}
      <div className="text-center text-white">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
          Nutrition Calculator
        </h1>
        <p className="text-lg md:text-xl font-light">
          Find the nutritional breakdown (carbs, protein, fats, calories) of a dish.
        </p>
      </div>

      {/* Input Section */}
      <div className="mt-6">
        <div className="mb-4">
          <label className="block text-white text-lg mb-2">Dish Name:</label>
          <input
            type="text"
            value={dish}
            onChange={(e) => setDish(e.target.value)}
            className="px-4 py-2 w-60 rounded-lg"
            placeholder="Enter dish name"
          />
        </div>

        <button
          className="px-6 py-3 text-lg bg-white text-blue-600 font-semibold shadow-lg rounded-xl"
          onClick={fetchNutritionData}
          disabled={loading}
        >
          {loading ? "Fetching..." : "Get Nutrition"}
        </button>
      </div>

      {/* Displaying the Results */}
      <div className="mt-6 p-4 bg-white rounded-xl shadow-lg max-w-2xl">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">Nutritional Breakdown</h2>
        <div className="space-y-2">
          <p className="text-lg">
            <strong>Carbs:</strong> {carbs}
          </p>
          <p className="text-lg">
            <strong>Protein:</strong> {protein}
          </p>
          <p className="text-lg">
            <strong>Fats:</strong> {fats}
          </p>
          <p className="text-lg">
            <strong>Calories:</strong> {calories}
          </p>
        </div>
      </div>
    </div>
  );
}
