import { Map } from 'immutable';
import * as React from 'react';

import LoadingIndicator from 'components/LoadingIndicator';

import './HackerNewsUser.scss';

interface IHackerNewsUserProps {
  readonly done?: () => void;
  readonly information?: Map<string, any> | null;
  readonly user: string;
  readonly onUserFetch?: (arg: string) => Promise<any>;
}

class HackerNewsUser extends React.Component<IHackerNewsUserProps> {
  public static defaultProps: IHackerNewsUserProps = {
    done: () => {},
    information: null,
    user: '',
    onUserFetch: (arg: string) => Promise.resolve(),
  };

  public componentWillMount() {
    const {
      done,
      information,
      user,
      onUserFetch,
    } = this.props;

    if (!information) {
      onUserFetch(user).then(done, done);
    }
  }

  public render() {
    const { information, user } = this.props;

    if (!information) {
      return (
        <LoadingIndicator
          active
          style={{ position: 'absolute', left: 'calc(50% - 24px)', marginTop: '30px' }}
        />
      );
    }

    return (
      <div className="HackerNewsUser">
        <table>
          <tbody>
            <tr>
              <td>User: </td>
              <td>{user}</td>
            </tr>
            <tr>
              <td>Created: </td>
              <td>{information.get('created')}</td>
            </tr>
            <tr>
              <td>Karma: </td>
              <td>{information.get('karma')}</td>
            </tr>
          </tbody>
        </table>
        <div className="HackerNewsUser__links">
          <a href={`https://news.ycombinator.com/submitted?id=${user}`}>submissions</a>
          {' | '}
          <a href={`https://news.ycombinator.com/threads?id=${user}`}>comments</a>
          {' | '}
          <a href={`https://news.ycombinator.com/favorites?id=${user}`}>favorites</a>
        </div>
      </div>
    );
  }
}

export default HackerNewsUser;
