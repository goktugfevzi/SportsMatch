import {View,TextInput } from "react-native";
import Feather from 'react-native-vector-icons/Feather';
import styles from "./EditProfileCardStyle";


const EditProfileCard =(props)=>{
return(
    <View
    style={styles.textContainer}>
    <Feather name={props.name} size={20}/>
    <TextInput
        placeholder={props.text}
        placeholderTextColor={'gray'}
        keyboardType="email-address"
        autoCorrect={false}
        style={styles.textInput}
     />
 </View>
);}
export default EditProfileCard;