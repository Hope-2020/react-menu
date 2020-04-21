import React from 'react';
import MenuItem from '../menu-item';

const ItemPage = ({ match, history }) => {
  return (
    <MenuItem match={match} history={history} />
  );
};

export default ItemPage;