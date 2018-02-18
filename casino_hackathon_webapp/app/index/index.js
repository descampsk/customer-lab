import 'babel-polyfill';
import { createLogger } from 'redux-logger';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';

import { createEpicMiddleware } from 'redux-observable';
import rootEpic from '../epics/main_epic';

const epicMiddleware = createEpicMiddleware(rootEpic);

import reducer from '../reducer/main_reducer';

const history = createBrowserHistory();

const loggerMiddleware = createLogger();
const _routerMiddleware = routerMiddleware(history);

export const store = createStore(reducer, applyMiddleware(
			epicMiddleware,
			loggerMiddleware,
			_routerMiddleware));

import Routes from '../routes/RoutesContainer';

import App from '../app/AppContainer';

render(
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<Routes />
		</ConnectedRouter>
	</Provider>
	, document.getElementById('main')
);
