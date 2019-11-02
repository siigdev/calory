import React, { Component } from 'react'
import { ActivityIndicator, Keyboard, KeyboardAvoidingView, StyleSheet } from 'react-native'
import { Block, Text, Input, Button } from '../components'

import { theme } from '../constants';

const EMAIL = "test@test.dk"
const PASSWORD = "123"

export default class Login extends Component {
    state = {
        email: EMAIL,
        password: PASSWORD,
        errors: []
    }
    render() {
        const { navigation } = this.props;
        const { loading, errors } = this.state;
        return (
            <KeyboardAvoidingView style={styles.login} behavior="padding">
                <Block>
                    <Text h1 bold>Login</Text>
                    <Block middle>
                        <Input
                            label="Email"
                            style={[styles.input]}
                            defaultValue={this.state.email}
                            onChangeText={text => this.setState({ email: text })}
                        />
                        <Input
                            label="Password"
                            style={[styles.input]}
                            defaultValue={this.state.password}
                            onChangeText={text => this.setState({ password: text })}
                        />
                        <Button gradient >
                            {loading ?
                                <ActivityIndicator size="small" color="white" /> :
                                <Text bold white center>Login</Text>
                            }
                        </Button>
                    </Block>
                </Block>
            </KeyboardAvoidingView>
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
        borderBottomColor: theme.colors.black,
    },
    hasErrors: {
        borderBottomColor: theme.colors.black,
    }
})  