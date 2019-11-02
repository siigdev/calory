import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Login from '../screens/Login';
import Welcome from '../screens/Welcome';

const screens = createStackNavigator({
    Welcome,
    Login
})

export default createAppContainer(screens);