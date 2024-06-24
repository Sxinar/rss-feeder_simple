import React, { useState, useEffect } from 'react';
import FeedList from './components/FeedList';
import DarkModeToggle from './components/DarkModeToggle';
import './App.css';

const App = () => {
  const [feeds, setFeeds] = useState([]);

  useEffect(() => {
    // RSS beslemelerini burada API'den veya statik bir JSON dosyasından alabilirsiniz
    // Örnek bir JSON yapısı:
    fetch('https://example.com/rss-feeds')
      .then(response => response.json())
      .then(data => setFeeds(data.feeds))
      .catch(error => console.error('Error fetching RSS feeds:', error));
  }, []);

  return (
    <div className="App">
      <header>
        <h1>RSS Okuyucu</h1>
        <DarkModeToggle />
      </header>
      <FeedList feeds={feeds} />
    </div>
  );
}

export default App;
