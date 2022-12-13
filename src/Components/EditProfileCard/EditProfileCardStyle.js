import { StyleSheet } from "react-native";

const styles =StyleSheet.create({
    textContainer:{
        flexDirection:'row',
        marginTop:10,
        marginBottom:10,
        borderBottomWidth:1,
        borderBottomColor:'orange',
        paddingBottom:0,
    },
    textInput:{
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    }, 
}
   
)
export default styles;