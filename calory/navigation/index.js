import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Login from '../screens/Login';
import Welcome from '../screens/Welcome';
import Signup from '../screens/Signup';
import Main from '../screens/Main';

const screens = createStackNavigator({
    Welcome,
    Login,
    Signup,
    Main
})

export default createAppContainer(screens);