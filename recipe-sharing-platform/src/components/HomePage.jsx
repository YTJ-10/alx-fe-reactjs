import React, { useState, useEffect } from 'react';

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load recipe data from data.json
  useEffect(() => {
    const loadRecipes = async () => {
      try {
        // Fetch the data.json file
        const response = await fetch('/src/data.json');
        if (!response.ok) {
          throw new Error('Failed to load recipes');
        }
        const data = await response.json();
        setRecipes(data);
        setLoading(false);
      } catch (error) {
        console.error('Error loading recipes:', error);
        setLoading(false);
      }
    };

    loadRecipes();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading recipes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Recipe Sharing Platform</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover and share delicious recipes from our community of food lovers
          </p>
        </div>

        {/* Responsive Recipe Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1"
            >
              {/* Recipe Image */}
              <div className="h-48 overflow-hidden">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Recipe Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{recipe.title}</h3>
                <p className="text-gray-600 mb-4">{recipe.summary}</p>
                
                {/* View Recipe Button */}
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200">
                  View Recipe
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Recipes Message */}
        {recipes.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🍳</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No recipes available</h3>
            <p className="text-gray-600">Check back soon for delicious recipes!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;