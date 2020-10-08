import React from 'react';
import {StyleSheet, Text} from 'react-native';
import styled from 'styled-components/native';
import {windowHeight} from '../../helpers/dimensions';
import tailwind from 'tailwind-rn';

const FormButton = ({title, ...rest}) => {
  return (
    <ButtonContainer {...rest}>
      <ButtonText>{title}</ButtonText>
    </ButtonContainer>
  );
};

export default FormButton;

const styles = StyleSheet.create({});

const Button = styled.TouchableOpacity`
  margin: 0 0 48px 32px;
  background-color: rgba(255, 255, 255, 0.3);
  align-self: flex-start;
  padding: 6px 18px;
  border-radius: 100px;
`;
const ButtonContainer = styled.TouchableOpacity`
  margin-top: 10px;
  width: 100%;
  height: ${windowHeight / 15}px;
  background: #2e64e5;
  padding: 10px;
  align-items: center;
  justify-content: center;
  ${tailwind('rounded text-white')}
`;

const ButtonText = styled.Text`
  font-size: 16px;
  color: #fff;
  font-weight: bold;
  font-family: 'Lato-Regular';
`;
