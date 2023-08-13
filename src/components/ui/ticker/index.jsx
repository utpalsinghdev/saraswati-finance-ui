import React from 'react';
import PropTypes from 'prop-types';

const Ticker = ({ children }) => {
  return (
    <div className="ticker-container w-full">
      <div className="ticker-text w-full">
        <span className="ticker-content w-full">{children}</span>
      </div>
    </div>
  );
};

Ticker.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Ticker;