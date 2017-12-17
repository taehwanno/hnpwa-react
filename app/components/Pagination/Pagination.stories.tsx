import * as React from 'react';
import { storiesOf } from '@storybook/react';

import Pagination from './';

const stories = storiesOf('Pagination', module);

interface IPaginationWrapperState {
  currentPage: number;
}

class PaginationWrapper extends React.Component<{}, IPaginationWrapperState> {
  constructor(props) {
    super(props);
    this.state = { currentPage: 1 };
    this.handlePaginate = this.handlePaginate.bind(this);
  }

  public handlePaginate(value: number) {
    this.setState({ currentPage: value });
  }

  public render() {
    return (
      <Pagination
        currentPage={this.state.currentPage}
        onPaginate={this.handlePaginate}
      />
    );
  }
}

stories
  .add('Pagination', () => <PaginationWrapper />);
