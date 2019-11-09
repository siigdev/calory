import React, { Component } from 'react';
import { Text } from '../components'
import { ScrollView } from 'react-native';

export default class Friends extends Component{
    render() {
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text>Here comes Friends</Text>
            </ScrollView>
        )
    }
}