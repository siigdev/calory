import React, {Component} from 'react';
import Navigation from './navigation';
import { Block } from './components';

const images = [
  require('./assets/icons/icon.png')
]

export default class App extends React.Component {
  render() {
    return (
      <Block>
        <Navigation />
      </Block>
    );
  }
}
