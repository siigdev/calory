import React, { Component } from 'react';
import { Text, Block } from '../components';
import { StyleSheet, FlatList, ScrollView, TouchableOpacity, Image } from 'react-native';

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
  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <Block padding={[0, theme.sizes.base * 2]}>
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
                style={[styles.item, { backgroundColor: '#6e3b6e' }]}
              >
                <Text>{item.title}</Text>
                <Image
                  style={{ width: 100, height: 100 }}
                  source={require('../assets/images/Achievements/burger.png')}
                />
              </TouchableOpacity>
            )}
          />
          <Text>Testing123</Text>
        </Block>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  }
})  