import { Dimensions, StyleSheet } from "react-native";

export default StyleSheet.create({
    body_container:{
        flex:1,
        marginTop:20,
    },
    
    logo_container:{
        
        backgroundColor:'snow'

     },
     backgroundImage:{
        height:Dimensions.get('window').height,
            width:Dimensions.get('window').width,
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