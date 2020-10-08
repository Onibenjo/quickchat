import React from 'react';
import {StyleSheet, Image} from 'react-native';
import FormButton from '../components/Button/FormButton';
import screens from '../helpers/screens';

const HomeScreen = ({navigation}) => {
  return (
    <>
      <Image
        source={require('../assets/text_re.png')}
        resizeMode="contain"
        style={styles.image}
      />
      <FormButton
        title="Video Chat"
        onPress={() => navigation.navigate(screens.videoChat)}
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

export default HomeScreen;
