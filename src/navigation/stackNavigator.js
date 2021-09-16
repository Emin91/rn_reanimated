import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ScreenOne from '../views/screenOne';
import ScreenTwo from '../views/screenTwo';
import ScreenThree from '../views/screenThree';

const Stack = createStackNavigator();

export const StackMainNavigator = () => {
    return (
        <Stack.Navigator initialRouteName='ScreenThree' screenOptions={{ headerShown: false }}>
            <Stack.Screen name='ScreenOne' component={ScreenOne} />
            <Stack.Screen name='ScreenTwo' component={ScreenTwo} />
            <Stack.Screen name='ScreenThree' component={ScreenThree} />
        </Stack.Navigator >
    );
};