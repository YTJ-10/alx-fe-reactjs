import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import RecipeList from './components/RecipeList';
import AddRecipeForm from './components/AddRecipeForm';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>🍳 Recipe Sharing App</h1>
        <p>Share and discover amazing recipes!</p>
      </header>
      
      <main className="app-main">
        <div className="container">
          <AddRecipeForm />
          <RecipeList />
        </div>
      </main>
    </div>
  );
}

export default App;