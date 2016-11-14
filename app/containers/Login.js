import React, { Component, PropTypes } from 'react';
import { View, Text, TextInput, Button, Alert, ToastAndroid, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { loginAction } from '../actions/login.js';

class LogInComponent extends Component {

  static propTypes = {
    routes: PropTypes.object,
  };

  constructor (props) {
    super(props);
    this.state = {
      _username: '',
      _password: '' ,
    };
    this.onPressLogIn = onPressLogIn.bind(this);
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.auth.authToken !== nextProps.auth.authToken && nextProps.auth.authToken !== '') {
      Actions.main();
    }
    if (this.props.auth.statusError !== nextProps.auth.statusError && nextProps.auth.statusError !== '') {
      Alert.alert(nextProps.auth.statusError);
    }
  }

  render () {
    return (
      <View style={{margin: 40, marginTop: 80, flex: 1, flexDirection: 'column', justifyContent: 'space-between'}}>
        <View>
          <Text  style={{fontSize: 18, color: '#000'}} >Username</Text>
          <TextInput
            style={{height: 40, fontSize: 18}}
            onChangeText={(text) => this.setState({ _username: text})}
            value={this.state._username}
          />
        <Text  style={{fontSize: 18, color: '#000', marginTop: 20}} >Password</Text>
          <TextInput
            style={{height: 40, fontSize: 18}}
            onChangeText={(text) => this.setState({ _password: text})}
            value={this.state._password}
            secureTextEntry={true}
          />
        </View>
      <Button
        onPress={this.onPressLogIn}
        title="Log in"
        color="#005500"
        accessibilityLabel="Log in" />
      </View>
    );
  }
}

function onPressLogIn () {
  this.props.loginAction(this.state._username,this.state._password);
}

const mapDispatchToProps = (dispatch) => ({
  loginAction: (user, pass) => dispatch(loginAction(user, pass)),
});

export default connect(({routes, auth})=>({routes, auth}), mapDispatchToProps)(LogInComponent);
