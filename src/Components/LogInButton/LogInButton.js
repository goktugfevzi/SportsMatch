import React from "react";
import { TouchableOpacity,Text } from "react-native";

import styles from './LogınButtonStyle'


const Button=(props)=>{
    return(
       <TouchableOpacity style={styles.container} onPress={props.function}>
            <Text style={styles.title}>{props.title}</Text>
       </TouchableOpacity>
    );
}
export default Button;