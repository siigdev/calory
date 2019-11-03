import React, { Component } from 'react'
import { Alert, ActivityIndicator, Keyboard, KeyboardAvoidingView, StyleSheet } from 'react-native'
import { Block, Text, Input, Button } from '../components'
import { theme } from '../constants';

export default class Signup extends Component {
    state = {
        email: null,
        username: null,
        password: null,
        errors: {},
        namevalidate: true,
        loading: false,
    }
    signupHandler() {
        const { navigation } = this.props;
        const { email, username, password } = this.state;
        const errors = {};
        Keyboard.dismiss();

        if (!email) {
            errors["email"] = "Cannot be empty"
        }
        if (!username) {
            errors["username"] = "Cannot be empty"
        }
        if (!password) {
            errors["password"] = "Cannot be empty"
        }

        this.setState({ errors, loading: false });

        // if (!errors.length) {
        //     Alert.alert(
        //       'Success!',
        //       'Your account has been created',
        //       [
        //         {
        //           text: 'Continue', onPress: () => {
        //             navigation.navigate('Main')
        //           }
        //         }
        //       ],
        //       { cancelable: false }
        //     )
        //   }
    }
    render() {
        const { loading } = this.state;
        return (
            <KeyboardAvoidingView style={styles.login} behavior="padding">
                <Block padding={[0, theme.sizes.base * 2]}>
                    <Block middle>
                        <Input
                            label={"Email "}
                            style={[styles.input]}
                            defaultValue={this.state.email}
                            onChangeText={(text) => this.setState({ email: text })}
                        />
                        <Text small style={{color: "red"}}>{this.state.errors["email"]}</Text>
                        <Input
                            label={"Username "}
                            style={[styles.input]}
                            defaultValue={this.state.username}
                            onChangeText={text => this.setState({ username: text })}
                        />
                        <Text small style={{color: "red"}}>{this.state.errors["username"]}</Text>
                        <Input
                            secureTextEntry={true}
                            label={"Password "}
                            style={[styles.input]}
                            defaultValue={this.state.password}
                            onChangeText={text => this.setState({ password: text })}
                        />
                        <Text small style={{color: "red"}}>{this.state.errors["password"]}</Text>
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