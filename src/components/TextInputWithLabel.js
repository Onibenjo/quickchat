import React from 'react';
import {View, StyleSheet, Text, TextInput, Platform} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default function InputFieldWithLabelComponent(props) {
  return (
    <View style={styles.spacing}>
      <Text style={styles.inputLabel}>{props.label}</Text>
      <TextInput
        style={styles.inputBox}
        placeholder={props.placeholder}
        defaultValue={props.defaultValue}
        onChangeText={props.onChangeText}
      />
    </View>
  );
}

{
  /* <InputWithLabel
   label = "Room Name"
   placeholder="Room Name"
   defaultValue={this.state.roomName}
   onChangeText={(text) => this.setState({roomName: text})}
/>
<InputWithLabel
   label = "Token"
   placeholder="Token"
   defaultValue={this.state.token}
   onChangeText={(text) => this.setState({token: text})}
/> */
}

const styles = StyleSheet.create({
  spacing: {
    padding: 10,
  },
  inputLabel: {
    fontSize: 18,
  },
  inputBox: {
    borderBottomColor: '#cccccc',
    fontSize: 16,
    width: wp('95%'),
    borderBottomWidth: 1,
  },
});
