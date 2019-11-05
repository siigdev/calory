import React, { Component } from 'react'
import { Text, Block } from '../components'
import ApiKeys from '../constants/ApiKeys'

const appId = ApiKeys.edamamConfig.appId;
const appKey = ApiKeys.edamamConfig.applicationKey;

export default class ProductPage extends Component {
  getdata() {
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
        <Text>Hej :)</Text>
      </Block>
    )
  }
}