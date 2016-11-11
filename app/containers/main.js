import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ToastAndroid,
  Alert,
  AsyncStorage,
} from 'react-native';
import { Router, Scene, Actions, ActionConst } from 'react-native-router-flux';
import { connect, Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';

const RouterWithRedux = connect()(Router);
import reducers from '../reducers';

import LogInComponent from './Login.js';
import MainSceneComponent from './MainScene.js';

const scenes = Actions.create(
    <Scene key="root">
      <Scene key="main" component={MainSceneComponent} type={ActionConst.REPLACE} title="Main"/>
      <Scene key="login" component={LogInComponent} title="Log in" initial={true}/>
    </Scene>
);

const middleware = [/* ...your middleware (i.e. thunk) */];
const store = compose(
  applyMiddleware(...middleware)
)(createStore)(reducers);

export default class lightMap extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      tokenId: ''
    };
  }

  render() {

    AsyncStorage.getItem("tokenId").then((value) => {
      if (value && value !== '') {
        this.setState({"tokenId": value});
        Actions.main();
      }
      else {
        Alert.alert('You do not have tokenId!');
      }
    }).catch((error) => {
      Alert.alert('Oooops!');
    });

    // ToastAndroid.show('This is a toast with short duration', ToastAndroid.LONG);

    // return (
    //   <View style={styles.container}>
    //     <Text
    //       style={styles.welcome}
    //       onPress={() => ToastAndroid.show('Ok, great, you pressed a text... lucky you!', ToastAndroid.LONG)} >
    //       Hello world! Let's login
    //     </Text>
    //   </View>
    // );

    return (
      <Provider store={store}>
        <RouterWithRedux scenes={scenes}>
        </RouterWithRedux>
      </Provider>
    );

  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
// });
