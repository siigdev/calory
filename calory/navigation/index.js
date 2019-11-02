import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Login from '../screens/Login';

const screens = createStackNavigator({
    Login
})

export default createAppContainer(screens);