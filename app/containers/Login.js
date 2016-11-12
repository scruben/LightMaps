import React, { Component, PropTypes } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

class LogInComponent extends Component {
  static propTypes = {
    routes: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = { username: 'Username', password: 'Password' };
  }

  render () {
    return (
      // <Text onPress={Actions.main}>
      //   Login: {this.props.routes.scene.title}.
      // </Text>
      <View style={{margin: 128}}>
        <Text onPress={Actions.main}>Press to log in!</Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({ username: text})}
          value={this.state.username}
        />
        <TextInput
          style={{height: 40, borderColor: 'gray'}}
          onChangeText={(text) => this.setState({ password: text})}
          value={''}
          secureTextEntry={true}
        />
        <Button onPress={onPressLearnMore} title="Log in" color="#841584" accessibilityLabel="Log in" />
      </View>
    );
  }
}

const onPressLearnMore = () => { Alert.alert('Button has been pressed!'); };

export default connect(({routes}) => ({routes}))(LogInComponent);
