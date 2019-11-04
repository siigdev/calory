import React, { Component } from 'react'
import { AsyncStorage, ActivityIndicator, Keyboard, KeyboardAvoidingView, StyleSheet } from 'react-native'
import { Block, Text, Input, Button } from '../components'
import firebase from 'firebase';

import { theme } from '../constants';


export default class Login extends Component {
    state = {
        email: '',
        password: '',
        isLoading: false
    }
    _signInAsync = async () => {
        const { navigation } = this.props;
        await AsyncStorage.setItem('userToken', 'abc');
        navigation.navigate("App");
    };
    loginHandler() {
        const { email, password } = this.state;
        Keyboard.dismiss();
        this.setState({ isLoading: true });
        try {
            firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
                this._signInAsync();
            })
                .catch(error => {
                    this.setState({ isLoading: false });
                    switch (error.code) {
                        case 'auth/invalid-email':
                            console.warn('Invalid mail')
                            break;
                    }
                });
        } catch (error) {
            this.setState({ isLoading: false });
            console.warn("Error")
        }
    }
    render() {
        const { navigation } = this.props;
        const { isLoading } = this.state;
        return (
            <KeyboardAvoidingView style={styles.login} behavior="padding">
                <Block animation="zoomIn" duration={400} padding={[0, theme.sizes.base * 2]}>

                    {isLoading ?
                        <Block middle><ActivityIndicator size={100} color={theme.colors.primary} /></Block> :
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
                                <Text bold white center>Login</Text>
                            </Button>
                            <Button onPress={() => navigation.navigate('Barcode')}>
                                <Text gray caption center>
                                    Forgot your password?
                            </Text>
                            </Button>

                        </Block>
                    }
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
    }
})  