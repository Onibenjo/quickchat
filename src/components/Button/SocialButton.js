import React from 'react';
import styled from 'styled-components/native';
import {windowHeight} from '../../helpers/dimensions';
import tailwind from 'tailwind-rn';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const SocialButton = ({title, icon, color, backgroundColor, ...rest}) => {
  return (
    <ButtonContainer style={{backgroundColor}} {...rest}>
      <Icon>
        <FontAwesome name={icon} size={25} color={color || '#666'} />
      </Icon>
      <ButtonTextView>
        <ButtonText style={{color}}>{title}</ButtonText>
      </ButtonTextView>
    </ButtonContainer>
  );
};

export default SocialButton;

const ButtonContainer = styled.TouchableOpacity`
  margin-top: 10px;
  width: 100%;
  height: ${windowHeight / 15}px;
  padding: 10px;
  ${tailwind('rounded flex-row')}
`;

const ButtonText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  font-family: 'Lato-Regular';
`;
const ButtonTextView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Icon = styled.View`
  ${tailwind('justify-center items-center')};
  width: 30px;
`;
