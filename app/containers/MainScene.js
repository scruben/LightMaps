import React, { Component, PropTypes } from 'react';
import { View, Text, TextInput, Button, Alert, ToastAndroid, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { setIdData } from '../actions/login.js';

class MainSceneComponent extends Component {
  static propTypes = {
    routes: PropTypes.object,
  };

  constructor(props) {
    super(props);
    AsyncStorage.getItem('idData').then((value) => {
      if (value && value !== '') {
        let idObj = JSON.parse(value);
        this.props.setIdData(idObj.authToken,idObj.username, idObj.role);
        // AsyncStorage.removeItem('idData'); // Temporal way to log out
      }
      else {
        Actions.login();
      }
    }).catch((error) => {
      // Just in case log in again
      Actions.login();
    });

    // Load map data

  }

  render () {
    return (
      <View style={{margin: 128}}>
        <Text>Logged in!</Text>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setIdData: (token) => dispatch(setIdData(token)),
});

export default connect(({routes, auth})=>({routes, auth}), mapDispatchToProps)(MainSceneComponent);
