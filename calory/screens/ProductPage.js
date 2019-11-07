import React, { Component } from 'react'
import { Text, Block, Input, Progress, Divider, Button } from '../components'
import ApiKeys from '../constants/ApiKeys'
import { StyleSheet, ScrollView } from 'react-native'

import { theme } from '../constants';

const appId = ApiKeys.edamamConfig.appId;
const appKey = ApiKeys.edamamConfig.applicationKey;

export default class ProductPage extends Component {
  state = {
    name: '',
    grams: '100',
    calories: '',
    weight: '75',
    swimming: '21',
    walking: ''

  }
  componentDidMount() {
    const data = this.props.navigation.getParam('data', 'error');
    return fetch(`https://api.edamam.com/api/food-database/parser?upc=${data}&app_id=${appId}&app_key=${appKey}`)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ 
          name: responseJson.hints[0].food.label,
          calories: responseJson.hints[0].food.nutrients.ENERC_KCAL, });
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text h1 center bold>{this.state.name} </Text>
        <Text h3 center primary>{this.state.calories} kcal / 100 g</Text>
        <Block row><Input
          label="Grams"
          style={[styles.input]}
          keyboardType = 'phone-pad'
          defaultValue={this.state.grams}
          onChangeText={text => this.setState({ grams: text })}
        />
        </Block>

        <Block row>
          <Block center flex={1}>
            <Text size={20} spacing={1} primary>{this.calories/((this.state.swimming*this.state.weight)/200)} KM</Text>
            <Text spacing={0.7}>Løb</Text>
          </Block>

          <Block center flex={1}>
            <Text size={20} spacing={1} primary>1 KM</Text>
            <Text spacing={0.7}>Svømning</Text>
          </Block>

          <Block center flex={1}>
            <Text size={20} spacing={1} primary>2.786 KM</Text>
            <Text spacing={0.7}>Cykling</Text>
          </Block>
        </Block>

        <Divider margin={0} />

        <Block padding={[0, theme.sizes.base * 2]}>
          <Block style={{ marginBottom: theme.sizes.base }}>
            <Block row space="between" style={{ paddingLeft: 6 }}>
              <Text body spacing={0.7}>Protein</Text>
              <Text caption spacing={0.7}>55%</Text>
            </Block>
            <Progress value={0.55} />
          </Block>

          <Block style={{ marginBottom: theme.sizes.base }}>
            <Block row space="between" style={{ paddingLeft: 6 }}>
              <Text body spacing={0.7}>Carbohydrates</Text>
              <Text caption spacing={0.7}>35%</Text>
            </Block>
            <Progress value={0.35} />
          </Block>

          <Block style={{ marginBottom: theme.sizes.base }}>
            <Block row space="between" style={{ paddingLeft: 6 }}>
              <Text body spacing={0.7}>Fat</Text>
              <Text caption spacing={0.7}>10%</Text>
            </Block>
            <Progress value={0.10} />
          </Block>

          <Divider margin={0} />

          <Block row center space="between">
            <Text>Total Driver Discount</Text>
            <Text size={20} spacing={1} primary>$6.71</Text>
          </Block>
        </Block>
      </ScrollView >
    )
  }
}

const styles = StyleSheet.create({
  input: {
      borderRadius: 0,
      borderWidth: 0,
      borderBottomColor: theme.colors.gray,
      borderBottomWidth: 1
  }
})  