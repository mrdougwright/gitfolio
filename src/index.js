import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, Router, Route } from 'react-router'
import App from './components/App';
import NotFound from './components/NotFound'

const Root = () => {
  return (
    <Router history={browserHistory}>
      <div>
        <Route path="/(:githubUser)" component={App} />
        <Route path="*" component={NotFound} />
      </div>
    </Router>
  )
}

ReactDOM.render(
  <Root />,
  document.getElementById('root')
);
