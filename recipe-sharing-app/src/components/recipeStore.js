import { create } from 'zustand';

const useRecipeStore = create((set, get) => ({
  recipes: [
    {
      id: 1,
      title: "Classic Pancakes",
      description: "Fluffy homemade pancakes perfect for weekend breakfast",
      ingredients: ["1 cup flour", "2 tbsp sugar", "1 tbsp baking powder", "1 cup milk", "1 egg", "2 tbsp melted butter"],
      instructions: "Mix dry ingredients. Add wet ingredients. Cook on griddle until golden brown.",
      cookingTime: 20,
      difficulty: "Easy",
      category: "Breakfast",
      tags: ["quick", "family-friendly"]
    },
    {
      id: 2,
      title: "Vegetable Stir Fry",
      description: "Quick and healthy vegetable stir fry with Asian flavors",
      ingredients: ["2 cups mixed vegetables", "2 tbsp soy sauce", "1 tbsp ginger", "2 cloves garlic", "1 tbsp oil"],
      instructions: "Heat oil, sauté garlic and ginger. Add vegetables and stir fry. Add soy sauce and serve.",
      cookingTime: 15,
      difficulty: "Medium",
      category: "Dinner",
      tags: ["healthy", "vegetarian", "quick"]
    },
    {
      id: 3,
      title: "Chocolate Chip Cookies",
      description: "Classic chocolate chip cookies that are soft and chewy",
      ingredients: ["2 1/4 cups flour", "1 tsp baking soda", "1 cup butter", "3/4 cup sugar", "2 cups chocolate chips"],
      instructions: "Cream butter and sugars. Add eggs and vanilla. Mix in dry ingredients. Bake at 375°F for 9-11 minutes.",
      cookingTime: 25,
      difficulty: "Easy",
      category: "Dessert",
      tags: ["sweet", "family-friendly"]
    },
    {
      id: 4,
      title: "Greek Salad",
      description: "Fresh and healthy Mediterranean salad with feta cheese",
      ingredients: ["2 cucumbers", "4 tomatoes", "1 red onion", "200g feta cheese", "kalamata olives", "olive oil"],
      instructions: "Chop vegetables, mix with olives and feta. Dress with olive oil and oregano.",
      cookingTime: 10,
      difficulty: "Easy",
      category: "Lunch",
      tags: ["healthy", "vegetarian", "mediterranean"]
    },
    {
      id: 5,
      title: "Beef Lasagna",
      description: "Hearty Italian lasagna with rich meat sauce and cheese",
      ingredients: ["lasagna noodles", "500g ground beef", "tomato sauce", "ricotta cheese", "mozzarella", "parmesan"],
      instructions: "Cook beef sauce, layer with noodles and cheeses. Bake at 375°F for 45 minutes.",
      cookingTime: 60,
      difficulty: "Hard",
      category: "Dinner",
      tags: ["comfort-food", "italian"]
    }
  ],
  
  // Search and filter state
  searchTerm: '',
  filters: {
    difficulty: '',
    maxCookingTime: '',
    ingredients: ''
  },
  
  // Favorites and recommendations state
  favorites: [],
  recommendations: [],
  
  // Basic actions
  addRecipe: (newRecipe) => 
    set((state) => ({ 
      recipes: [...state.recipes, { ...newRecipe, id: Date.now() }] 
    })),
  
  updateRecipe: (id, updatedRecipe) =>
    set((state) => ({
      recipes: state.recipes.map(recipe =>
        recipe.id === id ? { ...recipe, ...updatedRecipe } : recipe
      )
    })),
  
  deleteRecipe: (id) =>
    set((state) => ({
      recipes: state.recipes.filter(recipe => recipe.id !== id)
    })),
  
  setRecipes: (recipes) => set({ recipes }),
  
  // Search and filter actions
  setSearchTerm: (term) => set({ searchTerm: term }),
  
  setFilters: (newFilters) => set((state) => ({ 
    filters: { ...state.filters, ...newFilters } 
  })),
  
  clearFilters: () => set({ 
    searchTerm: '',
    filters: {
      difficulty: '',
      maxCookingTime: '',
      ingredients: ''
    }
  }),
  
  // Favorites actions
  addFavorite: (recipeId) => 
    set((state) => ({ 
      favorites: [...state.favorites, recipeId] 
    })),
  
  removeFavorite: (recipeId) => 
    set((state) => ({
      favorites: state.favorites.filter(id => id !== recipeId)
    })),
  
  toggleFavorite: (recipeId) => 
    set((state) => {
      const isFavorite = state.favorites.includes(recipeId);
      return {
        favorites: isFavorite 
          ? state.favorites.filter(id => id !== recipeId)
          : [...state.favorites, recipeId]
      };
    }),
  
  // Check if recipe is favorite
  isFavorite: (recipeId) => {
    return get().favorites.includes(recipeId);
  },
  
  // Recommendations actions
  generateRecommendations: () => 
    set((state) => {
      const { recipes, favorites } = state;
      
      if (favorites.length === 0) {
        // If no favorites, recommend popular or quick recipes
        return {
          recommendations: recipes
            .filter(recipe => recipe.difficulty === "Easy" || recipe.cookingTime <= 20)
            .sort(() => Math.random() - 0.5)
            .slice(0, 3)
        };
      }
      
      // Get favorite recipes
      const favoriteRecipes = favorites.map(id => 
        recipes.find(recipe => recipe.id === id)
      ).filter(Boolean);
      
      // Extract preferences from favorites
      const favoriteCategories = [...new Set(favoriteRecipes.map(recipe => recipe.category))];
      const favoriteDifficulties = [...new Set(favoriteRecipes.map(recipe => recipe.difficulty))];
      const favoriteTags = favoriteRecipes.flatMap(recipe => recipe.tags || []);
      
      // Score recipes based on user preferences
      const scoredRecipes = recipes
        .filter(recipe => !favorites.includes(recipe.id)) // Exclude already favorited
        .map(recipe => {
          let score = 0;
          
          // Score based on category match
          if (favoriteCategories.includes(recipe.category)) {
            score += 3;
          }
          
          // Score based on difficulty preference
          if (favoriteDifficulties.includes(recipe.difficulty)) {
            score += 2;
          }
          
          // Score based on tag matches
          const matchingTags = (recipe.tags || []).filter(tag => 
            favoriteTags.includes(tag)
          ).length;
          score += matchingTags;
          
          // Bonus for quick recipes if user likes quick meals
          const likesQuickMeals = favoriteTags.includes("quick");
          if (likesQuickMeals && recipe.cookingTime <= 20) {
            score += 1;
          }
          
          return { ...recipe, score };
        })
        .filter(recipe => recipe.score > 0) // Only include recipes with some relevance
        .sort((a, b) => b.score - a.score) // Sort by relevance score
        .slice(0, 4); // Top 4 recommendations
      
      return { recommendations: scoredRecipes };
    }),
  
  // Computed filtered recipes
  get filteredRecipes() {
    const { recipes, searchTerm, filters } = get();
    
    return recipes.filter(recipe => {
      // Search term filter (title and description)
      const matchesSearch = searchTerm === '' || 
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Difficulty filter
      const matchesDifficulty = filters.difficulty === '' || 
        recipe.difficulty === filters.difficulty;
      
      // Cooking time filter
      const matchesCookingTime = filters.maxCookingTime === '' || 
        recipe.cookingTime <= parseInt(filters.maxCookingTime);
      
      // Ingredients filter
      const matchesIngredients = filters.ingredients === '' ||
        recipe.ingredients.some(ingredient =>
          ingredient.toLowerCase().includes(filters.ingredients.toLowerCase())
        );
      
      return matchesSearch && matchesDifficulty && matchesCookingTime && matchesIngredients;
    });
  },
  
  // Computed favorites list
  get favoriteRecipes() {
    const { recipes, favorites } = get();
    return favorites.map(id => 
      recipes.find(recipe => recipe.id === id)
    ).filter(Boolean);
  }
}));

export default useRecipeStore;