import React from 'react';
import {View, Text} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styled from 'styled-components';
import tailwind from 'tailwind-rn';
import {windowHeight} from '../../helpers/dimensions';

const FormInput = ({label, placeholder, icon, ...rest}) => {
  return (
    <Container>
      <Icon>
        <AntDesign name={icon} size={25} color="#666" />
      </Icon>
      <TextInput
        {...rest}
        label={label}
        placeholder={placeholder}
        placeholderTextColor="#666"
        numberOfLines={1}
      />
    </Container>
  );
};

export default FormInput;

const Container = styled.View`
  ${tailwind(
    'mt-1 mb-2 w-full items-center bg-white rounded border flex flex-row',
  )}
  height: ${windowHeight / 15}px;
  border-color: #ccc;
`;

const Icon = styled.View`
  ${tailwind('border-r h-full p-3 justify-center items-center')};
  font-family: 'Lato-Regular';
  color: #333;
  border-right-color: #ccc;
  width: 50px;
`;
const TextInput = styled.TextInput`
  ${tailwind('p-3 flex-grow justify-center items-center')};
  font-family: 'Lato-Regular';
  color: #333;
`;
