import React, { useState, useEffect } from "react";
import "./RecipePage.css";
import loadingGIF from "../../assets/loading.gif";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function RecipePage() {
  const { dishName } = useParams(); // from /recipe/:dishName
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      setError("");
      setRecipe(null);
      try {
        const res = await axios.post(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${
            import.meta.env.VITE_GEMINI_API_KEY
          }`,
          {
            contents: [
              {
                parts: [{ text: `Give me a recipe for ${dishName}` }],
              },
            ],
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Gemini Key is:", import.meta.env.VITE_GEMINI_API_KEY);
        // If successful, res.data holds the response
        setRecipe(parseGeminiResponse(res.data));
      } catch (err) {
        console.error("Gemini API error:", err);
        setError("Error fetching recipe. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [dishName]);

  // Process the Gemini response
  const parseGeminiResponse = (data) => {
    if (!data || !data.candidates || data.candidates.length === 0) {
      return null;
    }

    const textResponse =
      data.candidates[0]?.content?.parts[0]?.text || "No recipe found.";
    const sections = textResponse.split("\n\n");

    return {
      title: dishName,
      description: sections[0] || "No description available.",
      ingredients:
        sections[1]?.split("\n").map((i) => i.replace("-", "").trim()) || [],
      instructions: sections.slice(2).join("\n") || "No instructions provided.",
    };
  };

  return (
    <div className="recipe-page-container">
      <h2>Recipe for {dishName}</h2>
      {loading && (
        <div className="recipe-loading">
          <img
            src={loadingGIF}
            alt="Loading, pizza slicing..."
            style={{ margin: "2rem auto" }}
          />
          <p>Fetching your recipe...</p>
        </div>
      )}
      {error && <p className="recipe-error">{error}</p>}
      {recipe && (
        <div className="recipe-content">
          <h3>{recipe.title}</h3>
          <p>{recipe.description}</p>
          <h4>Ingredients:</h4>
          <ul>
            {recipe.ingredients?.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          <h4>Instructions:</h4>
          <p>{recipe.instructions}</p>
        </div>
      )}
    </div>
  );
}
