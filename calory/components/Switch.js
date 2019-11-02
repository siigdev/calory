import React, { Component } from 'react'
import { Switch } from 'react-native'
import { theme } from '../constants';

export default class SwitchInput extends Component {
    render() {
        return (
            <Switch
            thumbColor={thumbColor}
            ios_backgroundColor={theme.colors.gray}
            trackColor={theme.colors.gray2}
            value={value}
            {...props}/>
        )
    }
}