import {ActivityIndicator, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import styles from './Button.style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Button = ({text, onPress, loading, icon ,theme="primary"}) => {
  return (
    <TouchableOpacity
      style={styles[theme].container}
      onPress={onPress}
      disabled={loading}>
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <View style={styles[theme].button_container}>
          <Icon name={icon} color="white" size={18} /> 
          <Text style={styles[theme].title}>{text}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Button;
