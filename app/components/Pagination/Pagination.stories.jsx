import React from 'react';
import { storiesOf } from '@storybook/react';

import Pagination from './';

const stories = storiesOf('Pagination', module);

class PaginationWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentPage: 1, maxPage: 10 };
    this.handlePaginate = this.handlePaginate.bind(this);
  }

  handlePaginate(number) {
    this.setState({ currentPage: number });
  }

  render() {
    return (
      <Pagination
        currentPage={this.state.currentPage}
        maxPage={this.state.maxPage}
        onPaginate={this.handlePaginate}
      />
    );
  }
}

stories
  .add('Pagination', () => <PaginationWrapper />);
