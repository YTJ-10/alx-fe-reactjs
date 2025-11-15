import React from 'react';
import { Link } from 'react-router-dom';
import useRecipeStore from './recipeStore';
import FavoriteButton from './FavoriteButton';

const FavoritesList = () => {
  const favoriteRecipes = useRecipeStore(state => state.favoriteRecipes);
  const favorites = useRecipeStore(state => state.favorites);

  if (favorites.length === 0) {
    return (
      <div className="favorites-list">
        <div className="favorites-header">
          <h2>⭐ My Favorites</h2>
          <span className="favorites-count">0 recipes</span>
        </div>
        <div className="empty-favorites">
          <div className="empty-icon">🤍</div>
          <h3>No favorites yet</h3>
          <p>Start adding recipes to your favorites by clicking the heart icon!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="favorites-list">
      <div className="favorites-header">
        <h2>⭐ My Favorites</h2>
        <span className="favorites-count">{favorites.length} recipe{favorites.length !== 1 ? 's' : ''}</span>
      </div>
      
      <div className="favorites-grid">
        {favoriteRecipes.map((recipe) => (
          <div key={recipe.id} className="favorite-recipe-card">
            <Link to={`/recipe/${recipe.id}`} className="favorite-recipe-link">
              <div className="favorite-recipe-content">
                <h3>{recipe.title}</h3>
                <p className="favorite-recipe-description">{recipe.description}</p>
                <div className="favorite-recipe-meta">
                  <span className="cooking-time">⏱️ {recipe.cookingTime} min</span>
                  <span className="difficulty">📊 {recipe.difficulty}</span>
                  <span className="category">🏷️ {recipe.category}</span>
                </div>
              </div>
            </Link>
            <div className="favorite-recipe-actions">
              <FavoriteButton recipeId={recipe.id} size="small" />
              <Link to={`/recipe/${recipe.id}`} className="view-recipe-button">
                View Recipe
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesList;