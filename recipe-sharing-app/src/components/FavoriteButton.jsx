import React from 'react';
import useRecipeStore from './recipeStore';

const FavoriteButton = ({ recipeId, size = 'medium' }) => {
  const isFavorite = useRecipeStore(state => state.isFavorite(recipeId));
  const toggleFavorite = useRecipeStore(state => state.toggleFavorite);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(recipeId);
  };

  const sizeClasses = {
    small: 'favorite-btn-small',
    medium: 'favorite-btn-medium',
    large: 'favorite-btn-large'
  };

  return (
    <button
      onClick={handleClick}
      className={`favorite-button ${sizeClasses[size]} ${isFavorite ? 'favorited' : ''}`}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      {isFavorite ? '❤️' : '🤍'}
    </button>
  );
};

export default FavoriteButton;