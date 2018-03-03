import * as React from 'react';

import Pagination from 'components/Pagination';

interface ILocationPaginationProps {
  currentPage?: number;
  done?: () => void;
  feedCount?: number;
  history: any;
  location: any;
  onPaginate?: (type: string, page: number) => Promise<any>;
}

class LocationPagination extends React.Component<ILocationPaginationProps> {
  public static defaultProps = {
    currentPage: 1,
    done() {},
    feedCount: 0,
    history: {},
    location: {},
    onPaginate: (type: string, page: number) => Promise.resolve(),
  };

  public static getRequestQuery(pathname: string): string[] {
    return pathname.split('/').filter(v => !!v);
  }

  public constructor(props: ILocationPaginationProps) {
    super(props);
    this.handlePaginate = this.handlePaginate.bind(this);
  }

  public componentWillMount() {
    const { done, feedCount } = this.props;
    const [type, stringPage] = LocationPagination.getRequestQuery(this.props.location.pathname);
    const page = parseInt(stringPage, 10);

    if (type && !Number.isNaN(page) && feedCount === 0) {
      this.props.onPaginate(type, page).then(done, done);
    }
  }

  public componentWillReceiveProps(nextProps: ILocationPaginationProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      const [type, page] = LocationPagination.getRequestQuery(nextProps.location.pathname);
      this.props.onPaginate(type, parseInt(page, 10));
    }
  }

  private handlePaginate(page: number) {
    const [type] = LocationPagination.getRequestQuery(this.props.location.pathname);
    this.props.history.push(`/${type}/${page}`);
  }

  public render() {
    const { currentPage } = this.props;

    return (
      <Pagination
        currentPage={currentPage}
        onPaginate={this.handlePaginate}
      />
    );
  }
}

export default LocationPagination;
