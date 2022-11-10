import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    container:{
        padding:18,
        flex:1,
        backgroundColor:'#EFEFEF'
    },
    person_container:{
        flexDirection:'row',
        padding:6,
        marginTop:8,
        borderWidth:2,
        borderColor:'orange',
    },
    inner_container:{
        marginTop:24,
        borderWidth:2,
        borderColor:'orange',
        padding:10,
    },
    info:{
        marginBottom:12,
        color: '#2C3333',
        fontWeight: '500',
        display:'flex',
        justifyContent:'space-between'
    },
    image:{
        width:80,
        height:80,
        borderRadius:40,
    },
    title:{
        marginTop:'auto',
        marginBottom:'auto',
        marginLeft:20,
        fontSize: 22,
        color:'black',
        fontWeight:'bold',
    },
    description:{
        borderWidth:2,
        borderColor:'orange',
        height:86,
        marginTop:24,
    },
    descriptionText:{
        color: 'black',
    },
})


export default styles;