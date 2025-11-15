import { Link } from 'react-router-dom';
import useRecipeStore from './recipeStore';
import FavoriteButton from './FavoriteButton';

const RecipeList = () => {
  const filteredRecipes = useRecipeStore(state => state.filteredRecipes);
  const searchTerm = useRecipeStore(state => state.searchTerm);
  const filters = useRecipeStore(state => state.filters);

  const hasActiveSearch = searchTerm !== '';
  const hasActiveFilters = filters.difficulty !== '' || 
                          filters.maxCookingTime !== '' || 
                          filters.ingredients !== '';

  const getResultsMessage = () => {
    if (filteredRecipes.length === 0) {
      if (hasActiveSearch || hasActiveFilters) {
        return 'No recipes found matching your criteria. Try adjusting your search or filters.';
      }
      return 'No recipes yet. Add your first recipe!';
    }

    if (hasActiveSearch || hasActiveFilters) {
      return `Found ${filteredRecipes.length} recipe${filteredRecipes.length !== 1 ? 's' : ''} matching your criteria`;
    }

    return `All Recipes (${filteredRecipes.length})`;
  };

  return (
    <div className="recipe-list">
      <div className="recipe-list-header">
        <h2>{getResultsMessage()}</h2>
      </div>

      {filteredRecipes.length === 0 ? (
        <div className="empty-state">
          <p>{getResultsMessage()}</p>
          {(hasActiveSearch || hasActiveFilters) && (
            <p className="empty-state-suggestion">
              You might want to clear your search and filters to see all recipes.
            </p>
          )}
        </div>
      ) : (
        <div className="recipes-grid">
          {filteredRecipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <div className="recipe-card-header">
                <FavoriteButton recipeId={recipe.id} size="small" />
                {recipe.category && (
                  <span className="recipe-category-badge">{recipe.category}</span>
                )}
              </div>
              <Link to={`/recipe/${recipe.id}`} className="recipe-link">
                <h3>{recipe.title}</h3>
                <p className="recipe-description">{recipe.description}</p>
                <div className="recipe-meta">
                  <span className="cooking-time">⏱️ {recipe.cookingTime} min</span>
                  <span className="difficulty">📊 {recipe.difficulty}</span>
                </div>
                {(hasActiveSearch && searchTerm) && (
                  <div className="search-highlight">
                    Matches your search
                  </div>
                )}
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