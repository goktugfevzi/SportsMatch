import React, { useEffect, useState } from 'react'
import { View ,Text,ScrollView,TouchableOpacity,TextInput,Image, Button, SafeAreaView} from 'react-native'
import firestore from '@react-native-firebase/firestore'
import { Card } from 'react-native-elements'
import { StyleSheet } from 'react-native'
import styles2 from './homeSreen.style'
import BottomSheet from '../../Components/detailBottomSheet/DetailBottomSheet'
import { Provider } from "react-native-paper";

import SearchInput from '../../Components/SearchInput'
import { Value } from 'react-native-reanimated'

const HomeScr=()=>
{
    const [users, setusers] = useState([])//
    //Teamleri firestoredan çekmek için asenkron metot
       const userTeams=async()=>{
            const userCollection=await firestore().collection('users').get()
            //console.log(userCollection.docs)
            //Çekilen datayı users değişkenine atarı
            setusers(
                userCollection.docs.map((doc)=>{
                    return{...doc.data(),id:doc.id}
                })
            )
       }
const [member,setmember]=useState([])
    const searchMem=async(name)=>{//Sorgu
    const collection=await  firestore().collection('users').where('Name','==',name).get()
    console.log(collection.docs)
        setmember(
            collection.docs.map((doc)=>{
                return{...doc.data(),id:doc.id}
            })
        )  
    }

    const [Teams, setTeams] = useState([])//
    //Teamleri firestoredan çekmek için asenkron metot
       const fetchTeam=async()=>{
            const teamCollection=await firestore().collection('Teams').get()
            //console.log(teamCollection.docs)
            //Çekilen datayı Teams değişkenine atarı
            setTeams(
                teamCollection.docs.map((doc)=>{
                    return{...doc.data(),id:doc.id}
                })
            )
       }

  
    //sayfaya girince çalışması için 
    useEffect(()=>{
        fetchTeam()
        userTeams()
   //Değişiklikleri Dinleriz
    firestore().collection("Teams").where("type","==","team").onSnapshot(querySnapShot =>{
        querySnapShot.docChanges().forEach(change=>{
            if(change.type=='added'){
                //console.log("new student:",change.doc.data())
            }
            if(change.type=='modfied'){
                //console.log("modified student:",change.doc.data())
            }
            if(change.type=='removed'){
                //console.log("removed student:",change.doc.data())
            }
            fetchTeam()
        })
    })
    },[])

 const [show, setshow] = useState(false);


//Takım Arama
const [team,setTeam]=useState([])
    const searchTeam=async(name)=>{//Sorgu
    const collection=await  firestore().collection('Teams').where('name','==',name).get()
    console.log(collection.docs)
        setmember(
            collection.docs.map((doc)=>{
                return{...doc.data(),id:doc.id}
            })
        )  
    }

    return(<Provider>
        
        <SearchInput />

        <View style={styles.cardContainer}>
            <ScrollView style={{marginHorizontal:10}}>
             { 
                Teams.map(team=>{
                 
                    return(     

                        <View style={styles.cardContainer}>
               
                        <Card >
                        <Card.Title style={{color:"orange",fontWeight:"bold",fontSize:18}}>{team.name}</Card.Title>
                        <Card.Image source={require("../../assets/logo2.png")}/>
                        <Card.Divider/>

                        <View style={{alignItems:"center"}}>
                       <Text>id:{team.id}</Text>
                       <Text > City:{team.city}</Text>
                       <Text style={{fontSize:15}} onPress={()=>{ setshow(true)}}>captain: {team.captain}</Text>

                       <Text>Member1:<Text style={{color:"#3740FE"}}  onPress={()=>{
                       names=team.mem1
                       searchMem(names)
                       if(member!==""){
                        setshow(true)
                       }
                       }}>{team.mem1}</Text> </Text>

                       <Text>Member2: {team.mem2}</Text> 
                       <Text>Member3: {team.mem3}</Text>
                       <Text>Member4: {team.mem4}</Text>
                       <Text>Member5: {team.mem5}</Text>
                       <Text>Member6: {team.mem6}</Text>
                       
                       </View>
                    </Card>
                    </View>
                 
                    )
                })
             }
     </ScrollView>
     <ScrollView>
    <View>

        <BottomSheet show={show} onDismiss={() => { setshow(false); }}>    
           {member.map(mem=>{
            return(
               
            <View  style={{alignItems:"center"}}>              
                <Image style={{width:140,height:140 ,borderRadius:100,marginTop:+0}} source={require("../../assets/logo2.png")}/>
                <Text style={{fontSize:25,color:"black",fontWeight:"bold",padding:10}}>{mem.Name}</Text>


            <View style={styles.memContainer}> 
               <Text style={{fontSize:15,color:"gray",fontWeight:"bold"}} > Age:{mem.Age}</Text>
           
            </View >
            <View style={styles.memContainer}>
                <Text style={{fontSize:15,color:"gray",fontWeight:"bold"}} >City: {mem.City}</Text> 
            </View>
            <View style={styles.memContainer}>
                <Text style={{fontSize:15,color:"gray",fontWeight:"bold"}} >Description: {mem.Description}</Text>
            </View>
            <View style={styles.memContainer}>
                <Text style={{fontSize:15,color:"gray",fontWeight:"bold"}} >Height: {mem.Height}</Text>  
            </View>
            <View style={styles.memContainer}> 
                <Text style={{fontSize:15,color:"gray",fontWeight:"bold"}} >Team:{mem.Team}</Text>  
            </View>
            <View style={styles.memContainer}>
                <Text style={{fontSize:15,color:"gray",fontWeight:"bold"}} >Position: {mem.Position}</Text>
            </View>
            <View style={styles.memContainer}>
                <Text style={{fontSize:15,color:"gray",fontWeight:"bold"}} >Weight: {mem.Weight}</Text>
            </View>
                  
            </View>
             
               
            )
           }
           )
          
        }
         </BottomSheet>
       
        </View>
        </ScrollView>
   
    
        </View>
        </Provider>
               
    );
   
}


const styles = StyleSheet.create({
cardContainer:{
alignItems:"stretch",
flex:1,
justifyContent:"space-around",
flexDirection:"column"

},
memContainer:{

    alignSelf:"center",flexDirection:"row",padding:10,borderRadius:20,
    shadowOpacity:90,backgroundColor:"#fff",elevation:10 ,
    marginTop:5,marginBottom:5,width:"90%",justifyContent:"center"
    
    
},
bottomContainer:{
    marginTop:"0%",
    height:"0%",
    width:400,
    backgroundColor:'wheat',
    borderRadius:50,
    borderBottomEndRadius:50,
    alignItems:'center',
    borderTopEndRadius:50,
    flexDirection:"column",
   

},  profile:{
    height:150,
    width:150, 
    borderRadius:20,
     bottom:"30%"
  },
  name:{
      fontSize:20,
      color:"orange",
      fontWeight:"bold",
      bottom:"10%",
  },


})
export default HomeScr