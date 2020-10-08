import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const LoginScreen = () => {
  const textInputChange = () => {};
  return (
    <View style={styles.container}>
      <Text style={styles.textFooter}>Username</Text>
      <View style={styles.inputField}>
        <FontAwesome name="user-o" color="#05375a" size={25} />
        <TextInput
          placeholder="Your Email"
          style={styles.textInput}
          autoCapitalize="none"
          onChangeText={textInputChange}
        />
        {/* {data.check_textInputChange ? (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color="green" size={20} />
            </Animatable.View>
          ) : null} */}
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    paddingHorizontal: wp(10),
  },
  inputField: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#333',
    paddingBottom: 5,
    marginTop: 10,
  },
});
