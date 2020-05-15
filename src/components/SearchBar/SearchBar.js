import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { DebounceInput } from 'react-debounce-input';

import { updateSearch, sortMenu, pageChange } from 'Redux/actions/filter-menu';
import './search.scss';

const SearchBar = ({ 
  searchQuery, 
  updateSearch, 
  sortMenu, 
  pageChange 
}) => {
  const [sortByPrice, setSortByPrice] = useState(true);

  const handleSortByPrice = (value) => {
    setSortByPrice(!sortByPrice);
    sortMenu(value);
  };

  const handlerSearch = ({ target }) => {
    updateSearch(target.value);
    pageChange(0);
  };
  
  return (
    <div className="search-container">
      <DebounceInput
        minLength={2}
        debounceTimeout={1000}
        type="text"
        value={searchQuery}
        title="Find your dish"
        placeholder="Search..."
        onChange={event => handlerSearch(event)}
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
  searchQuery: PropTypes.string.isRequired,
  pageChange: PropTypes.func.isRequired
};

const mapStateToProps = ({ filter }) => ({
  searchQuery: filter.searchQuery
});

const mapDispatchToProps = {
  updateSearch,
  sortMenu,
  pageChange
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);

