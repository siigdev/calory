import React, { Component } from 'react';
import { StyleSheet, Image } from 'react-native';
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
        const { loading } = this.state;
        return (
            <Block animation="zoomIn" duration={400}  padding={[0, theme.sizes.base * 2]}>
                <Block middle>
                    <Block center bottom flex={0.2}>
                        <Image
                            style={{ width: 150, height: 150 }}
                            source={require('../assets/icons/forgot-password.png')}
                        />
                        <Text h2 center bold>Forgot your password?</Text>
                        <Text h4 center gray2>Enter your email for further instructions</Text>
                    </Block>
                    <Block middle flex={0.3} margin={[0, theme.sizes.padding * 2]}>
                        <Input
                            label="Email"
                            style={[styles.input]}
                            defaultValue={this.state.email}
                            onChangeText={text => this.setState({ email: text })}
                        />
                        <Button gradient onPress={() => this.handleForgot()}>
                            {loading ?
                                <ActivityIndicator size="small" color="white" /> :
                                <Text bold white center>Login</Text>
                            }
                        </Button>
                    </Block>
                </Block>
            </Block>
        )
    }
}
const styles = StyleSheet.create({
    input: {
        borderRadius: 0,
        borderWidth: 0,
        borderBottomColor: theme.colors.gray,
        borderBottomWidth: 1
    }
})  