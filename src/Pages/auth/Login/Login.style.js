import { Dimensions, StyleSheet } from "react-native";


export default StyleSheet.create({
  
        body_container:{
            flex:1,
          
        },
         container:{
            flex:1,
            backgroundColor:"snow", 
            justifyContent:'space-around',

        },
        logo_container:{
            backgroundColor:'snow',

         },
        logo:{
            height: Dimensions.get('window').height/2,
            width: Dimensions.get('window').width,
            resizeMode: 'contain',
            alignSelf:'center',
            backgroundColor:"snow",
        },
        name_style:{
            fontSize:20  ,
            color:'darkorange',
            fontWeight:'bold',
            alignSelf:'center',
        }
    }
)