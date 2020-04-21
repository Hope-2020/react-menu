import React from 'react';
import './error.scss';

const Error = () => (
    <div className="info-block">
        <img 
            src={"https://cdn.dribbble.com/users/381530/screenshots/3949858/404.gif"} 
            alt="error"
        />
        <p>Something goes wrong, try again later</p>
    </div>
);

export default Error;