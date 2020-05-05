import React from 'react';
import PropTypes from 'prop-types';

import './error.scss';

const Error = ({ message }) => (
    <div className="info-block">
        <img 
            src={"https://cdn.dribbble.com/users/381530/screenshots/3949858/404.gif"} 
            alt="error"
        />
        <p>{message}</p>
    </div>
);

Error.propTypes = {
    message: PropTypes.string
};

Error.defaultProps = {
    message: 'Something goes wrong, try again later!'
};

export default Error;