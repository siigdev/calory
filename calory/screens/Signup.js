import React, { Component } from 'react'
import { AsyncStorage, ActivityIndicator, Keyboard, KeyboardAvoidingView, StyleSheet } from 'react-native'
import { Block, Text, Input, Button } from '../components'
import { theme } from '../constants';
import firebase from 'firebase';

export default class Signup extends Component {
    state = {
        email: null,
        password: null,
        namevalidate: true,
        loading: false,
    }
    _signInAsync = async () => {
        const { navigation } = this.props;
        await AsyncStorage.setItem('userToken', 'abc');
        navigation.navigate("App");
    };

    signupHandler() {
        const { email, password } = this.state;
        Keyboard.dismiss();
        try {
            firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
                this._signInAsync()
            });
        } catch (error) {
            console.log(error.toString())
        }
    }
    render() {
        const { loading } = this.state;
        return (
            <KeyboardAvoidingView style={styles.login} behavior="padding">
                <Block animation="zoomIn" duration={400} padding={[0, theme.sizes.base * 2]}>
                    <Block middle>
                        <Input
                            label={"Email "}
                            style={[styles.input]}
                            defaultValue={this.state.email}
                            onChangeText={(text) => this.setState({ email: text })}
                        />
                        <Input
                            secureTextEntry={true}
                            label={"Password "}
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
    }
})  