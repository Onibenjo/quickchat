import React from 'react';
import {SafeAreaView, StatusBar, Text, View} from 'react-native';
import Providers from './src/navigation';

const App = () => {
  return (
    <View style={{flex: 1, backgroundColor: '#000'}}>
      <StatusBar barStyle="dark-content" />
      <Text style={{color: '#000'}}>jjj</Text>
      {/* <Providers /> */}
    </View>
  );
};

export default App;
