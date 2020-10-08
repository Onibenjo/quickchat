import React from 'react';
import {StyleSheet, Image, View, Pressable, Text} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import screens from '../helpers/screens';

const Dots = ({selected, isLight}) => {
  const backgroundColor = selected
    ? isLight
      ? 'rgba(0,0,0,1)'
      : 'rgba(255,255,255,1)'
    : 'rgba(0,0,0,0.5)';
  const width = selected ? 16 : 8;
  return <View style={[styles.dots, {backgroundColor, width}]} />;
};

const Done = (props) => {
  return (
    <Pressable {...props}>
      <Text style={styles.doneBtn}>Done</Text>
    </Pressable>
  );
};

const OnboardingScreen = ({navigation: {replace}}) => {
  return (
    <>
      <Onboarding
        onSkip={() => replace(screens.login)}
        onDone={() => replace(screens.login)}
        DotComponent={Dots}
        DoneButtonComponent={Done}
        pages={[
          {
            backgroundColor: '#eee',
            image: (
              // <Svg />
              <Image
                source={require('../assets/text_re.png')}
                resizeMode="contain"
                style={styles.image}
              />
            ),
            title: 'Realtime Conversation',
            subtitle: 'Chat with friends and family instantly',
          },
          {
            backgroundColor: '#333',
            image: (
              // <Svg />
              <Image source={require('../assets/onboarding-img1.png')} />
            ),
            title: 'Connect to friends',
            subtitle:
              'The best way to connect with friends anywhere in the world',
          },

          {
            backgroundColor: '#e9bcbe',
            image: (
              // <Svg />
              <Image
                source={require('../assets/onboarding-img3.png')}
                resizeMode="contain"
                style={styles.image}
              />
            ),
            title: 'Video Chat',
            subtitle: 'Chat with friends and family instantly',
          },
          {
            backgroundColor: '#fdeb93',
            image: (
              // <Svg />
              <Image
                source={require('../assets/onboarding-img2.png')}
                resizeMode="contain"
                style={styles.image}
              />
            ),
            title: 'Video Chat',
            subtitle: 'Chat with friends and family instantly',
          },
        ]}
      />
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    width: wp(80),
    height: hp(30),
  },
  dots: {
    width: 12,
    height: 8,
    marginHorizontal: 3,
    borderRadius: 100 / 2,
  },
  doneBtn: {
    paddingHorizontal: 15,
    fontSize: 16,
  },
});

export default OnboardingScreen;
