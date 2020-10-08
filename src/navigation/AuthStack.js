import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import screens from '../helpers/screens';
import LoginScreen from '../screens/LoginScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import RegisterScreen from '../screens/RegisterScreen';

const Stack = createStackNavigator();
const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={screens.onboarding} component={OnboardingScreen} />
      <Stack.Screen name={screens.login} component={LoginScreen} />
      <Stack.Screen name={screens.register} component={RegisterScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
