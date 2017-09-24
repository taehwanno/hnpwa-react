import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import './Pagination.scss';

const propTypes = {
  currentPage: PropTypes.number,
  maxPage: PropTypes.number,
  onPaginate: PropTypes.func,
};

const defaultProps = {
  currentPage: 1,
  maxPage: 1,
  onPaginate() {},
};

function Pagination({ currentPage, maxPage, onPaginate }) {
  const prevDisabled = currentPage === 1;
  const nextDisabeld = currentPage === maxPage;

  const prevButtonClassName = cx('Pagination__button', {
    'Pagination__button--disabled': prevDisabled,
  });

  const nextButtonClassName = cx('Pagination__button', {
    'Pagination__button--disabled': nextDisabeld,
  });

  return (
    <div className="Pagination">
      <div className="Pagination__inner">
        <button
          className={prevButtonClassName}
          disabled={prevDisabled}
          type="button"
          onClick={() => onPaginate(currentPage - 1)}
        >
          {'<'} Prev
        </button>
        <div className="Pagination__number">{currentPage} / {maxPage}</div>
        <button
          disabled={nextDisabeld}
          className={nextButtonClassName}
          type="button"
          onClick={() => onPaginate(currentPage + 1)}
        >
          {'>'} Next
        </button>
      </div>
    </div>
  );
}

Pagination.propTypes = propTypes;
Pagination.defaultProps = defaultProps;

export default Pagination;
