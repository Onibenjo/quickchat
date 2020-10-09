import React from 'react';
import {StyleSheet, Image, View} from 'react-native';
import FormButton from '../components/Button/FormButton';
import screens from '../helpers/screens';
import tailwind from 'tailwind-rn';
import {useAuth} from '../context/auth';

const HomeScreen = ({navigation}) => {
  const {logout} = useAuth();
  return (
    <View style={tailwind('px-5')}>
      <Image
        source={require('../assets/text_re.png')}
        resizeMode="contain"
        style={styles.image}
      />
      <FormButton
        title="Video Chat"
        onPress={() => navigation.navigate(screens.videoChat)}
      />
      <FormButton title="Log Out" onPress={logout} />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 300,
  },
});

export default HomeScreen;
