import React, { Component } from 'react'
import { Text, Block, Input, Progress, Divider, Button } from '../components'
import ApiKeys from '../constants/ApiKeys'
import { StyleSheet, ScrollView, Picker } from 'react-native'
import firebase from 'firebase';

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
          calories: responseJson.hints[0].food.nutrients.ENERC_KCAL,
        });
        this.setState({
          isLoading: false,
          dataSource: responseJson.parsed,
        })
      })
      .catch((error) => {
        console.warn(error)
      });
  }
  addToHistory() {
    const currUser = firebase.auth().currentUser.uid;

    firebase.database().ref('calories/').child(currUser).push({
      amount: this.state.calories*this.state.grams / 100,
      date: firebase.database.ServerValue.TIMESTAMP
    })
  }
  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <Block padding={[0, theme.sizes.base * 2]}>
          <Text h1 center bold style={{ marginTop: 10 }}>{this.state.name} </Text>
          <Text h3 center primary>{this.state.calories} kcal / 100 g</Text>
          <Block row style={styles.container}>
            <Block center flex={1}>
              <Input
                style={[styles.input]}
                textAlign={'center'}
                keyboardType='phone-pad'
                defaultValue={this.state.grams}
                onChangeText={text => this.setState({ grams: text })}
              />
            </Block>
            <Block center flex={1}>
              <Picker
                selectedValue={this.state.language}
                style={[styles.picker]}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ language: itemValue })
                }>
                <Picker.Item label="Grams" value="grams" />
                <Picker.Item label="Pieces" value="pieces" />
              </Picker>
            </Block>
          </Block>


          <Block row>
            <Block center flex={1}>
              <Text size={20} spacing={1} primary>100 KM</Text>
              <Text spacing={0.7}>Løb</Text>
            </Block>

            <Block center flex={1}>
              <Text size={20} spacing={1} primary>100 KM</Text>
              <Text spacing={0.7}>Svømning</Text>
            </Block>

            <Block center flex={1}>
              <Text size={20} spacing={1} primary>100 KM</Text>
              <Text spacing={0.7}>Cykling</Text>
            </Block>
          </Block>

          <Divider />

          <Block >
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
              <Text>Calories in total</Text>
              <Text size={20} spacing={1} primary>{this.state.calories * this.state.grams / 100} kcal.</Text>
            </Block>

            <Button gradient onPress={() => this.addToHistory()}>
              <Text bold white center>Add to history</Text>
            </Button>
          </Block>
        </Block>
      </ScrollView >
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    height: 40,
    width: 100,
    borderRadius: 3,
    borderWidth: 0,
    borderColor: theme.colors.gray,
    borderWidth: 1
  },
  picker: {
    alignContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    height: 25,
    width: 130,
    borderRadius: 3,
    borderWidth: 0,
    borderColor: theme.colors.gray,
    borderWidth: 1
  }
})  