import React, { Component } from 'react';
import { Block, Text, Card, Button } from '../components';
import { ScrollView, StyleSheet, View, ActivityIndicator, Dimensions, Image } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { AppConsumer } from '../AppContextProvider'
import firebase from 'firebase';
import { Ionicons } from '@expo/vector-icons';

import { theme } from '../constants';
const window = Dimensions.get('window');
export default class Main extends Component {
    state = {
        calories: 50,
        isLoading: false,
        itemsEaten: []
    }

    componentDidMount() {
        const { navigation } = this.props;
        this.setState({ isLoading: true });
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                const currUser = firebase.auth().currentUser.uid;
                firebase.database().ref('calories/' + currUser).on('value', (snapshot) => {
                    var itemsEaten = [];
                    snapshot.forEach(function (elem) {
                        itemsEaten.push(elem.val());
                    });
                    this.setState({ itemsEaten: itemsEaten })
                    let totalvalue = 0;
                    for (i = 0; i < itemsEaten.length; i++) {
                        totalvalue = totalvalue + itemsEaten[i].amount;
                    }
                    this.setState({
                        calories: totalvalue
                    })
                    this.setState({ isLoading: false });
                });
            } else {
                navigation.navigate('Welcome')
            }
        }.bind(this));

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
                    <View style={styles.container}>
                        <View style={styles.background} >
                            <LinearGradient colors={[appConsumer.theme.colors.primary, appConsumer.theme.colors.secondary]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.linearGradient}>
                                <View style={styles.slider}>
                                    <Block row style={{
                                        flex: 1,
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <Block center>
                                            <Text white h3 small>{this.state.calories}</Text>
                                            <Text white h4 caption transform="uppercase">Eaten</Text>
                                        </Block>
                                        <Block center>
                                            <AnimatedCircularProgress
                                                size={150}
                                                fill={60}
                                                lineCap="round"
                                                duration={1500}
                                                rotation={0}
                                                arcSweepAngle={360}
                                                width={theme.sizes.base / 4}
                                                tintColor={appConsumer.theme.colors.white}
                                                backgroundColor={appConsumer.theme.colors.secondary}
                                                backgroundWidth={theme.sizes.base / 8}
                                            >{() => (
                                                <Block center middle>
                                                    <Text white h3 small>{this.state.calories}</Text>
                                                    <Text white h4 caption transform="uppercase">CALORIES LEFT</Text>
                                                </Block>
                                            )}
                                            </AnimatedCircularProgress>
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
    // Remember to change the index to some other unique ID prop
    renderCard() {
        let randomImages = [require('../assets/images/Achievements/burger.png'),
        require('../assets/images/Achievements/chicken.png'),
        require('../assets/images/Achievements/milkshake.png'),
        require('../assets/images/Achievements/pizza.png'),
        require('../assets/images/Achievements/potato.png'),
        require('../assets/images/Achievements/taco.png'),
        require('../assets/images/Achievements/hotdog.png'),
        ]
        return this.state.itemsEaten.slice(0).reverse().map((data, index) => {
            var randomImage = randomImages[Math.floor(Math.random() * randomImages.length)]
            return (
                <Card style={{ padding: theme.sizes.base/2 }} key={index}>
                    <Block row>
                        <Block flex={0.3}>
                            <Image source={randomImage} style={styles.cardImage}></Image>
                        </Block>

                        <Block flex={1} style={{ padding: theme.sizes.base }}>
                            <Text size={18} spacing={1} primary>Munchies!</Text>
                            <Text spacing={0.7}>You have eaten {data.amount} calories</Text>
                            <Text h4 caption gray spacing={0.7}>{new Date(data.date).toLocaleTimeString()}</Text>
                        </Block>
                    </Block>
                </Card>
            )
        })
    }
    render() {
        const { isLoading } = this.state;
        return (
            <AppConsumer>
                {appConsumer => (
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                    }}>
                        {isLoading ?
                            <ActivityIndicator size={100} color={appConsumer.theme.colors.primary} /> :
                            <ScrollView style={{ backgroundColor: appConsumer.theme.colors.gray4 }}>

                                <Block>
                                    {this.renderTopHeader()}
                                </Block>
                                <Block padding={[0, theme.sizes.base]}>
                                    {this.renderReward()}
                                    <Block style={{ marginBottom: theme.sizes.base }}>
                                        <Text spacing={0.4} transform="uppercase">
                                            Recent activity
                                </Text>
                                    </Block>
                                    {this.renderCard()}
                                </Block>

                            </ScrollView>
                        }
                    </View>
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
        height: window.width * 1.5,
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
    cardImage: {
        height: 75,
        width: 75,
    },
    slider: {
        height: window.width / 1.5,
        width: window.width,
        position: 'absolute',
        bottom: 0,
        marginLeft: window.width / 2,

    },
    linearGradient: {
        flex: 1,
    },
});