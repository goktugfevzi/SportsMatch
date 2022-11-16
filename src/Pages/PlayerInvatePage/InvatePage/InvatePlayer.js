import React from "react";
import { Text, View,Image } from "react-native";
import styles from "./InvatePlayer.Style";
import auth from "@react-native-firebase/auth"
function InvatePlayerPage(){
    const userdata = auth().currentUser
  console.log(userdata);
    return(
        <View>
            <Text>INVATE PLAYER SCREEN</Text>
        </View>
    )
}

export default InvatePlayerPage;