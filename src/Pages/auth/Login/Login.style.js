import { Dimensions, StyleSheet } from "react-native";


export default StyleSheet.create({
  
        body_container:{
            flex:1,
        },
         container:{
            flex:1,
            backgroundColor:'#F7F7F7',
            justifyContent:'space-around',
        },
        logo_container:{
            backgroundColor:'#F7F7F7',

         },
        logo:{
            height: Dimensions.get('window').height/2,
            width: Dimensions.get('window').width,
            resizeMode: 'contain',
            alignSelf:'center',
            backgroundColor:'#F7F7F7',
        },
        name_style:{
            fontSize:20  ,
            color:'darkorange',
            fontWeight:'bold',
            alignSelf:'center',
            backgroundColor:'#F7F7F7',
        }
    }
)