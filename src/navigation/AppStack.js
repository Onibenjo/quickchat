import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import screens from '../helpers/screens';
import HomeScreen from '../screens/HomeScreen';
import VideoChatScreen from '../screens/VideoChatScreen';

const Stack = createStackNavigator();
const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={screens.home} component={HomeScreen} />
      <Stack.Screen name={screens.videoChat} component={VideoChatScreen} />
    </Stack.Navigator>
  );
};

export default AppStack;
