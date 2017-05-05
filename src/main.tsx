import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Router, Route, IndexRoute} from 'react-router';
import createHistory from 'history/createBrowserHistory'
const  injectTapEventPlugin = require('react-tap-event-plugin');

const history = createHistory()
import App from './components/app'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

ReactDOM.render(
    <Router history={history}>
        <Route path="/" component={App}>
        </Route>
    </Router>
, document.querySelector('#main'));
