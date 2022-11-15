import {TextInput, View} from 'react-native';
import React from 'react';
import styles from './Input.style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Input = ({placeholder, onChangeText, value, iconName, isSecure}) => {
  return (
    <View style={styles.container}>
      <TextInput
        autoCapitalize="none"
        style={styles.input}
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
        secureTextEntry={isSecure}
      />
      <Icon name={iconName} size={30} color="gray" />
    </View>
  );
};

export default Input;
