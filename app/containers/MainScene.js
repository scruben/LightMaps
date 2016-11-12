import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

class MainSceneComponent extends Component {
  static propTypes = {
    routes: PropTypes.object,
  };

  render () {
    return (
      <View style={{margin: 128}}>
        <Text>Logged in!</Text>
      </View>
    );
  }
}

export default connect(({routes}) => ({routes}))(MainSceneComponent);
