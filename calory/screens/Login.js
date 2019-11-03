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
    loginHandler() {
        const { navigation } = this.props;
        const { email, password } = this.state;
        const errors = [];
        Keyboard.dismiss();

        if (email !== EMAIL) {
            errors.push('email')
        }
        if (password !== PASSWORD) {
            errors.push('password')
        }
        if (!errors.length) {
            navigation.navigate("Main")
        }
    }
    render() {
        const { navigation } = this.props;
        const { loading, errors } = this.state;
        return (
            <KeyboardAvoidingView style={styles.login} behavior="padding">
                <Block padding={[0, theme.sizes.base * 2]}>
                    <Block middle>
                        <Input
                            label="Email"
                            style={[styles.input]}
                            defaultValue={this.state.email}
                            onChangeText={text => this.setState({ email: text })}
                        />
                        <Input
                            secureTextEntry={true}
                            label="Password"
                            style={[styles.input]}
                            defaultValue={this.state.password}
                            onChangeText={text => this.setState({ password: text })}
                        />
                        <Button gradient onPress={() => this.loginHandler()}>
                            {loading ?
                                <ActivityIndicator size="small" color="white" /> :
                                <Text bold white center>Login</Text>
                            }
                        </Button>
                        <Button onPress={() => navigation.navigate('Settings')}>
                            <Text gray caption center>
                                Forgot your password?
              </Text>
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
        borderBottomColor: theme.colors.gray,
        borderBottomWidth: 1
    },
    hasErrors: {
        borderBottomColor: theme.colors.black,
    }
})  