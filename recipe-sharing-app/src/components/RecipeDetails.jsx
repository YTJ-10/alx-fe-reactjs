import { useParams, Link } from 'react-router-dom';
import useRecipeStore from './recipeStore';
import DeleteRecipeButton from './DeleteRecipeButton';
import FavoriteButton from './FavoriteButton';

const RecipeDetails = () => {
  const { id } = useParams();
  const recipeId = parseInt(id);
  const recipe = useRecipeStore(state =>
    state.recipes.find(recipe => recipe.id === recipeId)
  );
  const isFavorite = useRecipeStore(state => state.isFavorite(recipeId));

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
          <FavoriteButton recipeId={recipe.id} size="large" />
          <Link to={`/edit-recipe/${recipe.id}`} className="edit-button">
            Edit Recipe
          </Link>
          <DeleteRecipeButton recipeId={recipe.id} />
        </div>
      </div>

      <div className="recipe-content">
        <div className="recipe-title-section">
          <h1>{recipe.title}</h1>
          <div className="recipe-badges">
            {isFavorite && <span className="favorite-badge">⭐ Favorite</span>}
            <span className="difficulty-badge">{recipe.difficulty}</span>
            <span className="category-badge">{recipe.category}</span>
          </div>
        </div>

        <div className="recipe-meta-grid">
          <div className="meta-item">
            <span className="meta-label">Cooking Time</span>
            <span className="meta-value">⏱️ {recipe.cookingTime} minutes</span>
          </div>
          {recipe.tags && recipe.tags.length > 0 && (
            <div className="meta-item">
              <span className="meta-label">Tags</span>
              <div className="tags-list">
                {recipe.tags.map((tag, index) => (
                  <span key={index} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          )}
        </div>
        
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