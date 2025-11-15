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
      difficulty: "Easy"
    },
    {
      id: 2,
      title: "Vegetable Stir Fry",
      description: "Quick and healthy vegetable stir fry with Asian flavors",
      ingredients: ["2 cups mixed vegetables", "2 tbsp soy sauce", "1 tbsp ginger", "2 cloves garlic", "1 tbsp oil"],
      instructions: "Heat oil, sauté garlic and ginger. Add vegetables and stir fry. Add soy sauce and serve.",
      cookingTime: 15,
      difficulty: "Medium"
    },
    {
      id: 3,
      title: "Chocolate Chip Cookies",
      description: "Classic chocolate chip cookies that are soft and chewy",
      ingredients: ["2 1/4 cups flour", "1 tsp baking soda", "1 cup butter", "3/4 cup sugar", "2 cups chocolate chips"],
      instructions: "Cream butter and sugars. Add eggs and vanilla. Mix in dry ingredients. Bake at 375°F for 9-11 minutes.",
      cookingTime: 25,
      difficulty: "Easy"
    }
  ],
  
  // Search and filter state
  searchTerm: '',
  filters: {
    difficulty: '',
    maxCookingTime: '',
    ingredients: ''
  },
  
  // Actions
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
  }
}));

export default useRecipeStore;