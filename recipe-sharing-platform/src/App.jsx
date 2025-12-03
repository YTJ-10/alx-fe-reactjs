import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import RecipeDetail from './components/RecipeDetail';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Simple Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-800">RecipeShare</h1>
              <nav className="flex space-x-4">
                <a href="/" className="text-gray-600 hover:text-gray-900">Home</a>
                <a href="#" className="text-gray-600 hover:text-gray-900">Recipes</a>
                <a href="#" className="text-gray-600 hover:text-gray-900">Add Recipe</a>
              </nav>
            </div>
          </div>
        </header>

        {/* Main Content with Routes */}
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/recipe/:id" element={<RecipeDetail />} />
          </Routes>
        </main>

        {/* Simple Footer */}
        <footer className="bg-gray-800 text-white mt-12">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="text-center">
              <p className="text-lg font-semibold mb-2">Recipe Sharing Platform</p>
              <p className="text-gray-400">Share your favorite recipes with the world</p>
              <p className="text-gray-500 text-sm mt-4">&copy; {new Date().getFullYear()} All rights reserved</p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;