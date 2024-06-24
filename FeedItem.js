import React from 'react';

const FeedItem = ({ feed }) => {
  return (
    <div className="feed-item">
      <h3>{feed.title}</h3>
      <p>{feed.description}</p>
      <a href={feed.link}>Devamını Oku</a>
    </div>
  );
}

export default FeedItem;
