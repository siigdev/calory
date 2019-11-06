import React, { Component } from 'react';
import { Block, Text, Card, Button, Badge } from '../components';
import { ScrollView, StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { CircularProgress } from 'react-native-circular-progress';
import { AppConsumer } from '../AppContextProvider'

import { theme } from '../constants';
const window = Dimensions.get('window');
export default class Main extends Component {

    renderReward() {
        return (
            <AppConsumer>
            {appConsumer => (
            <LinearGradient
                end={{ x: 1, y: 0 }}
                colors={["#FF988A", appConsumer.theme.colors.accent]}
            >
                <Block middle flex={0.4}>
                    <Badge color={appConsumer.theme.colors.white, '0.2'} size={74}>
                        <Badge color={appConsumer.theme.colors.white, '0.2'} size={52}>
                        </Badge>
                    </Badge>
                </Block>
                <Block middle>
                    <Text size={theme.sizes.base} spacing={0.4} medium white>Wohoo!</Text>
                    <Text size={theme.sizes.base} spacing={0.4} medium white>Safe Driver Trophy!</Text>
                </Block>
            </LinearGradient>
            )}
            </AppConsumer>
        )
    }
    renderTopHeader() {
        return (
            <AppConsumer>
            {appConsumer => (
            <View style={styles.container} >
                <View style={styles.background} >
                    <LinearGradient colors={[appConsumer.theme.colors.primary, appConsumer.theme.colors.secondary]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.linearGradient}>
                        <View style={styles.slider}>
                            <Block center>
                                <CircularProgress
                                    size={150}
                                    fill={60}
                                    lineCap="round"
                                    rotation={0}
                                    arcSweepAngle={360}
                                    width={theme.sizes.base / 4}
                                    tintColor={appConsumer.theme.colors.white}
                                    backgroundColor={appConsumer.theme.colors.secondary}
                                    backgroundWidth={theme.sizes.base / 8}
                                >{() => (
                                    <Block center middle>
                                        <Text white h3 small>322</Text>
                                        <Text white h4 caption transform="uppercase">CALORIES LEFT</Text>
                                    </Block>
                                )}
                                </CircularProgress>
                            </Block>
                        </View>
                    </LinearGradient>
                </View>
            </View>
                            )}
                            </AppConsumer>
        )

    }

    render() {
        const { navigation } = this.props;
        return (
            <AppConsumer>
                {appConsumer => (
            <ScrollView >
                {this.renderTopHeader()}
                {this.renderReward()}
                <Block padding={[0, theme.sizes.base * 2]}>
                    <Card shadow >
                        <Block center>
                            <Block row>
                                <Block center flex={0.8}>
                                    <Text size={20} spacing={1} primary>79</Text>
                                    <Text spacing={0.7}>Trips</Text>
                                </Block>

                                <Block center flex={2}>
                                    <Text size={20} spacing={1} primary>123</Text>
                                    <Text spacing={0.7}>Hours</Text>
                                </Block>

                                <Block center flex={0.8}>
                                    <Text size={20} spacing={1} primary>2.786</Text>
                                    <Text spacing={0.7}>Miles</Text>
                                </Block>
                            </Block>
                        </Block>
                    </Card>
                    <Card shadow >
                        <Block center>
                            <Block row>
                                <Block center flex={0.8}>
                                    <Text size={20} spacing={1} primary>79</Text>
                                    <Text spacing={0.7}>Trips</Text>
                                </Block>

                                <Block center flex={2}>
                                    <Text size={20} spacing={1} primary>123</Text>
                                    <Text spacing={0.7}>Hours</Text>
                                </Block>

                                <Block center flex={0.8}>
                                    <Text size={20} spacing={1} primary>2.786</Text>
                                    <Text spacing={0.7}>Miles</Text>
                                </Block>
                            </Block>
                        </Block>
                    </Card>
                    <Button title="Settings" onPress={() => navigation.navigate('Settings')}>
                        <Text bold black center>Settings</Text>
                    </Button>
                </Block>
            </ScrollView>
                )}
                </AppConsumer>
        )
    }
}
const styles = StyleSheet.create({
    trip: {
        backgroundColor: theme.colors.gray3,
        padding: theme.sizes.padding
    }, container: {
        alignSelf: 'center',
        width: window.width,
        height: window.width * 2,
        overflow: 'hidden',
        height: window.width / 1.5,
        marginBottom: 20
    },
    background: {
        borderRadius: window.width,
        width: window.width * 2,
        height: window.width * 2,
        marginLeft: -(window.width / 2),
        position: 'absolute',
        bottom: 0,
        overflow: 'hidden'
    },
    slider: {
        height: window.width / 1.5,
        width: window.width,
        paddingTop: 20,
        position: 'absolute',
        bottom: 0,
        marginLeft: window.width / 2,
    },
    linearGradient: {
        flex: 1,
    },
});