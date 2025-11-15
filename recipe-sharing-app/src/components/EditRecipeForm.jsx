import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import useRecipeStore from './recipeStore';

const EditRecipeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const recipeId = parseInt(id);
  
  const recipe = useRecipeStore(state =>
    state.recipes.find(recipe => recipe.id === recipeId)
  );
  const updateRecipe = useRecipeStore(state => state.updateRecipe);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    ingredients: [''],
    instructions: '',
    cookingTime: 0,
    difficulty: 'Easy'
  });

  useEffect(() => {
    if (recipe) {
      setFormData({
        title: recipe.title || '',
        description: recipe.description || '',
        ingredients: recipe.ingredients || [''],
        instructions: recipe.instructions || '',
        cookingTime: recipe.cookingTime || 0,
        difficulty: recipe.difficulty || 'Easy'
      });
    }
  }, [recipe]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...formData.ingredients];
    newIngredients[index] = value;
    setFormData(prev => ({
      ...prev,
      ingredients: newIngredients
    }));
  };

  const addIngredient = () => {
    setFormData(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, '']
    }));
  };

  const removeIngredient = (index) => {
    if (formData.ingredients.length > 1) {
      const newIngredients = formData.ingredients.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        ingredients: newIngredients
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.description.trim()) {
      alert('Please fill in required fields');
      return;
    }

    // Filter out empty ingredients
    const filteredIngredients = formData.ingredients.filter(ingredient => ingredient.trim() !== '');

    updateRecipe(recipeId, {
      ...formData,
      ingredients: filteredIngredients
    });

    navigate(`/recipe/${recipeId}`);
  };

  if (!recipe) {
    return (
      <div className="edit-recipe-form">
        <div className="error-message">
          <h2>Recipe not found</h2>
          <Link to="/" className="back-button">Back to Recipes</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="edit-recipe-form">
      <div className="form-header">
        <Link to={`/recipe/${recipeId}`} className="back-button">← Back to Recipe</Link>
        <h1>Edit Recipe</h1>
      </div>

      <form onSubmit={handleSubmit} className="recipe-form">
        <div className="form-group">
          <label htmlFor="title">Recipe Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter recipe title"
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Describe your recipe"
            className="form-textarea"
            rows="3"
            required
          />
        </div>

        <div className="form-group">
          <label>Ingredients</label>
          {formData.ingredients.map((ingredient, index) => (
            <div key={index} className="ingredient-input-group">
              <input
                type="text"
                value={ingredient}
                onChange={(e) => handleIngredientChange(index, e.target.value)}
                placeholder={`Ingredient ${index + 1}`}
                className="form-input"
              />
              <button
                type="button"
                onClick={() => removeIngredient(index)}
                className="remove-button"
                disabled={formData.ingredients.length === 1}
              >
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={addIngredient} className="add-button">
            + Add Ingredient
          </button>
        </div>

        <div className="form-group">
          <label htmlFor="instructions">Instructions</label>
          <textarea
            id="instructions"
            name="instructions"
            value={formData.instructions}
            onChange={handleInputChange}
            placeholder="Step-by-step instructions"
            className="form-textarea"
            rows="4"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="cookingTime">Cooking Time (minutes)</label>
            <input
              type="number"
              id="cookingTime"
              name="cookingTime"
              value={formData.cookingTime}
              onChange={handleInputChange}
              min="0"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="difficulty">Difficulty</label>
            <select
              id="difficulty"
              name="difficulty"
              value={formData.difficulty}
              onChange={handleInputChange}
              className="form-select"
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-button">
            Update Recipe
          </button>
          <Link to={`/recipe/${recipeId}`} className="cancel-button">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default EditRecipeForm;