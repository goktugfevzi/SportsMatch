import { Dimensions, StyleSheet } from "react-native";
import colors from "../../../styles/colors"

export default StyleSheet.create({
    body_container:{
        resizeMode:'contain',
        justifyContent:'space-around',
        flex:1,
    },
       container:{
        justifyContent:'space-evenly',
        flex:1,
        backgroundColor:"snow"
    },
    logo_container:{
        
        backgroundColor:'snow'

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
})