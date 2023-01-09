import React,{useState, useEffect} from "react";
import { Text, View, FlatList } from "react-native";
import styles from "./InvatePlayer.Style";
import Button from "../../../Components/Button";
import auth from "@react-native-firebase/auth";
import firestore from '@react-native-firebase/firestore';
function InvatePlayerPage(){
    const [users, setUsers] = useState(null)
    const user = auth().currentUser;

    const getUsers = async ()=> {
        const querySanp = await firestore().collection('users').where('uid','!=',user.uid).get()
        const allUsers = querySanp.docs.map(docSnap=>docSnap.data())
        setUsers(allUsers)
      }
      useEffect(()=>{
        getUsers()
      },[])
      
    return(
        <View style={{backgroundColor:"black"}}>
           <FlatList
                  data={users}
                  keyExtractor={(item)=>item.uid}
                  renderItem={({item}) => (
               <View><Text style={{color:"black"}}>{item.a}</Text></View>
                  )}
                  />
        </View>
    )
}

export default InvatePlayerPage;