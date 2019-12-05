import React, { Component } from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack';
import Login from '../screens/Login';
import Welcome from '../screens/Welcome';
import Signup from '../screens/Signup';
import Main from '../screens/Main';
import Barcode from '../screens/Barcode';
import Statistics from '../screens/Statistics';
import Friends from '../screens/Friends';
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
const statisticsScreen = createStackNavigator({
    Statistics: {
        screen: Statistics,
        navigationOptions: {
            headerTitle:
                <Text h1 bold>Statistics</Text>,
            headerStyle: {
                marginLeft: theme.sizes.base * 2,
                backgroundColor: "Transparent",
                shadowColor: "Transparent",
                elevation: 0,
                shadowRadius: 0,
                borderBottomColor: "Transparent",
            }
        },
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
const friendsScreen = createStackNavigator({
    Friends: {
        screen: Friends,
        navigationOptions: {
            headerTitle:
                <Text h1 bold>Friends</Text>,
            headerStyle: {
                marginLeft: theme.sizes.base * 2,
                backgroundColor: theme.colors.white,
                shadowColor: "Transparent",
                elevation: 0,
                shadowRadius: 0,
                borderBottomColor: "transparent",
            }
        },
    },
})
const productScreen = createStackNavigator({
    ProductPage: {
        visible: false,
        screen: ProductPage,
        navigationOptions: {
            visible: false,
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
                marginLeft: theme.sizes.base * 2,
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
            tabBarIcon: <Ionicons name={'md-home'} size={25} />,
            title: 'Main',
        },
    },
    statisticsScreen: {
        screen: statisticsScreen,
        navigationOptions: {
            tabBarIcon: <Ionicons name={'md-trophy'} size={25} />,
            title: 'Statistics',
        },
    },
    barcodeScreen: {
        screen: barcodeScreen,
        navigationOptions: {
            tabBarIcon: <Ionicons name={'md-add-circle'} size={65} />,
            title: '',
        },
    },
    friendsScreen: {
        screen: friendsScreen,
        navigationOptions: {
            tabBarIcon: <Ionicons name={'md-people'} size={25} />,
            title: 'Friends',
        },
    },
    settingsScreen: {
        screen: settingsScreen, 
        navigationOptions: {
            tabBarIcon: <Ionicons name={'md-settings'} size={25} />,
            title: 'Settings',
        },
    },
}, {
    tabBarOptions: {
        activeTintColor: theme.colors.primary,
        activeBackgroundColor: theme.colors.gray4,
        inactiveBackgroundColor: theme.colors.gray4,
    }
})

export default createAppContainer(createSwitchNavigator(
    {
        AuthLoading: authLoadingScreen,
        App: screens, productScreen,
        Auth: authScreens,
    },
    {
        initialRouteName: 'AuthLoading',
    })
);