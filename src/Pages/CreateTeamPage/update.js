import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, View, Image,TextInput,Button } from "react-native";

import firestore from "@react-native-firebase/firestore";

const upload=({ navigation, route })=>{
    //Gönderilen parametre yakalanır
    const {teamsToUpdate}=route.params
    const teamId=teamsToUpdate.id
    const [Teams, setTeam] = useState({
        name:teamsToUpdate.name,
        captain:"",
        mem1:"",
        mem2:"",
        mem3:"",
        mem4:"",
        mem5:"",
        mem6:"",
        city:"",
        type:"team"
    })
   const updateTeam= async(team)=>{
    try {
        await firestore().collection('Teams').doc(teamId).update(team)
        navigation.navigate("Home")
    } catch (error) {
     console.log(error)   
    }
  }
     
return(
<SafeAreaView>
    <TextInput value={Teams.name}
    onChangeText={(name)=>{setTeam({...Teams,name:name})}}
    placeholder="Entername" 

    />
      <TextInput value={Teams.city}
    onChangeText={(city)=>{setTeam({...Teams,city:city})}}
    placeholder="Entername" 

    />
<Button title="Save" onPress={()=>{createTeam(Teams)}}/>
<Button title="aa" onPress={()=>{
    navigation.navigate("Home")
}}/>
</SafeAreaView>
);
}
export default upload;