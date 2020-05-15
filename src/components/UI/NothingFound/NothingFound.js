import React from 'react';

import nothingFound from 'pictures/empty_plate.jpg';
import './nothing-found.scss';

const NothingFound = () => (
    <div className="info-block nothing-found">
        <img 
            src={nothingFound} 
            alt="empty plate"
        />
        <p>Nothing found for your request!</p>
    </div>
);

export default NothingFound;