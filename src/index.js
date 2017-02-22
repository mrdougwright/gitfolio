import 'tachyons'
import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, Router, Route } from 'react-router'
import App from './components/App';
import ListRepos from './components/ListRepos';

const Root = () => {
  return (
    <Router history={browserHistory}>
      <div>
        <Route path="/" component={App} />
        <Route path="/(:githubUser)" component={ListRepos} />
      </div>
    </Router>
  )
}

ReactDOM.render(
  <Root />,
  document.getElementById('root')
);
