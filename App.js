import React from 'react';
import {SafeAreaView, StyleSheet, StatusBar} from 'react-native';
import OnboardingScreen from './src/screens/OnboardingScreen';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <OnboardingScreen />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({});

export default App;
