import React, { useState, useCallback } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';

import { updateSearch, sortMenu } from 'Redux/actions/filter-menu';
import './search.scss';

const SearchBar = ({ updateSearch, sortMenu }) => {
  const [sortByPrice, setSortByPrice] = useState(true);

  const updateSearchWithDebounce = useCallback(debounce(updateSearch, 1000), []);

  const handleUpdateSearch = ({ target }) => {
    updateSearchWithDebounce(target.value);
  }

  const handleSortByPrice = (value) => {
    setSortByPrice(!sortByPrice);
    sortMenu(value);
  }
  
  return (
    <div className="search-container">
      <input
        type="text"
        title="Find your dish"
        placeholder="Search..."
        onChange={handleUpdateSearch}
      />
      <div className="search">
        {sortByPrice ? (
          <button
            title="Sort by price"
            className="sort"
            value="up"
            onClick={({ target }) => handleSortByPrice(target.value)}
          >
            &uArr;
          </button>
          ) : (
          <button 
            title="Sort by price"
            className="sort"
            value="down"
            onClick={({ target }) => handleSortByPrice(target.value)}
          >
            &dArr;
          </button>
          )}
      </div>
    </div>
  );
};

SearchBar.propTypes = {
  updateSearch: PropTypes.func.isRequired,
  sortMenu: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  updateSearch,
  sortMenu
};

export default connect(
  null,
  mapDispatchToProps
)(SearchBar);

