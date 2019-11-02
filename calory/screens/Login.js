import React, { Component } from 'react'
import { Block } from '../components'
import { Text } from 'react-native';

const EMAIL = "test@test.dk"
const PASSWORD = "123"

export default class Login extends Component {
    state = {
        email: EMAIL,
        password: PASSWORD
    }
    loginHandler() {
        const { email, password } = this.state;
        const errors = [];

        if (email !== EMAIL) {
            errors.push('email');
        }
        if (password !== PASSWORD) {
            errors.push('password');
        }
    }
    render() {
        return (
            <Block>
                <Text>Open up App.js to start working on your app1234!</Text>
            </Block>
        )
    }
}