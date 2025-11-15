import { useParams, Link } from 'react-router-dom';
import useRecipeStore from './recipeStore';
import DeleteRecipeButton from './DeleteRecipeButton';

const RecipeDetails = () => {
  const { id } = useParams();
  const recipeId = parseInt(id);
  const recipe = useRecipeStore(state =>
    state.recipes.find(recipe => recipe.id === recipeId)
  );

  if (!recipe) {
    return (
      <div className="recipe-details">
        <div className="error-message">
          <h2>Recipe not found</h2>
          <p>The recipe you're looking for doesn't exist.</p>
          <Link to="/" className="back-button">Back to Recipes</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="recipe-details">
      <div className="recipe-header">
        <Link to="/" className="back-button">← Back to Recipes</Link>
        <div className="recipe-actions">
          <Link to={`/edit-recipe/${recipe.id}`} className="edit-button">
            Edit Recipe
          </Link>
          <DeleteRecipeButton recipeId={recipe.id} />
        </div>
      </div>

      <div className="recipe-content">
        <h1>{recipe.title}</h1>
        <p className="recipe-meta">
          <span className="cooking-time">⏱️ {recipe.cookingTime} minutes</span>
          <span className="difficulty">📊 {recipe.difficulty}</span>
        </p>
        
        <div className="description-section">
          <h2>Description</h2>
          <p>{recipe.description}</p>
        </div>

        <div className="ingredients-section">
          <h2>Ingredients</h2>
          <ul>
            {recipe.ingredients?.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>

        <div className="instructions-section">
          <h2>Instructions</h2>
          <p>{recipe.instructions}</p>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;