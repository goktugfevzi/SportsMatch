import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, View, Image,TextInput,Button } from "react-native";
import firestore from "@react-native-firebase/firestore";
import Input from '../../Components/LoginInput';
const App=({ navigation })=>{
    const [Teams, setTeam] = useState({
        name:"",
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
   const createTeam= async(team)=>{
    try {
        await firestore().collection('Teams').add(team)
        navigation.navigate("Home")
    } catch (error) {
     console.log(error)   
    }
  }
  const [member,setmember]=useState([])
//eklenmek istenen kullancıı var ise tru yoksa false
  const searchMem=async(name)=>{//Sorgu
const collection=await  firestore().collection('users').where('Name','==',name).get()
console.log(collection.docs)
if(collection !==""){
    setmember(
        collection.docs.map((doc)=>{
            return{...doc.data()}
        }))
    console.log("true")
    return true
}

  }
     

return(
<SafeAreaView>
    <Input value={Teams.name}
    onChangeText={(name)=>{setTeam({...Teams,name:name})}}
    placeholder="Entername" 

    />
      <Input value={Teams.city}
    onChangeText={(city)=>{setTeam({...Teams,city:city})}}
    placeholder="Enter city" 

    />
     <Input value={Teams.captain}
    placeholder="Enter captain name:" 
    onChangeText={(captain)=>{setTeam({...Teams,captain:captain})}}
    />

<Button title="Save" onPress={()=>{{
        createTeam(Teams)
        navigation.navigate("Home")    } 
    }}/>

<Button title="aa" onPress={()=>{
    navigation.navigate("Home")
}}/>

</SafeAreaView>
);
//createTeam(Teams)

}
export default App;
