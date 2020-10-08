import React from 'react';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import styled from 'styled-components/native';
import FormButton from '../components/Button/FormButton';
import SocialButton from '../components/Button/SocialButton';
import FormInput from '../components/Input/FormInput';
import screens from '../helpers/screens';

const LoginScreen = ({navigation: {navigate}}) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  return (
    <Container
      contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}>
      <Logo
        source={{uri: 'https://medtech.africa/logo.png'}}
        // resizeMode="cover"
      />
      <Text>Quick Chat</Text>
      <FormInput
        icon="user"
        placeholder="Email"
        label={email}
        onChangeText={(userEmail) => setEmail(userEmail)}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <FormInput
        icon="lock"
        placeholder="Password"
        label={password}
        onChangeText={(pass) => setPassword(pass)}
        secureTextEntry
      />
      <FormButton title="Login" onPress={() => {}} />
      <ForgotPasswordBtn>
        <ButtonText>Forgot Password?</ButtonText>
      </ForgotPasswordBtn>
      <SocialButton
        title="Google"
        icon="google"
        color="#de4d41"
        backgroundColor="#f5e7ea"
        onPress={() => {}}
      />
      <SocialButton
        title="Facebook"
        icon="facebook"
        color="#4867aa"
        backgroundColor="#e6eaf4"
        onPress={() => {}}
      />
      <ForgotPasswordBtn onPress={() => navigate(screens.register)}>
        <ButtonText>Don't have an account? Create here</ButtonText>
      </ForgotPasswordBtn>
    </Container>
  );
};

export default LoginScreen;

const Container = styled.ScrollView`
  flex: 1;
  background-color: #fff;
  padding: ${wp('10%')}px;
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
const ForgotPasswordBtn = styled.TouchableOpacity`
  margin-vertical: 35px;
`;
const ButtonText = styled.Text`
  font-size: 18px;
  font-weight: 500;
  color: #2e64e5;
  font-family: Lato-Regular;
`;
