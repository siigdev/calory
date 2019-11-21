import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../constants'

import { AppConsumer } from '../AppContextProvider'

import Block from './Block';

class Progress extends Component {
  render() {
    const { startColor, endColor, value, opacity, style, ...props } = this.props;

    return (
      <AppConsumer>
      {appConsumer => (
      <Block row center style={[styles.background, styles]} {...props}>
        <LinearGradient
          end={{ x: 1, y: 0 }}
          style={[styles.overlay, { flex: value }]}
          colors={[appConsumer.theme.colors.primary, appConsumer.theme.colors.secondary]}
        >
          <LinearGradient
            end={{ x: 1, y: 0 }}
            colors={[startColor, endColor]}
            style={[styles.active, { flex: value }]}
          />
        </LinearGradient>
      </Block>
      )}
      </AppConsumer>
    )
  }
}

Progress.defaultProps = {
  value: 0.75,
  opacity: 0.2,
}

export default Progress;

const styles = StyleSheet.create({
  background: {
    backgroundColor: theme.colors.gray3,
    height: 4,
    marginVertical: 8,
    borderRadius: 1
  },
  overlay: {
    height: 5,
    maxHeight: 5,
    borderRadius: 1,
    paddingHorizontal: 4,
  },
  active: {
    marginTop: 4,
    height: 5,
    maxHeight: 5,
    borderRadius: 1,
  }
})