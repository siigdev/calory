import React, { Component } from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Login from '../screens/Login';
import Welcome from '../screens/Welcome';
import Signup from '../screens/Signup';
import Main from '../screens/Main';
import Settings from '../screens/Settings';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import { theme } from '../constants';
import { Text, Button } from '../components';

const authLoadingScreen = createStackNavigator({
    AuthLoadingScreen: {
        screen: AuthLoadingScreen
    }
});
const authScreens = createStackNavigator({
    Welcome: {
        screen: Welcome,
        navigationOptions: {
            backgroundColor: theme.colors.white,
        }
    },
    Login: {
        screen: Login,
        navigationOptions: {
            headerTitle: <Text h1 bold>Login</Text>,
            backgroundColor: theme.colors.white,
        },
    },
    Signup: {
        screen: Signup,
        navigationOptions: {
            headerTitle: <Text h1 bold>Sign Up</Text>,
            backgroundColor: theme.colors.white,
        },
    },
})

const screens = createStackNavigator({

    Main: {
        screen: Main,
        navigationOptions: {
            backgroundColor: theme.colors.gray3,
            headerLeft: null,
        }
    },
    Settings: {
        screen: Settings,
        navigationOptions: {
            headerTitle: <Text h1 bold>Settings</Text>,
            backgroundColor: theme.colors.white,
        },
    },
}, {
    defaultNavigationOptions: {
        headerStyle: {
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
    })
);