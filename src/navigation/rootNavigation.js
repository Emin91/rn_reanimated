import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View } from 'react-native';
import { StackMainNavigator } from './stackNavigator';

export const RootNavigation = () => {
  return (
    <View style={{flex: 1}}>
      <NavigationContainer>
        <StackMainNavigator />
      </NavigationContainer >
    </View>
  );
};
