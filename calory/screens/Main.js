import React, { Component } from 'react';
import { Block, Text, Card } from '../components';
import { ScrollView, StyleSheet } from 'react-native'
import { CircularProgress } from 'react-native-circular-progress';

import { theme } from '../constants';

export default class Main extends Component {
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