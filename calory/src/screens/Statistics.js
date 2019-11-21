import React, { Component } from 'react';
import { Text, Block, Divider, Card } from '../components';
import { StyleSheet, FlatList, ScrollView, TouchableOpacity, Image } from 'react-native';
import firebase from 'firebase';
import { theme } from '../constants';


const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];



export default class Statistics extends Component {
  state = {
    calories: 50,
    isLoading: false
  }
  componentDidMount() {
    this.setState({ isLoading: true });
    const currUser = firebase.auth().currentUser.uid;
    firebase.database().ref('calories/' + currUser).on('value', (snapshot) => {
      var list = [];
      snapshot.forEach(function (elem) {
        list.push(elem.val());
      });
      let totalvalue = 0;
      for (i = 0; i < list.length; i++) {
        totalvalue = totalvalue + list[i].amount;
      }
      this.setState({
        calories: totalvalue
      })
      this.setState({ isLoading: false });
    });
  }
  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: theme.colors.gray4 }}>
        <Block padding={[0, theme.sizes.base]}>
          <Block style={{ marginBottom: theme.sizes.base / 2 }}>
            <Text spacing={0.4} transform="uppercase" style={{ marginTop: theme.sizes.base }}>Achievements</Text>
          </Block>
          <FlatList
            horizontal
            pagingEnabled
            scrollEnabled
            showsHorizontalScrollIndicator={false}
            decelerationRate={0}
            scrollEventThrottle={16}
            style={{ overflow: 'visible' }}
            data={DATA}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => onSelect(id)}
                style={[styles.item, { backgroundColor: theme.colors.white }]}
              >
                <Card style={{ paddingBottom: 0 }}>
                  <Text>{item.title}</Text>
                  <Image
                    style={{ width: 100, height: 100 }}
                    source={require('../assets/images/Achievements/burger.png')}
                  />
                </Card>
              </TouchableOpacity>
            )}
          />
          <Block style={{ marginBottom: theme.sizes.base / 2 }}>
            <Text spacing={0.4} transform="uppercase">Numerical Data</Text>
          </Block>
          <Card>
            <Block row space="between" style={styles.inputRow}>
              <Block>
                <Text h4 >Total calories eaten</Text>
              </Block>
              <Text h4 medium primary >{this.state.calories}</Text>
            </Block>
            <Divider />
            <Block row space="between" style={styles.inputRow}>
              <Block>
                <Text h4 >Total calories burned</Text>
              </Block>
              <Text h4 medium primary >92313</Text>
            </Block>
            <Divider />
            <Block row space="between" style={styles.inputRow}>
              <Block>
                <Text h4 >Number of days at target</Text>
              </Block>
              <Text h4 medium primary >217</Text>
            </Block>
            <Divider />
            <Block row space="between" style={styles.inputRow}>
              <Block>
                <Text h4 >Achivements</Text>
              </Block>
              <Text h4 medium primary >74</Text>
            </Block>
            <Divider />
          </Card>
          <Block style={{ marginBottom: theme.sizes.base / 2 }}>
            <Text spacing={0.4} transform="uppercase">Exercises</Text>
          </Block>
          <Card>
            <Block row space="between" style={styles.inputRow}>
              <Block>
                <Text h4 >Maximum time exercized</Text>
              </Block>
              <Text h4 medium primary >4.5 Hours</Text>
            </Block>
            <Divider />
            <Block row space="between" style={styles.inputRow}>
              <Block>
                <Text h4 >Total distance</Text>
              </Block>
              <Text h4 medium primary >720 KM</Text>
            </Block>
            <Divider />
            <Block row space="between" style={styles.inputRow}>
              <Block>
                <Text h4 >Steps taken</Text>
              </Block>
              <Text h4 medium primary >21754</Text>
            </Block>
            <Divider />
          </Card>
        </Block>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  item: {
    marginHorizontal: theme.sizes.base/2,
    marginBottom: theme.sizes.base,
  }
})  