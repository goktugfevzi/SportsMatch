import { Dimensions, StyleSheet } from "react-native";


export default StyleSheet.create({
  
        container:{
            flex:1,
            backgroundColor:'#F7F7F7',
            justifyContent:'space-around',
        },
        body_container:{
            marginTop:Dimensions.get('window').height/2.1,
        },
        logo_container:{
            backgroundColor:'#F7F7F7',

         },
         backgroundImage: {
            height:Dimensions.get('window').height,
            width:Dimensions.get('window').width,
          },
        logo:{
            height: Dimensions.get('window').height,
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