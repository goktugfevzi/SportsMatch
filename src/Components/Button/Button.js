import {ActivityIndicator, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import styles from './Button.style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Button = ({text, onPress, loading,color="tomato", icon ,theme="primary",size=25}) => {
   return (
  //   THERE ARE 3 THEME 
  //   1. primary
  //   2. secondary
  //   3. tertiary
  //   IF YOU WANT MORE THEME, YOU CAN CREATE YOUR THEMES
    <TouchableOpacity
      style={styles[theme].container}
      onPress={onPress}
      disabled={loading}>
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <View style={styles[theme].button_container}>
          <Icon name={icon} color={color} size={size} /> 
          <Text style={styles[theme].title}>{text}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Button;
