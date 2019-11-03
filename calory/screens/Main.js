import React, { Component } from 'react';
import { Block, Text, Card, Button } from '../components';
import { AsyncStorage, ScrollView, StyleSheet } from 'react-native'
import { CircularProgress } from 'react-native-circular-progress';

import { theme } from '../constants';

export default class Main extends Component {
    _signOutAsync = async () => {
        const { navigation } = this.props;
        await AsyncStorage.clear();
        navigation.navigate('Welcome');
      };
    render() {
        return (
            <ScrollView style={styles.trip} showsVerticalScrollIndicator={false}>
            <Card shadow style={{ paddingVertical: theme.sizes.base * 2 }}>
                <Block center>
                    <CircularProgress
                        size={214} 
                        fill={60}
                        lineCap="round" 
                        rotation={220}
                        arcSweepAngle={280}
                        width={theme.sizes.base}
                        tintColor={theme.colors.primary}
                        backgroundColor={theme.colors.gray2}
                        backgroundWidth={theme.sizes.base / 2}
                    >
                        {() => (
                            <Block center middle>
                                <Text h2 medium>60 %</Text>
                                <Text h3 transform="uppercase">good</Text>
                            </Block>
                        )}
                    </CircularProgress>
                </Block>
            </Card>
            <Button title="Actually, sign me out :)" onPress={this._signOutAsync} />
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    trip: {
        backgroundColor: theme.colors.gray3,
        padding: theme.sizes.padding
    }
})