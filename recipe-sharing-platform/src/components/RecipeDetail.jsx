import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch recipe data based on ID
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch('/src/data.json');
        const data = await response.json();
        const foundRecipe = data.find(r => r.id === parseInt(id));
        setRecipe(foundRecipe);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching recipe:', error);
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading recipe...</p>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🍳</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Recipe not found</h2>
          <p className="text-gray-600 mb-4">The recipe you're looking for doesn't exist.</p>
          <Link to="/" className="text-blue-600 hover:text-blue-800 font-medium">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link 
          to="/" 
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8"
        >
          ← Back to Recipes
        </Link>

        {/* Recipe Image */}
        <div className="mb-8">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-64 md:h-80 object-cover rounded-lg shadow-md"
          />
        </div>

        {/* Recipe Title and Info */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{recipe.title}</h1>
          <p className="text-lg text-gray-600 mb-6">{recipe.summary}</p>
          
          {/* Recipe Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Prep Time</p>
              <p className="text-lg font-semibold">{recipe.prepTime} min</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Cook Time</p>
              <p className="text-lg font-semibold">{recipe.cookTime} min</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Servings</p>
              <p className="text-lg font-semibold">{recipe.servings}</p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Difficulty</p>
              <p className="text-lg font-semibold">{recipe.difficulty}</p>
            </div>
          </div>
        </div>

        {/* Ingredients Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b">Ingredients</h2>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <ul className="space-y-3">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-gray-700">{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Instructions Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b">Instructions</h2>
          <div className="space-y-6">
            {recipe.instructions.map((step, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-start">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-gray-700 leading-relaxed">{step}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4 mb-12">
          <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-200">
            Save Recipe
          </button>
          <button className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-6 rounded-lg transition duration-200">
            Print Recipe
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;