import React from 'react';
import FeedItem from './FeedItem';

const FeedList = ({ feeds }) => {
  return (
    <div className="feed-list">
      {feeds.map(feed => (
        <FeedItem key={feed.id} feed={feed} />
      ))}
    </div>
  );
}

export default FeedList;
