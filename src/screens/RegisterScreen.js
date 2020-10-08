import React from 'react';
import {Alert, TouchableOpacity} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import styled from 'styled-components/native';
import FormButton from '../components/Button/FormButton';
import SocialButton from '../components/Button/SocialButton';
import FormInput from '../components/Input/FormInput';
import screens from '../helpers/screens';

const RegisterScreen = ({navigation: {navigate}}) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [password2, setPassword2] = React.useState('');

  const handleRegister = () => {
    if (password !== password2) {
      Alert.alert('Passwords do not match', 'Please, crosscheck passwords');
    }
  };

  return (
    <Container
      contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}>
      <Logo
        source={{uri: 'https://medtech.africa/logo.png'}}
        // resizeMode="cover"
      />
      <Text>Create an account</Text>
      {/* imput fields */}
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
      <FormInput
        icon="lock"
        placeholder="Confirm Password"
        label={password2}
        onChangeText={(pass) => setPassword2(pass)}
        secureTextEntry
      />
      {/* formm button */}
      <FormButton title="Register" onPress={handleRegister} />
      {/* terms and conditon */}
      <PrivacyWrapper>
        <TextPrivate>
          By registering, you confirm that you agree to the{' '}
        </TextPrivate>
        <TouchableOpacity>
          <TextPrivate orange>Terms of service</TextPrivate>
        </TouchableOpacity>
        <TextPrivate> and </TextPrivate>
        <TouchableOpacity>
          <TextPrivate orange>Privacy Policy</TextPrivate>
        </TouchableOpacity>
      </PrivacyWrapper>
      {/* social media logins */}
      <SocialButton
        title="Signup with Google"
        icon="google"
        color="#de4d41"
        backgroundColor="#f5e7ea"
        onPress={() => {}}
      />
      <SocialButton
        title="Signup with Facebook"
        icon="facebook"
        color="#4867aa"
        backgroundColor="#e6eaf4"
        onPress={() => {}}
      />
      {/* login */}
      <ForgotPasswordBtn onPress={() => navigate(screens.login)}>
        <ButtonText>Have an account? Login</ButtonText>
      </ForgotPasswordBtn>
    </Container>
  );
};

export default RegisterScreen;

const Container = styled.ScrollView`
  flex: 1;
  background-color: #fff;
  padding: ${wp(10)}px;
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
const TextPrivate = styled.Text`
  font-size: 13px;
  font-weight: 400;
  color: ${(props) => (props.orange ? '#e88832' : 'gray')};
  font-family: Lato-Regular;
`;
const PrivacyWrapper = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-vertical: 35px;
  justify-content: center;
`;
