import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { DebounceInput } from 'react-debounce-input';

import { updateSearch, sortMenu } from 'Redux/actions/filter-menu';
import './search.scss';

const SearchBar = ({ searchQuery, updateSearch, sortMenu }) => {
  const [sortByPrice, setSortByPrice] = useState(true);

  const handleSortByPrice = (value) => {
    setSortByPrice(!sortByPrice);
    sortMenu(value);
  }
  
  return (
    <div className="search-container">
      <DebounceInput
        minLength={2}
        debounceTimeout={1000}
        type="text"
        value={searchQuery}
        title="Find your dish"
        placeholder="Search..."
        onChange={({ target }) => updateSearch(target.value)}
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
  sortMenu: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired
};

const mapStateToProps = ({ filter }) => ({
  searchQuery: filter.searchQuery
});

const mapDispatchToProps = {
  updateSearch,
  sortMenu
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);

