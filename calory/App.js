import React, {Component} from 'react';
import Navigation from './navigation';
import { Block } from './components';
import ApiKeys from './constants/ApiKeys';
import firebase from 'firebase';

const images = [
  require('./assets/icons/icon.png')
]

export default class App extends React.Component {
  render() {
    firebase.initializeApp(ApiKeys.FirebaseConfig);
    return (
      <Block>
        <Navigation />
      </Block>
    );
  }
}
