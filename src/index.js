import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory} from 'react-router';
import reduxThunk from 'redux-thunk';

import App from './components/app';
import Signin from './components/auth/signin';
import Signup from './components/auth/signup';
import Home from './components/home';
import Signout from './components/auth/signout';
import RequireAuth from './components/auth/require_auth';
import Welcome from './components/welcome';
import PlayGame from './components/playGame';
import CreateStage from './components/stages/createStage';
import Stage from './components/stages/stage';
import EditStage from './components/stages/editStage';
import StagesContainer from './components/stages/StagesContainer';
import InteractivePlayerContainer from './components/interactivePlayer/interactivePlayerContainer'
import CreateGame from './components/games/createGame';
import GameInstanceContainer from './components/gameInstances/gameInstanceContainer';
import UpdateGame from './components/games/UpdateGame';
import reducers from './reducers';
import { AUTH_USER } from './actions/types';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');

if(token) {
  store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={Welcome} />
        <Route path='signin' component={Signin} />
        <Route path='signup' component={Signup} />
        <Route path='signout' component={Signout} />
        <Route path='home' component={RequireAuth(Home)} />
        <Route path='play-game' component={RequireAuth(InteractivePlayerContainer)} />
        <Route path='play-game/:id' component={RequireAuth(GameInstanceContainer)} />
        <Route path='create-stage' component={RequireAuth(CreateStage)} />
        <Route path='create-game' component={RequireAuth(CreateGame)} />
        <Route path='stage/:name' component={RequireAuth(Stage)} />
        <Route path='edit-stage/:name' component={RequireAuth(EditStage)} />
        <Route path='all-stages' component={RequireAuth(StagesContainer)} />
        <Route path='update-game/:name' component={RequireAuth(UpdateGame)} />
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.container'));
