import Search from './components/Search';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <h1>GitHub User Search</h1>
        <p>Search for GitHub users and view their profiles</p>
      </header>
      
      <main className="app-main">
        <Search />
      </main>
      
      <footer className="app-footer">
        <p>Built with React & GitHub API</p>
      </footer>
    </div>
  );
}

export default App;