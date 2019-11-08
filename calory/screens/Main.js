import React, { Component } from 'react';
import { Block, Text, Card, Button } from '../components';
import { ScrollView, StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { CircularProgress } from 'react-native-circular-progress';
import { AppConsumer } from '../AppContextProvider'
import firebase from 'firebase';
import { Ionicons } from '@expo/vector-icons'

import { theme } from '../constants';
const window = Dimensions.get('window');
export default class Main extends Component {

    componentWillMount() {
        const { navigation } = this.props;
        if (!firebase.auth().currentUser) {
            navigation.navigate('Welcome')
        }
    }

    renderReward() {
        return (
            <AppConsumer>
                {appConsumer => (
                    <LinearGradient
                        end={{ x: 1, y: 0 }}
                        colors={["#FF988A", appConsumer.theme.colors.accent]}
                        style={{
                            borderRadius: 5,
                            padding: theme.sizes.base + 4,
                            marginBottom: theme.sizes.base,
                            flexDirection: 'row',
                        }}>
                        <Block middle flex={0.25}>
                            <Ionicons name="md-trophy" size={45} color="white" />
                        </Block>
                        <Block middle>
                            <Text spacing={0.4} h4 small bold white>Nice!</Text>
                            <Text spacing={0.4} h4 small white>You burned all your calories today!</Text>
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
                                    <Block row>
                                        <Block center>
                                            <Text white h3 small>322</Text>
                                            <Text white h4 caption transform="uppercase">Eaten</Text>
                                        </Block>
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
                                        <Block center>
                                            <Text white h3 small>322</Text>
                                            <Text white h4 caption transform="uppercase">Burned</Text>
                                        </Block>
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
                    <ScrollView style={{ backgroundColor: '#F9F9FB' }}>
                        {this.renderTopHeader()}
                        <Block padding={[0, theme.sizes.base]}>
                            {this.renderReward()}
                            <Block style={{ marginBottom: theme.sizes.base }}>
                                <Text spacing={0.4} transform="uppercase">
                                    Recent activity
                                </Text>
                            </Block>
                            <Card >
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
                            <Card >
                                <Button onPress={() => navigation.navigate('Barcode')}>
                                    <Text gray caption center>
                                        Scan something!
                            </Text>
                                </Button>
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
        marginBottom: 20,
    },
    background: {
        borderRadius: window.width,
        width: window.width * 2,
        height: window.width * 2,
        marginLeft: -(window.width / 2),
        position: 'absolute',
        bottom: 0,
        overflow: 'hidden',
        marginBottom: 10,
        shadowColor: theme.colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 13,
        elevation: 5,
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