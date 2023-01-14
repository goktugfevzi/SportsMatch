import { Text,TextInput, View, Image,TouchableOpacity,StyleSheet} from "react-native";
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore'
import SearchFilter from "./homeScreensearch"
import styles from "./homeSreen.style";
import Icon from "react-native-vector-icons/Ionicons"

 const App =()=>{


    const[query,setQuery]=useState("")
    const [error,setError]=useState(false)
    const [Teams, setTeams] = useState([])

        //sayfaya girince çalışması için 
        useEffect(()=>{
            fetchTeam()
          //  searchTeam(term)//search
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
        },[
            //
        ])
    
    
    //Veri Çeker
  //
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

return(
   <View  >
    <Image source={require("../../assets/deneme3.jpg")} style={StyleSheet.absoluteFillObject}  blurRadius={9} />
    <View style={styles.searchWrapperStyle}>
           <View style={styles.searchBar}>

            <TextInput  placeholder="Takım Ara..."    
       
            value={query}
            style={styles.searchInputStyle}
            onChangeText={(newText)=>{
                var letter=/^[A-Za-z]+$/;
                if(newText.length>30)
                setError("Query too long")

               else if(newText.match(letter) || newText.match(" ")){
                setQuery(newText)
                setError(false)
                }
                else{
                    setError("Please only enter letter")
                } 
                
            }} 
          />
             <TouchableOpacity onPress={()=>{
      
                console.log("text input içindeyim")
            
            }}>
            <Icon size={18} name="search" color="green" style={styles.iconStyle}/>
            </TouchableOpacity>
           </View>
            
          <Text style={{ color:"orange"}}>{error}</Text>
          {query ?
          <TouchableOpacity onPress={()=>{setQuery("")}}>
            <Icon size={18} name="close" color="green" style={styles.iconClose}  />
            </TouchableOpacity>
            : null}
        </View>
    <SearchFilter data={Teams} input={query} setinput={setQuery}/>
   </View>
)
 }
 export default App