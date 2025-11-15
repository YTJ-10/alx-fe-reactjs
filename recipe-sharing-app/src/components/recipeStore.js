import { create } from 'zustand';

const useRecipeStore = create((set) => ({
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
    }
  ],
  
  // Add new recipe
  addRecipe: (newRecipe) => 
    set((state) => ({ 
      recipes: [...state.recipes, { ...newRecipe, id: Date.now() }] 
    })),
  
  // Update existing recipe
  updateRecipe: (id, updatedRecipe) =>
    set((state) => ({
      recipes: state.recipes.map(recipe =>
        recipe.id === id ? { ...recipe, ...updatedRecipe } : recipe
      )
    })),
  
  // Delete recipe
  deleteRecipe: (id) =>
    set((state) => ({
      recipes: state.recipes.filter(recipe => recipe.id !== id)
    })),
  
  // Set recipes (for initialization)
  setRecipes: (recipes) => set({ recipes })
}));

export default useRecipeStore;