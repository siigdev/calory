import React, { Component } from 'react';
import { Block, Text, Card, Button } from '../components';
import { AsyncStorage, ScrollView, StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { CircularProgress } from 'react-native-circular-progress';

import { theme } from '../constants';
const window = Dimensions.get('window');
export default class Main extends Component {
    _signOutAsync = async () => {
        const { navigation } = this.props;
        await AsyncStorage.clear();
        navigation.navigate('Welcome');
    };
    render() {
        return (
            <ScrollView>
                <View style={styles.container} >
                
                    <View style={styles.background} >
                    <LinearGradient colors={[theme.colors.primary, theme.colors.secondary]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.linearGradient}>
                        <View style={styles.slider}>
                        </View>
                        </LinearGradient>
                    </View>
                    
                </View>
                <Card shadow style={{ paddingVertical: theme.sizes.base * 2 }}>
                    <Block center>
                        <CircularProgress
                            size={214}
                            fill={60}
                            lineCap="round"
                            rotation={220}
                            arcSweepAngle={280}
                            width={theme.sizes.base}
                            tintColor={theme.colors.primary}
                            backgroundColor={theme.colors.gray2}
                            backgroundWidth={theme.sizes.base / 2}
                        >
                            {() => (
                                <Block center middle>
                                    <Text h2 medium>60 %</Text>
                                    <Text h3 transform="uppercase">good</Text>
                                </Block>
                            )}
                        </CircularProgress>
                    </Block>
                </Card>
                <Button title="Actually, sign me out :)" onPress={this._signOutAsync} />
            </ScrollView>
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
        height: window.width*2,
        overflow: 'hidden',
        height: window.width / 1.7
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
        height: window.width / 1.7,
        width: window.width,
        position: 'absolute',
        bottom: 0,
        marginLeft: window.width / 2,
    },
    linearGradient: {
        flex: 1,
      },
});