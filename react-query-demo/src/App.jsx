import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import PostsComponent from './components/PostsComponent';
import Navigation from './components/Navigation';
import './App.css';

// Create a QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 10000, // Data stays fresh for 10 seconds
    },
  },
});

function App() {
  const [showPosts, setShowPosts] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <h1>React Query Demo - JSONPlaceholder Posts</h1>
        
        <Navigation showPosts={showPosts} setShowPosts={setShowPosts} />
        
        {showPosts && <PostsComponent />}
        
        <div className="cache-demo">
          <h3>Caching Demonstration:</h3>
          <p>
            1. Click "Hide Posts" to unmount the component<br />
            2. Wait a few seconds<br />
            3. Click "Show Posts" to mount it again<br />
            4. Observe that data loads instantly from cache (no loading spinner)<br />
            5. If you wait more than 10 seconds, it will refetch (due to staleTime)
          </p>
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;