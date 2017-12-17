import * as cx from 'classnames';
import * as React from 'react';

import './Pagination.scss';

export interface IPaginationProps {
  readonly currentPage?: number;
  readonly onPaginate?: (value: number) => void;
}

const defaultProps: IPaginationProps = {
  currentPage: 1,
  onPaginate() {},
};

const Pagination: React.SFC<IPaginationProps> = ({ currentPage, onPaginate }) => {
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
};

Pagination.defaultProps = defaultProps;

export default Pagination;
