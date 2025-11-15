import { Link } from 'react-router-dom';
import useRecipeStore from './recipeStore';

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.recipes);

  return (
    <div className="recipe-list">
      <h2>All Recipes ({recipes.length})</h2>
      {recipes.length === 0 ? (
        <div className="empty-state">
          <p>No recipes yet. Add your first recipe!</p>
        </div>
      ) : (
        <div className="recipes-grid">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <Link to={`/recipe/${recipe.id}`} className="recipe-link">
                <h3>{recipe.title}</h3>
                <p className="recipe-description">{recipe.description}</p>
                <div className="recipe-meta">
                  <span className="cooking-time">⏱️ {recipe.cookingTime} min</span>
                  <span className="difficulty">📊 {recipe.difficulty}</span>
                </div>
              </Link>
              <div className="recipe-card-actions">
                <Link to={`/edit-recipe/${recipe.id}`} className="edit-link">
                  Edit
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeList;