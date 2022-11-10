import React from "react";
import { View, TextInput } from "react-native";
import styles from "./SearchInput.style";


function SearchInput(props){

    return(
        <View>
            <TextInput placeholder="Takım Ara..."  onChangeText={props.search} style={styles.container}/>
        </View>
    )
}

export default SearchInput;