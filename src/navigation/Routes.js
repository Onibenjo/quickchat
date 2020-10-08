import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {NavigationContainer} from '@react-native-firebase/app';
import {useAuth} from '../context/auth';

import AppStack from './AppStack';
import AuthStack from './AuthStack';

const Routes = () => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const {user, setUser} = useAuth();

  // Handle user state changes
  const onAuthStateChanged = (fbUser) => {
    setUser(fbUser);
    if (initializing) {
      setInitializing(false);
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) {
    return null;
  }

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Routes;
