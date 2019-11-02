import React, { Component } from 'react'
import { Button, Block, Text } from '../components';
import { StyleSheet } from 'react-native';
import { theme } from '../constants';

export default class Welcome extends Component {
    render() {
        const { navigation } = this.props;
        return (
            <Block>
                <Block center bottom flex={0.4}>
                    <Text h1 center bold>Keep track of your <Text h1 primary>Calory.</Text></Text>
                    <Text h3 gray2>Estimate required workout</Text>
                </Block>
                <Block middle flex={0.5} margin={[0, theme.sizes.padding * 2]}>
                    <Button gradient onPress={() => navigation.navigate('Login')}>
                        <Text center semibold white>Login</Text>
                    </Button>
                    <Button style={[styles.button]} onPress={() => navigation.navigate('Signup')}>
                        <Text center semibold>Signup</Text>
                    </Button>
                    <Button onPress={() => this.setState({ showTerms: true })}>
                        <Text center caption gray>Terms of service</Text>
                    </Button>
                </Block>
            </Block>
        )
    }
}
const styles = StyleSheet.create({
    button: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: theme.colors.gray
    }
})  