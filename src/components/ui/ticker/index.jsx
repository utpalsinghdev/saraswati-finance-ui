import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Ticker = ({ messages }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 20000 / messages.length); 

    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="ticker-container">
      <div className="ticker-text gap-2">
        {messages.map((message, index) => (
          <span
            key={index}
            className={`ticker-content mr-4 ${index === currentIndex ? 'visible' : ''}`}
          >
            {message}
          </span>
        ))}
      </div>
    </div>
  );
};

Ticker.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Ticker;
