import React from 'react';
import { Text, View, StyleSheet, Button, ActivityIndicator } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import ApiKeys from '../constants/ApiKeys'

const appId = ApiKeys.edamamConfig.appId;
const appKey = ApiKeys.edamamConfig.applicationKey;

export default class BarcodeScannerExample extends React.Component {
  state = {
    hasCameraPermission: null,
    scanned: false,
    isLoading: true,
    dataSource: null,
  };

  async componentDidMount() {
    this.getPermissionsAsync();
  }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  };

  render() {
    const { hasCameraPermission, scanned } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />

        {scanned && (
          <Button title={'Tap to Scan Again'} onPress={() => this.setState({ scanned: false })} />
        )}
      </View>
    );
  }

  handleBarCodeScanned = ({ type, data }) => {
    this.setState({ scanned: true });
    return fetch(`https://api.edamam.com/api/food-database/parser?upc=${data}&app_id=${appId}&app_key=${appKey}`)
      .then((response) => response.json())
      .then((responseJson) => {
        alert(`Der er sgu ${responseJson.hints[0].food.nutrients.ENERC_KCAL} Kcal i den der`);
        this.setState({
          isLoading: false,
          dataSource: responseJson.parsed,
        })
      })
      .catch((error) => {
        console.warn(error)
      });
    
  };
}