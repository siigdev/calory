import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Login from '../screens/Login';
import Welcome from '../screens/Welcome';
import Main from '../screens/Main';

const screens = createStackNavigator({
    Welcome,
    Login,
    Main
})

export default createAppContainer(screens);