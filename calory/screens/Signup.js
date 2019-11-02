import React, { Component } from 'react'
import { Alert, ActivityIndicator, Keyboard, KeyboardAvoidingView, StyleSheet } from 'react-native'
import { Block, Text, Input, Button } from '../components'
import { theme } from '../constants';

export default class Signup extends Component {
    state = {
        email: null,
        username: null,
        password: null,
        errors: [],
        loading: false,
    }
    signupHandler() {
        const { navigation } = this.props;
        const { email, username, password } = this.state;
        const errors = [];
        Keyboard.dismiss();

        if (!email) errors.push('email');
        if (!username) errors.push('username');
        if (!password) errors.push('password');

        this.setState({ errors, loading: false });

        if (!errors.length) {
            Alert.alert(
              'Success!',
              'Your account has been created',
              [
                {
                  text: 'Continue', onPress: () => {
                    navigation.navigate('Main')
                  }
                }
              ],
              { cancelable: false }
            )
          }
    }
    render() {
        const { navigation } = this.props;
        const { loading, errors } = this.state;
        return (
            <KeyboardAvoidingView style={styles.login} behavior="padding">
                <Block padding={[0, theme.sizes.base * 2]}>
                    <Text h1 bold>Create user</Text>
                    <Block middle>
                        <Input
                            label="Email"
                            style={[styles.input]}
                            defaultValue={this.state.email}
                            onChangeText={text => this.setState({ email: text })}
                        />
                        <Input
                            label="Username"
                            style={[styles.input]}
                            defaultValue={this.state.username}
                            onChangeText={text => this.setState({ username: text })}
                        />
                        <Input
                            secureTextEntry={true}
                            label="Password"
                            style={[styles.input]}
                            defaultValue={this.state.password}
                            onChangeText={text => this.setState({ password: text })}
                        />
                        <Button gradient onPress={() => this.signupHandler()}>
                            {loading ?
                                <ActivityIndicator size="small" color="white" /> :
                                <Text bold white center>Sign up</Text>
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
        borderBottomColor: theme.colors.gray,
        borderBottomWidth: 1
    },
    hasErrors: {
        borderBottomColor: theme.colors.gray,
    }
})  