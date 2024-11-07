import React from 'react';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import "./css/userfresh.css"


const WishingUser = () => {
  return (
    <div className="wishing-user-container">
      <div className="wishing-message">
        <p className='wishing-p'>Wishing You to be at Your Best Today</p>
      </div>

      <div className="user-info-container">
      <div className="user-info">
        <PublishedWithChangesIcon className="info-icon" />
        <p>Would Like More About You</p>
      </div>
      <div className="tips-section">
        <LightbulbIcon className="tips-icon" />
        <p>Tips That Help You</p>
      </div>
      </div>
    </div>
  );
};

export default WishingUser;
