import React, { Component, PropTypes } from 'react';
import { View, Text, TextInput, Button, Alert, ToastAndroid } from 'react-native';
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
      // authToken: '',
      // role: '',
      // status: ''
    };
    this.onPressLogIn = onPressLogIn.bind(this);
  }

  //TODO: load role in the backend and then in the frontend state (and reducers)

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
        <Text>{this.props.authToken}</Text>
        </View>
      <Button onPress={this.onPressLogIn} title="Log in" color="#005500" accessibilityLabel="Log in" />
      </View>
    );
  }
}

function onPressLogIn () {
  // ToastAndroid.show(this.props.authToken, ToastAndroid.LONG);
  this.props.loginAction(this.state._username,this.state._password);
}

const mapStateToProps = (state) => ({
  username: state.auth.username,
  role: state.auth.role,
  authToken: state.auth.authToken,
  statusError: state.auth.statusError
});

const mapDispatchToProps = (dispatch) => ({
  loginAction: (user, pass) => dispatch(loginAction(user, pass)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LogInComponent);

// export default connect(({routes,loginPages}) => ({routes}))(LogInComponent);
