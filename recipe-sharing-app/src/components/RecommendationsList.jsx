import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useRecipeStore from './recipeStore';
import FavoriteButton from './FavoriteButton';

const RecommendationsList = () => {
  const recommendations = useRecipeStore(state => state.recommendations);
  const favorites = useRecipeStore(state => state.favorites);
  const generateRecommendations = useRecipeStore(state => state.generateRecommendations);

  // Generate recommendations when component mounts or favorites change
  useEffect(() => {
    generateRecommendations();
  }, [favorites, generateRecommendations]);

  if (recommendations.length === 0) {
    return (
      <div className="recommendations-list">
        <div className="recommendations-header">
          <h2>💫 Recommended For You</h2>
        </div>
        <div className="empty-recommendations">
          <p>Add some recipes to your favorites to get personalized recommendations!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="recommendations-list">
      <div className="recommendations-header">
        <h2>💫 Recommended For You</h2>
        <p className="recommendations-subtitle">
          Based on your favorite recipes and preferences
        </p>
      </div>
      
      <div className="recommendations-grid">
        {recommendations.map((recipe, index) => (
          <div key={recipe.id} className="recommendation-card">
            <div className="recommendation-badge">
              #{index + 1} Recommendation
            </div>
            <Link to={`/recipe/${recipe.id}`} className="recommendation-link">
              <div className="recommendation-content">
                <h3>{recipe.title}</h3>
                <p className="recommendation-description">{recipe.description}</p>
                <div className="recommendation-meta">
                  <span className="cooking-time">⏱️ {recipe.cookingTime} min</span>
                  <span className="difficulty">📊 {recipe.difficulty}</span>
                  <span className="category">🏷️ {recipe.category}</span>
                </div>
                {recipe.tags && recipe.tags.length > 0 && (
                  <div className="recommendation-tags">
                    {recipe.tags.slice(0, 2).map((tag, tagIndex) => (
                      <span key={tagIndex} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
            <div className="recommendation-actions">
              <FavoriteButton recipeId={recipe.id} size="small" />
              <Link to={`/recipe/${recipe.id}`} className="view-recipe-button">
                Try This
              </Link>
            </div>
          </div>
        ))}
      </div>
      
      <div className="recommendations-footer">
        <button 
          onClick={generateRecommendations}
          className="refresh-recommendations-button"
        >
          🔄 Refresh Recommendations
        </button>
      </div>
    </div>
  );
};

export default RecommendationsList;