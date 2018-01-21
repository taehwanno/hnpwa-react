import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import './Pagination.scss';

const propTypes = {
  currentPage: PropTypes.number,
  onPaginate: PropTypes.func,
};

const defaultProps = {
  currentPage: 1,
  onPaginate() {},
};

function Pagination({ currentPage, onPaginate }) {
  const prevDisabled = currentPage === 1;
  const nextDisabled = currentPage === 10;

  const prevButtonClassName = cx('Pagination__button', {
    'Pagination__button--disabled': prevDisabled,
  });

  const nextButtonClassName = cx('Pagination__button', {
    'Pagination__button--disabled': nextDisabled,
  });

  return (
    <div className="Pagination">
      <div className="Pagination__inner">
        <button
          className={prevButtonClassName}
          data-button="prev"
          disabled={prevDisabled}
          type="button"
          onClick={() => onPaginate(currentPage - 1)}
        >
          {'<'} Prev
        </button>
        {currentPage} / 10
        {' '}
        <button
          className={nextButtonClassName}
          data-button="next"
          disabled={nextDisabled}
          type="button"
          onClick={() => onPaginate(currentPage + 1)}
        >
          Next {'>'}
        </button>
      </div>
    </div>
  );
}

Pagination.propTypes = propTypes;
Pagination.defaultProps = defaultProps;

export default Pagination;
