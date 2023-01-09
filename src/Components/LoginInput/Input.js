import React from "react";
import { TextInput,TouchableOpacity,View,Text} from "react-native";
import styles from './Input_style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const Input=({placeholder,onChangeText,value,iconname,hidepassword})=>{
    return(
        <View style={styles.container}>
            <TextInput   placeholderTextColor={"gray"}
            style={styles.input_style}
            placeholder={placeholder}
            onChangeText={onChangeText}
            value={value}
            secureTextEntry={hidepassword} 
            
            />
            <Icon name={iconname} size={25} color={'darkorange'} style={{alignSelf:'center'} }/>
        </View>
    );
}
export default Input;