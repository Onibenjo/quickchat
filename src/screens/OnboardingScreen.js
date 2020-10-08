import React from 'react';
import {StyleSheet, Image} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import Svg from '../assets/text_re.svg';

const OnboardingScreen = () => {
  return (
    <>
      <Onboarding
        pages={[
          {
            backgroundColor: '#000',
            image: (
              // <Svg />
              <Image
                source={require('../assets/text_re.png')}
                resizeMode="contain"
                style={styles.image}
              />
            ),
            title: 'Onboarding',
            subtitle: 'Done with React Native Onboarding Swiper',
          },
          {
            backgroundColor: '#035',
            image: (
              // <Svg />
              <Image
                source={require('../assets/text_re.png')}
                resizeMode="contain"
                style={styles.image}
              />
            ),
            title: 'Onboarding',
            subtitle: 'Done with React Native Onboarding Swiper',
          },
        ]}
      />
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 300,
  },
});

export default OnboardingScreen;
