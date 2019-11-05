import React, { Component } from 'react'
import { Text } from '../components'
import { View } from 'react-native'

export default class ProductPage extends Component {
    
    render() {
        //const product = this.props.navigation.getParam('product', 'error');
        return (
            <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}>
            <Text>Hej :) {product}</Text>
            </View>
        )
    }
}