import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import screens from '../helpers/screens';
import HomeScreen from '../screens/HomeScreen';

const Stack = createStackNavigator();
const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={screens.home} component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default AppStack;
