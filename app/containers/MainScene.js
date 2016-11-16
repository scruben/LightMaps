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

const accessToken = 'pk.eyJ1Ijoic2NydWJlbiIsImEiOiJjaXZod3gxMnYwMXkzMm9wM3RteXZtMnRjIn0._B1h7EjBMLvDFp6nU4Z2mQ';
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
    // Load map data

  }

  state = {
    center: {
      latitude: 41.394501,
      longitude: 2.187818
    },
    currentPosition: {},
    zoom: 14,
    userTrackingMode: Mapbox.userTrackingMode.none,
    annotations: [{
      coordinates: [41.394501,2.197818],
      type: 'point',
      title: 'Pingpongworks',
      subtitle: 'Ping pong school',
      rightCalloutAccessory: {
        source: { uri: 'http://pngimg.com/upload/small/ping_pong_PNG10381.png' },
        height: 25,
        width: 25
      },
      annotationImage: {
        source: { uri: 'http://pngimg.com/upload/small/ping_pong_PNG10381.png' },
        height: 25,
        width: 25
      },
      id: 'marker1'
    }]
  };

  onRegionDidChange = (location) => {
    this.setState({ currentZoom: location.zoomLevel });
    console.log('onRegionDidChange', location);
  };
  onRegionWillChange = (location) => {
    console.log('onRegionWillChange', location);
  };
  onUpdateUserLocation = (location) => {
    // console.log('onUpdateUserLocation', location);
    this.setState({ currentPosition: location });
    console.log(this.state.currentPosition)
  };
  onOpenAnnotation = (annotation) => {
    console.log('onOpenAnnotation', annotation);
  };
  onRightAnnotationTapped = (e) => {
    console.log('onRightAnnotationTapped', e);
  };
  onLongPress = (location) => {
    console.log('onLongPress', location);
  };
  onTap = (location) => {
    console.log('onTap', location);
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
          annotations={this.state.annotations}
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
    animated = true);
}

const mapDispatchToProps = (dispatch) => ({
  setIdData: (token) => dispatch(setIdData(token)),
});

export default connect(({routes, auth})=>({routes, auth}), mapDispatchToProps)(MainSceneComponent);
