import React, {Component} from 'react';
import Navigation from './src/navigation';
import { Block } from './src/components';
import ApiKeys from './src/constants/ApiKeys';
import firebase from 'firebase';
import { AppContextProvider } from './src/AppContextProvider'

export default class App extends React.Component {
  render() {
    firebase.initializeApp(ApiKeys.FirebaseConfig);
    console.disableYellowBox = true;
    return (
      <AppContextProvider>
      <Block>
        <Navigation />
      </Block>
      </AppContextProvider>
    );
  }
}
