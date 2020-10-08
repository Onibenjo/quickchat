import React from 'react';
import {StyleSheet, Image} from 'react-native';

const HomeScreen = () => {
  return (
    <>
      <Image
        source={require('../assets/text_re.png')}
        resizeMode="contain"
        style={styles.image}
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
