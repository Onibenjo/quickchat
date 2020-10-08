import React from 'react';
import {SafeAreaView, StatusBar, Text, View} from 'react-native';
import Providers from './src/navigation';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Providers />
    </>
  );
};

export default App;
