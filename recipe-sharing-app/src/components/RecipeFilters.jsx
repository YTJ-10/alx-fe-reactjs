import React from 'react';
import useRecipeStore from './recipeStore';

const RecipeFilters = () => {
  const filters = useRecipeStore(state => state.filters);
  const setFilters = useRecipeStore(state => state.setFilters);
  const clearFilters = useRecipeStore(state => state.clearFilters);

  const hasActiveFilters = filters.difficulty !== '' || 
                          filters.maxCookingTime !== '' || 
                          filters.ingredients !== '';

  return (
    <div className="recipe-filters">
      <h3>Filter Recipes</h3>
      
      <div className="filters-grid">
        <div className="filter-group">
          <label htmlFor="difficulty">Difficulty</label>
          <select
            id="difficulty"
            value={filters.difficulty}
            onChange={(e) => setFilters({ difficulty: e.target.value })}
            className="filter-select"
          >
            <option value="">All Levels</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="cookingTime">Max Cooking Time (min)</label>
          <select
            id="cookingTime"
            value={filters.maxCookingTime}
            onChange={(e) => setFilters({ maxCookingTime: e.target.value })}
            className="filter-select"
          >
            <option value="">Any Time</option>
            <option value="15">15 minutes or less</option>
            <option value="30">30 minutes or less</option>
            <option value="45">45 minutes or less</option>
            <option value="60">60 minutes or less</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="ingredients">Contains Ingredient</label>
          <input
            type="text"
            id="ingredients"
            value={filters.ingredients}
            onChange={(e) => setFilters({ ingredients: e.target.value })}
            placeholder="e.g., chocolate, garlic"
            className="filter-input"
          />
        </div>
      </div>

      {hasActiveFilters && (
        <button onClick={clearFilters} className="clear-filters-button">
          Clear All Filters
        </button>
      )}
    </div>
  );
};

export default RecipeFilters;