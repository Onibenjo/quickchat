import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import screens from '../helpers/screens';
import LoginScreen from '../screens/LoginScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import RegisterScreen from '../screens/RegisterScreen';
import AsyncStorage from '@react-native-community/async-storage';

const Stack = createStackNavigator();
const AuthStack = () => {
  const [isNewUser, setIsNewUser] = useState(null);

  useEffect(() => {
    const getFirstTimeState = async () => {
      try {
        const newUser = await AsyncStorage.getItem('newUser');
        if (newUser === null) {
          await AsyncStorage.setItem('newUser', 'false');
          setIsNewUser(true);
          return;
        }
        setIsNewUser(false);
      } catch (e) {
        console.log({e});
      }
    };
    getFirstTimeState();
  }, []);

  if (isNewUser === null) {
    return null;
  }
  return (
    <Stack.Navigator
      headerMode="none"
      initialRouteName={isNewUser ? screens.onboarding : screens.login}>
      <Stack.Screen name={screens.onboarding} component={OnboardingScreen} />
      <Stack.Screen name={screens.login} component={LoginScreen} />
      <Stack.Screen name={screens.register} component={RegisterScreen} />
    </Stack.Navigator>
  );
};

// you could also use if else statement and state
// tried using ref but the component didnt re-render
// so ref is a bad choice
// if (isNewUser) {
//   return (
//     <Stack.Navigator headerMode="none" initialRouteName={initialRoute.current}>
//       <Stack.Screen name={screens.onboarding} component={OnboardingScreen} />
//       <Stack.Screen name={screens.login} component={LoginScreen} />
//       <Stack.Screen name={screens.register} component={RegisterScreen} />
//     </Stack.Navigator>
//   );
// }

// return (
//   <Stack.Navigator headerMode="none">
//     <Stack.Screen name={screens.login} component={LoginScreen} />
//     <Stack.Screen name={screens.register} component={RegisterScreen} />
//   </Stack.Navigator>
// );

export default AuthStack;
