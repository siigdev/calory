import React, { Component } from 'react'
import { Switch } from 'react-native'
import { theme } from '../constants';
import { AppConsumer } from '../AppContextProvider'

export default class SwitchInput extends Component {
    render() {
        const { value, ...props } = this.props;
        let thumbColor = null;
        return (
            <AppConsumer>
        {appConsumer => (
            <Switch
            thumbColor={thumbColor}
            ios_backgroundColor={appConsumer.theme.colors.gray}
            trackColor={{true: appConsumer.theme.colors.primary}}
            value={value}
            {...props}/>
            )}
            </AppConsumer>
        )
    }
}