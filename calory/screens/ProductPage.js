import React, { Component } from 'react'
import { Text, Block, Progress } from '../components'
import ApiKeys from '../constants/ApiKeys'
import { StyleSheet } from 'react-native'

import { theme } from '../constants';

const appId = ApiKeys.edamamConfig.appId;
const appKey = ApiKeys.edamamConfig.applicationKey;

export default class ProductPage extends Component {
  componentDidMount() {
    const data = this.props.navigation.getParam('data', 'error');
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

  }

  render() {
    return (
      <Block>
        <Block row center space="between" style={{ marginBottom: theme.sizes.base * 2 }}>
          <Progress value={0.81} />
          <Text>Protein</Text>
        </Block>
        <Block row center space="between" style={{ marginBottom: theme.sizes.base * 2 }}>
          <Text>Carbohydrates</Text>
        </Block>
        <Block row center space="between" style={{ marginBottom: theme.sizes.base * 2 }}>
          <Text>Fat</Text>
        </Block>
      </Block>
    )
  }
}

const styles = StyleSheet.create({
  thumb: {
    width: theme.sizes.base,
    height: theme.sizes.base,
    borderRadius: theme.sizes.base,
    borderColor: 'white',
    borderWidth: 3,
    backgroundColor: theme.colors.secondary,
},

});