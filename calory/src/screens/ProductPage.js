import React, { Component } from 'react'
import { Text, Block, Input, Progress, Divider, Button, Card } from '../components'
import ApiKeys from '../constants/ApiKeys'
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, ScrollView, Picker, Image, View } from 'react-native'
import firebase from 'firebase';
import { AppConsumer } from '../AppContextProvider'

import { theme } from '../constants';

const appId = ApiKeys.edamamConfig.appId;
const appKey = ApiKeys.edamamConfig.applicationKey;

export default class ProductPage extends Component {
  state = {
    name: '',
    grams: '100',
    calories: '',
    weight: 75,
    height: 188,
    gender: 'Male',
    age: 26,
    calorieburn: ''
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
        this.calculateWorkoutTime();
      })
      .catch((error) => {
        console.warn(error)
      });
  }
  addToHistory() {
    const currUser = firebase.auth().currentUser.uid;

    firebase.database().ref('calories/').child(currUser).push({
      amount: this.state.calories * this.state.grams / 100,
      date: firebase.database.ServerValue.TIMESTAMP
    })
  }
  calculateWorkoutTime() {
    if (this.state.gender == 'Male') {
      BMR = (13.397 * this.state.weight) + (4.799 * this.state.height) - (5.677 * this.state.age) + 88.362
    }
    else {
      BMR = (9.247 * this.state.weight) + (3.098 * this.height) + (4.330 * this.state.age) + 447.593
    }
    this.setState({ calorieburn: BMR })
  }
  render() {
    return (
      <AppConsumer>
        {appConsumer => (
          <ScrollView style={{ backgroundColor: theme.colors.gray4 }} showsVerticalScrollIndicator={false}>
            <LinearGradient colors={[appConsumer.theme.colors.primary, appConsumer.theme.colors.secondary]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.linearGradient}>
              <Block padding={[0, theme.sizes.base * 2]}>
                <Text h1 center white bold style={{ marginTop: 10 }}>{this.state.name} </Text>
                <Text h3 center white>{this.state.calories} kcal / 100 g</Text>
              </Block>

              <Block row style={styles.container}>
                <Block center flex={1}>
                  <Input
                    style={[styles.input]}
                    textAlign={'center'}
                    keyboardType='phone-pad'
                    defaultValue={this.state.grams}
                    onChangeText={text => { this.setState({ grams: text }), this.calculateWorkoutTime() }}
                  />
                </Block>
                <Block center flex={1}>
                  <View style={[styles.picker]}>
                    <Picker
                      style={[styles.picker]}
                      selectedValue={this.state.language}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({ language: itemValue })
                      }>
                      <Picker.Item label="Grams" value="grams" />
                      <Picker.Item label="Pieces" value="pieces" />
                    </Picker>
                  </View>
                </Block>
              </Block>
            </LinearGradient>
            <Block padding={[0, theme.sizes.base]}>
              <Card style={{ padding: theme.sizes.base / 2, marginTop: theme.sizes.base }}>
                <Block row>
                  <Block center flex={1}>
                    <Text size={20} spacing={1} style={{color: appConsumer.theme.colors.primary}}>{Math.floor(((this.state.calorieburn / 24) / 10.0) * 0.6 * 10)} MIN</Text>
                    <Text spacing={0.7}>Løb</Text>
                  </Block>

                  <Block center flex={1}>
                    <Text size={20} spacing={1} style={{color: appConsumer.theme.colors.primary}}>{Math.floor(((this.state.calorieburn / 24) / 8.3) * 0.6 * 10)} MIN</Text>
                    <Text spacing={0.7}>Svømning</Text>
                  </Block>

                  <Block center flex={1}>
                    <Text size={20} spacing={1} style={{color: appConsumer.theme.colors.primary}}>{Math.floor(((this.state.calorieburn / 24) / 7.5) * 0.6 * 10)} MIN</Text>
                    <Text spacing={0.7}>Cykling</Text>
                  </Block>
                </Block>
              </Card>

              <Card style={{ padding: theme.sizes.base / 2 }}>
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
                    <Text size={20} spacing={1} style={{color: appConsumer.theme.colors.primary}}>{this.state.calories * this.state.grams / 100} kcal.</Text>
                  </Block>

                  <Button gradient onPress={() => this.addToHistory()}>
                    <Text bold white center>Add to history</Text>
                  </Button>

                  <Image
                    style={{ width: 65, height: 25, alignSelf: 'flex-end' }}
                    source={require('../assets/images/edamambadge.png')}
                  />
                </Block>
              </Card>
            </Block>
          </ScrollView >
        )}
      </AppConsumer>
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
    backgroundColor: theme.colors.white,
    width: 150,
    borderRadius: 3,
    borderColor: theme.colors.gray,
    borderWidth: 1
  },
  picker: {
    alignContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    height: 40,
    width: 150,
    borderRadius: 3,
    borderColor: theme.colors.gray,
    borderWidth: 1,
    overflow: 'hidden'
  },
  linearGradient: {
    height: theme.sizes.base * 11,
    flex: 1,
  },
})  