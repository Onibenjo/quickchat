import React from 'react';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import styled from 'styled-components';
import FormButton from '../components/Button/FormButton';
import SocialButton from '../components/Button/SocialButton';
import FormInput from '../components/Input/FormInput';
import AntDesign from 'react-native-vector-icons/AntDesign';

const LoginScreen = () => {
  const textInputChange = () => {};
  return (
    <Container>
      <Logo source={{uri: 'https://medtech.africa/logo.png'}} />
      <Text>Quick Chat</Text>
      <FormInput icon="heart" placeholder="Email" label="Email" />
      <FormInput icon="heart" placeholder="Password" label="Password" />
      <FormButton title="Login" />
      <SocialButton
        title="Google"
        icon="google"
        //  color=""
        backgroundColor="red"
      />
    </Container>
  );
};

export default LoginScreen;

const Container = styled.View`
  flex: 1;
  background-color: #fff;
  justify-content: center;
  padding: ${wp('10%')}px;
  align-items: center;
`;
const Text = styled.Text`
  font-size: 16px;
  font-family: 'Kufam-SemiBoldItalic';
  font-size: 28px;
  margin-bottom: 10px;
  color: #051d5f;
`;

const Logo = styled.Image`
  height: 150px;
  width: 150px;
  resize-mode: cover;
`;
// navButton: {
//   marginTop: 15;
// };
// forgotButton: {
//   marginVertical: 35;
// };
// navButtonText: {
//   fontSize: 18;
//   fontWeight: 500;
//   color: #2e64e5;
//   fontFamily: Lato-Regular;
// };
