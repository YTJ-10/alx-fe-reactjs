import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddRecipeForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    ingredients: '',
    instructions: ''
  });
  
  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    // Check if title is empty
    if (!formData.title.trim()) {
      newErrors.title = 'Recipe title is required';
    }
    
    // Check if ingredients is empty
    if (!formData.ingredients.trim()) {
      newErrors.ingredients = 'Ingredients are required';
    } else {
      // Check if ingredients list has at least 2 items
      const ingredientsArray = formData.ingredients.split('\n').filter(item => item.trim() !== '');
      if (ingredientsArray.length < 2) {
        newErrors.ingredients = 'Please provide at least 2 ingredients';
      }
    }
    
    // Check if instructions is empty
    if (!formData.instructions.trim()) {
      newErrors.instructions = 'Preparation steps are required';
    }
    
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length === 0) {
      // Form is valid - process the data
      console.log('Form submitted:', formData);
      
      // In a real app, you would send this to your backend
      // For now, just alert and reset form
      alert('Recipe submitted successfully!');
      setFormData({
        title: '',
        ingredients: '',
        instructions: ''
      });
      setErrors({});
      
      // Navigate back to home page
      navigate('/');
    } else {
      // Set errors if validation fails
      setErrors(validationErrors);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-8"
        >
          ← Back to Recipes
        </button>

        {/* Form Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Add New Recipe</h1>
          <p className="text-gray-600">
            Share your delicious recipe with our community
          </p>
        </div>

        {/* Recipe Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
          {/* Recipe Title Field */}
          <div className="mb-6">
            <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
              Recipe Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Spaghetti Carbonara"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-2">{errors.title}</p>
            )}
          </div>

          {/* Ingredients Field */}
          <div className="mb-6">
            <label htmlFor="ingredients" className="block text-gray-700 font-medium mb-2">
              Ingredients *
            </label>
            <p className="text-sm text-gray-500 mb-2">
              Enter each ingredient on a new line (at least 2 ingredients required)
            </p>
            <textarea
              id="ingredients"
              name="ingredients"
              value={formData.ingredients}
              onChange={handleChange}
              placeholder={`2 cups flour\n1 cup sugar\n3 eggs\n...`}
              rows="6"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.ingredients ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.ingredients && (
              <p className="text-red-500 text-sm mt-2">{errors.ingredients}</p>
            )}
          </div>

          {/* Instructions Field */}
          <div className="mb-6">
            <label htmlFor="instructions" className="block text-gray-700 font-medium mb-2">
              Preparation Steps *
            </label>
            <p className="text-sm text-gray-500 mb-2">
              Enter each step on a new line
            </p>
            <textarea
              id="instructions"
              name="instructions"
              value={formData.instructions}
              onChange={handleChange}
              placeholder={`1. Preheat the oven to 350°F\n2. Mix all dry ingredients\n3. Add wet ingredients and stir\n...`}
              rows="8"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.instructions ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.instructions && (
              <p className="text-red-500 text-sm mt-2">{errors.instructions}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex space-x-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-200"
            >
              Submit Recipe
            </button>
            <button
              type="button"
              onClick={() => {
                setFormData({
                  title: '',
                  ingredients: '',
                  instructions: ''
                });
                setErrors({});
              }}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-6 rounded-lg transition duration-200"
            >
              Clear Form
            </button>
          </div>

          {/* Required Fields Note */}
          <p className="text-sm text-gray-500 mt-6">
            * Required fields
          </p>
        </form>

        {/* Form Tips */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Tips for a Great Recipe:</h3>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              Be specific with measurements (e.g., "1 cup" instead of "some")
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              List ingredients in the order they're used
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              Number your preparation steps for clarity
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              Include cooking times and temperatures
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AddRecipeForm;