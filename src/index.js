import React from 'react';
import ReactDOM from 'react-dom';
import 'tachyons'
import { browserHistory, Router, Route } from 'react-router'
import App from './components/App';

const Root = () => {
  return (
    <Router history={browserHistory}>
      <div>
        <Route path="/:githubUser" component={App} />
      </div>
    </Router>
  )
}

ReactDOM.render(
  <Root />,
  document.getElementById('root')
);
