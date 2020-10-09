import React from 'react';
import TwilioVideoDisplay from '../components/TwilioVideoDisplay';
import {NetworkProvider} from 'react-native-offline';

const VideoChatScreen = () => {
  return (
    <NetworkProvider>
      <TwilioVideoDisplay />
    </NetworkProvider>
  );
};

export default VideoChatScreen;
