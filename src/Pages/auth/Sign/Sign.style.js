import { Dimensions, StyleSheet } from "react-native";
import colors from "../../../styles/colors"

export default StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#fff"
    },
    body_container:{
        flex:1,
    },
    header:{
        color:"#fff",
        margin:5,
        fontSize:104,
        backgroundColor:colors.darkgreen,
        borderRadius:25,
       height: Dimensions.get('window').height/3
    }
})