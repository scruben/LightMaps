import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';
import { Router, Scene, Actions, ActionConst } from 'react-native-router-flux';
import { connect, Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'remote-redux-devtools';

const RouterWithRedux = connect()(Router);
import reducers from '../reducers';
import apiClientService from '../middlewares/apiClient.js';

import LogInComponent from './Login.js';
import MainSceneComponent from './MainScene.js';

const scenes = Actions.create(
    <Scene key="root">
      <Scene key="main" component={MainSceneComponent} type={ActionConst.REPLACE} title="Main" initial={true}/>
      <Scene key="login" component={LogInComponent} type={ActionConst.REPLACE} title="Log in" />
    </Scene>
);

const middleware = [ apiClientService ];

const store = composeWithDevTools(
  applyMiddleware(...middleware)
)(createStore)(reducers);

export default class lightMap extends Component {
  render () {
    return (
      <Provider store={store}>
        <RouterWithRedux scenes={scenes}>
        </RouterWithRedux>
      </Provider>
    );
  }
}
