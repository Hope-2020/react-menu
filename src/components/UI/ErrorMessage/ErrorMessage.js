import React from 'react';
import PropTypes from 'prop-types';

import './error.scss';

const ErrorMessage = ({ message }) => (
    <div className="info-block">
        <img 
            src={"https://cdn.dribbble.com/users/381530/screenshots/3949858/404.gif"} 
            alt="error"
        />
        <p>{message}</p>
    </div>
);

ErrorMessage.propTypes = {
    message: PropTypes.string
};

ErrorMessage.defaultProps = {
    message: 'Something goes wrong, try again later!'
};

export default ErrorMessage;