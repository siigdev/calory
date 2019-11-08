import React, { Component } from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack';
import Login from '../screens/Login';
import Welcome from '../screens/Welcome';
import Signup from '../screens/Signup';
import Main from '../screens/Main';
import Barcode from '../screens/Barcode';
import ProductPage from '../screens/ProductPage';
import Settings from '../screens/Settings';
import ForgotPassword from '../screens/ForgotPassword';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import { theme } from '../constants';
import { Text } from '../components';
import { Ionicons } from '@expo/vector-icons';

import { fromLeft } from 'react-navigation-transitions';

const authLoadingScreen = createStackNavigator({
    AuthLoadingScreen: {
        screen: AuthLoadingScreen
    }
});
const authScreens = createStackNavigator({
    Welcome: {
        screen: Welcome,
    },
    Login: {
        screen: Login,
        navigationOptions: {
            headerTitle: <Text h1 bold>Login</Text>,
        },
    },
    Signup: {
        screen: Signup,
        navigationOptions: {
            headerTitle: <Text h1 bold>Sign Up</Text>,
        },
    },
    ForgotPassword: {
        screen: ForgotPassword,
        navigationOptions: {
            headerTitle: <Text h1 bold>Forgot Password</Text>,
        }
    }
}, {
    transitionConfig: () => fromLeft(500),
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: "Transparent",
            shadowColor: "Transparent",
            elevation: 0,
            shadowRadius: 0,
            borderBottomColor: "transparent",
        }
    }
})
const mainScreen = createStackNavigator({
    Main: {
        screen: Main,
        navigationOptions: {
            headerStyle: {
                height: 0
            }
        }
    },
})
const barcodeScreen = createStackNavigator({
    Barcode: {
        screen: Barcode,
        navigationOptions: {
            headerStyle: {
                height: 0
            }
        },
    },
})
const productScreen = createStackNavigator({
    ProductPage: {
        screen: ProductPage,
        navigationOptions: {
            headerStyle: {
                height: 0
            }
        },
    },
})
const settingsScreen = createStackNavigator({
    Settings: {
        screen: Settings,
        navigationOptions: {
            headerTitle:
                <Text h1 bold>Settings</Text>,
            headerStyle: {
                marginLeft: 10,
                backgroundColor: theme.colors.white,
                shadowColor: "Transparent",
                elevation: 0,
                shadowRadius: 0,
                borderBottomColor: "transparent",
            }
        },
    }
})

const screens = createBottomTabNavigator({
    mainScreen: {
        screen: mainScreen,
        navigationOptions: {
            tabBarIcon: <Ionicons name={'md-home'} size={25}/>,
        },
    },
    barcodeScreen: {
        screen: settingsScreen,
        navigationOptions: {
            tabBarIcon: <Ionicons name={'md-add-circle'} size={45}/>,
            },
        },
    productScreen,
    settingsScreen: {
        screen: settingsScreen,
        navigationOptions: {
            tabBarIcon: <Ionicons name={'md-settings'} size={25}/>,
            },
        },
    }, {
    tabBarOptions: {
        padding: 0,
        margin: 0
    }
})

export default createAppContainer(createSwitchNavigator(
    {
        AuthLoading: authLoadingScreen,
        App: screens,
        Auth: authScreens,
    },
    {
        initialRouteName: 'AuthLoading',
    })
);