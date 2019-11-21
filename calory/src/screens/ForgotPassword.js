import React, { Component } from 'react';
import { StyleSheet, Image, KeyboardAvoidingView } from 'react-native';
import { theme } from '../constants';
import { Text, Button, Input, Block } from '../components';
import firebase from 'firebase';

export default class ForgotPassword extends Component {
    state = {
        email: '',
    };
    handleForgot() {
        const { email } = this.state;
        firebase.auth().sendPasswordResetEmail(email.replace(/\s/g, '')).then(() => {
            console.warn("SENT")
        }).catch((e) => console.warn(e))
    };



    render() {
        return (
            <KeyboardAvoidingView style={styles.forgot} behavior="padding">
                <Block middle animation="zoomIn" duration={400} padding={[0, theme.sizes.base*2]}>
                        <Text h2 center bold>Forgot your password?</Text>
                        <Text h4 center gray2 style={{paddingBottom: theme.sizes.base*2}}>Enter your email for further instructions</Text>
                    <Input
                        label="Email"
                        style={[styles.input]}
                        defaultValue={this.state.email}
                        onChangeText={text => this.setState({ email: text })}
                    />
                    <Button gradient onPress={() => this.handleForgot()}>
                        <Text bold white center>Login</Text>
                    </Button>
                </Block >
            </KeyboardAvoidingView >
        )
    }
}

const styles = StyleSheet.create({
    forgot: {
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