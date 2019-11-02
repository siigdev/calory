


import React, { Component } from 'react'
import { ActivityIndicator, ScrollView, StyleSheet } from 'react-native'
import { Block, Text, Input, Button, Switch } from '../components'
import Slider from 'react-native-slider'

import { theme } from '../constants';

export default class Settings extends Component {
    state = {
        username: "RANDOM",
        weight: 75,
        height: 180,
        newsletter: true,
        errors: []
    }
    render() {
        const { navigation } = this.props;
        const { loading, errors } = this.state;
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                <Block padding={[0, theme.sizes.base * 2]}>
                    <Text h1 bold>Login</Text>
                    <Block middle>
                        <Input
                            label="Email"
                            style={[styles.input]}
                            defaultValue={this.state.username}
                            onChangeText={text => this.setState({ weight: text })}
                        />
                        <Text gray2 style={{ marginBottom: 10 }}>Weight</Text>
                        <Slider
                            minimumValue={50}
                            maximumValue={150}
                            step={1}
                            style={{ height: 19 }}
                            thumbStyle={styles.thumb}
                            trackStyle={{ height: 6, borderRadius: 6 }}
                            minimumTrackTintColor={theme.colors.secondary}
                            maximumTrackTintColor="rgba(157, 163, 180, 0.10)"
                            value={this.state.weight}
                            onValueChange={value => this.setState({ weight: value })}
                        />
                        <Text caption gray right>{this.state.weight}kg</Text>
                        <Text gray2 style={{ marginBottom: 10 }}>Height</Text>
                        <Slider
                            minimumValue={100}
                            maximumValue={220}
                            step={1}
                            style={{ height: 19 }}
                            thumbStyle={styles.thumb}
                            trackStyle={{ height: 6, borderRadius: 6 }}
                            minimumTrackTintColor={theme.colors.secondary}
                            maximumTrackTintColor="rgba(157, 163, 180, 0.10)"
                            value={this.state.height}
                            onValueChange={value => this.setState({ height: value })}
                        />
                        <Text caption gray right>{this.state.height}cm</Text>
                        <Button gradient onPress={() => this.loginHandler()}>
                            {loading ?
                                <ActivityIndicator size="small" color="white" /> :
                                <Text bold white center>Login</Text>
                            }
                        </Button>
                        <Block row center space="between" style={{ marginBottom: theme.sizes.base * 2 }}>
                            <Text gray2>Newsletter</Text>
                            <Switch
                                value={this.state.newsletter}
                                onValueChange={value => this.setState({ newsletter: value })}
                            />
                        </Block>
                    </Block>
                </Block>
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    login: {
        flex: 1,
        justifyContent: 'center',
    },
    input: {
        borderRadius: 0,
        borderWidth: 0,
        borderBottomColor: theme.colors.gray,
        borderBottomWidth: 1
    },
    hasErrors: {
        borderBottomColor: theme.colors.black,
    },
    header: {
        paddingHorizontal: theme.sizes.base * 2,
    },
    avatar: {
        height: theme.sizes.base * 2.2,
        width: theme.sizes.base * 2.2,
    },
    inputs: {
        marginTop: theme.sizes.base * 0.7,
        paddingHorizontal: theme.sizes.base * 2,
    },
    inputRow: {
        alignItems: 'flex-end'
    },
    sliders: {
        marginTop: theme.sizes.base * 0.7,
        paddingHorizontal: theme.sizes.base * 2,
    },
    thumb: {
        width: theme.sizes.base,
        height: theme.sizes.base,
        borderRadius: theme.sizes.base,
        borderColor: 'white',
        borderWidth: 3,
        backgroundColor: theme.colors.secondary,
    },
    toggles: {
        paddingHorizontal: theme.sizes.base * 2,
    }
})  