import React, { Component } from 'react'
import { Button, Block, Text } from '../components';
import { Animated, Dimensions, Image, FlatList, Modal, StyleSheet, ScrollView } from 'react-native';
import { theme } from '../constants';

const { width, height } = Dimensions.get('window');

class Welcome extends Component {

    render() {
        const { navigation } = this.props;
        return (
            <Block>
                <Block center bottom flex={0.4}>
                    <Text h1 center bold>Your home. <Text h1 primary>Greener.</Text></Text>
                    <Text h3 gray2>Enjoy the experience</Text>
                </Block>
                <Block middle flex={0.5} margin={[0, theme.sizes.padding * 2]}>
                    <Button gradient onPress={() => navigation.navigate('Login')}>
                        <Text center semibold white>Login</Text>
                    </Button>
                    <Button shadow onPress={() => navigation.navigate('SignUp')}>
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

export default Welcome;