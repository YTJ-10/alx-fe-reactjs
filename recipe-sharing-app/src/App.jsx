import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RecipeList from './components/RecipeList';
import AddRecipeForm from './components/AddRecipeForm';
import RecipeDetails from './components/RecipeDetails';
import EditRecipeForm from './components/EditRecipeForm';
import SearchBar from './components/SearchBar';
import RecipeFilters from './components/RecipeFilters';
import FavoritesList from './components/FavoritesList';
import RecommendationsList from './components/RecommendationsList';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <h1>🍳 Recipe Sharing App</h1>
          <p>Share and discover amazing recipes!</p>
        </header>
        
        <main className="app-main">
          <div className="container">
            <Routes>
              <Route path="/" element={
                <>
                  <AddRecipeForm />
                  
                  {/* Personalization Section */}
                  <div className="personalization-section">
                    <div className="personalization-column">
                      <FavoritesList />
                    </div>
                    <div className="personalization-column">
                      <RecommendationsList />
                    </div>
                  </div>
                  
                  <div className="search-filters-section">
                    <div className="search-container">
                      <SearchBar />
                    </div>
                    <RecipeFilters />
                  </div>
                  
                  <RecipeList />
                </>
              } />
              <Route path="/recipe/:id" element={<RecipeDetails />} />
              <Route path="/edit-recipe/:id" element={<EditRecipeForm />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;