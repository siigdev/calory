import React, { Component } from 'react';
import { Text, Block, Card, Button } from '../components'
import { ScrollView } from 'react-native';
import { theme } from '../constants';

export default class Friends extends Component {
    render() {
        return (
            <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: theme.colors.gray4 }}>
                <Block padding={[0, theme.sizes.base]}>
                <Button gradient onPress={() => this.addToHistory()}>
              <Text bold white center>Add new friend</Text>
            </Button>
            <Block style={{ marginBottom: theme.sizes.base / 2 }}>
            <Text spacing={0.4} transform="uppercase">Recent friend activity</Text>
          </Block>
                    <Card><Text>You friend did this :) </Text></Card>
                    <Card><Text>You friend did this :) </Text></Card>
                    <Card><Text>You friend did this :) </Text></Card>
                </Block>
            </ScrollView>
        )
    }
}