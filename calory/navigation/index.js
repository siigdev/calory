import React, { Component } from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Login from '../screens/Login';
import Welcome from '../screens/Welcome';
import Signup from '../screens/Signup';
import Main from '../screens/Main';
import Barcode from '../screens/Barcode';
import Settings from '../screens/Settings';
import ForgotPassword from '../screens/ForgotPassword';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import { theme } from '../constants';
import { Text } from '../components';

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
},{

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

const screens = createStackNavigator({
    Main: {
        screen: Main,
        navigationOptions: {
            headerLeft: null,
        }
    },
    Barcode: {
        screen: Barcode,
    },
    Settings: {
        screen: Settings,
        navigationOptions: {
            headerTitle: <Text h1 bold>Settings</Text>,
        },
    },
}, {
    defaultNavigationOptions: {
        headerStyle: {
            height: 0,
            backgroundColor: theme.colors.gray3,
            shadowColor: "Transparent",
            elevation: 0,
            shadowRadius: 0,
            borderBottomColor: "transparent",
        }
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
    }, )
);