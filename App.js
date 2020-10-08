import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import Providers from './src/navigation';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Providers />
      </SafeAreaView>
    </>
  );
};

export default App;
