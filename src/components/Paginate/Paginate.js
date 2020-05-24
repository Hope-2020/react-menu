import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';

import { pageChange} from 'Redux/actions/filter-menu';
import { getVisibleMenu } from 'Redux/selectors';

import './paginate.scss';

const Paginate = ({ 
  menuItems, 
  pageSize, 
  currentPage, 
  pageChange 
}) => {

  const pageCount = Math.ceil(menuItems.length / pageSize);

  const handlePageChange = ({ selected }) => {
    pageChange(selected);
  };

  return (
    <ReactPaginate
      previousLabel={'<'}
      nextLabel={'>'}
      breakLabel={'...'}
      breakClassName={'break-me'}
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={handlePageChange}
      containerClassName={'pagination paginate__block'}
      subContainerClassName={'pages pagination'}
      activeClassName={'active'}
      pageClassName={'page-item paginate__item'}
      pageLinkClassName={'page-link paginate__link'}
      previousClassName={'page-item paginate__item'}
      nextClassName={'page-item paginate__item'}
      previousLinkClassName={'page-link'}
      nextLinkClassName={'page-link'}
      forcePage={currentPage}
    />
  );
};

const mapStateToProps = state => ({
  menuItems: getVisibleMenu(state),
  pageSize: state.filter.pageSize,
  currentPage: state.filter.currentPage
});

Paginate.propTypes = {
  menuItems: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  pageChange: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  { pageChange }
)(Paginate);

