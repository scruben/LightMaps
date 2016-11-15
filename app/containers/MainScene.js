import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  ToastAndroid,
  AsyncStorage,
  StyleSheet,
  StatusBar,
  ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Mapbox, { MapView } from 'react-native-mapbox-gl';

import { setIdData } from '../actions/login.js';
import { getPanels } from '../actions/map.js';



const accessToken = require('../config.json').mapToken;
Mapbox.setAccessToken(accessToken);

class MainSceneComponent extends Component {
  static propTypes = {
    routes: PropTypes.object,
  };

  constructor(props) {
    super(props);
    AsyncStorage.getItem('idData').then((value) => {
      if (value && value !== '') {
        let idObj = JSON.parse(value);
        this.props.setIdData('',idObj.username, idObj.role); // Dirty but forces showing elements after login
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

    this.zoomPlus = zoomPlus.bind(this);
    this.zoomMinus = zoomMinus.bind(this);
    this.currentPos = currentPos.bind(this);

  }

  componentWillReceiveProps (nextProps) {
    if (this.props.auth.authToken !== nextProps.auth.authToken && nextProps.auth.authToken !== '') {
      this.props.getPanels({});
    }
  }

  state = {
    center: {
      latitude: 41.394501,
      longitude: 2.187818
    },
    currentPosition: {},
    zoom: 14,
    userTrackingMode: Mapbox.userTrackingMode.none,
  };

  onRegionDidChange = (location) => {
    this.setState({ currentZoom: location.zoomLevel });
    // console.log('onRegionDidChange', location);
  };
  onRegionWillChange = (location) => {
    // console.log('onRegionWillChange', location);
  };
  onUpdateUserLocation = (location) => {
    // console.log('onUpdateUserLocation', location);
    this.setState({ currentPosition: location });
    // console.log(this.state.currentPosition)
  };
  onOpenAnnotation = (annotation) => {
    // console.log('onOpenAnnotation', annotation);
  };
  onRightAnnotationTapped = (e) => {
    // console.log('onRightAnnotationTapped', e);
  };
  onLongPress = (location) => {
    // console.log('onLongPress', location);
  };
  onTap = (location) => {
    // console.log('onTap', location);
  };

  render() {
    StatusBar.setHidden(false);
    return (
      <View style={styles.container}>
        <MapView
          ref={map => { this._map = map; }}
          style={styles.map}
          initialCenterCoordinate={this.state.center}
          initialZoomLevel={this.state.zoom}
          initialDirection={0}
          rotateEnabled={false}
          scrollEnabled={true}
          zoomEnabled={true}
          showsUserLocation={true}
          loadingEnabled={true}
          styleURL={Mapbox.mapStyles.dark}
          userTrackingMode={this.state.userTrackingMode}
          annotations={this.props.mapState.panels}
          annotationsAreImmutable
          onChangeUserTrackingMode={this.onChangeUserTrackingMode}
          onRegionDidChange={this.onRegionDidChange}
          onRegionWillChange={this.onRegionWillChange}
          onOpenAnnotation={this.onOpenAnnotation}
          onRightAnnotationTapped={this.onRightAnnotationTapped}
          onUpdateUserLocation={this.onUpdateUserLocation}
          onLongPress={this.onLongPress}
          onTap={this.onTap}
        />
        {this._renderButtons()}
      </View>
    );
  }

  _renderButtons() {
    return (
      <View style={styles.buttonBar}>
        <View style = {{flexDirection: 'row'}}>
          <Button
            onPress={this.zoomPlus}
            title="Zoom +"
            color="#222222"
          />
          <Button
            onPress={this.zoomMinus}
            title="Zoom -"
            color="#222222"
          />
        </View>
        <View style ={{marginLeft: 10}}>
          <Button
            onPress={this.currentPos}
            title="My position"
            color="#222222"
          />
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch'
  },
  map: {
    flex: 1,
  },
  scrollView: {
    flex: 0
  },
  buttonBar: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    padding: 10,
    flexDirection: 'row'
  }

});

function zoomPlus () {
  this._map.setZoomLevel(this.state.currentZoom+1, animated = true);
}

function zoomMinus () {
  this._map.setZoomLevel(this.state.currentZoom-1, animated = true);
}

function currentPos () {
  this._map.setCenterCoordinate(
    this.state.currentPosition.latitude,
    this.state.currentPosition.longitude,
    animated = false);
}

const mapDispatchToProps = (dispatch) => ({
  setIdData: (token) => dispatch(setIdData(token)),
  getPanels: (region) => dispatch(getPanels(region)),
});

export default connect(({routes, auth, mapState})=>({routes, auth, mapState}), mapDispatchToProps)(MainSceneComponent);
