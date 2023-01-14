import { Dimensions, StyleSheet } from "react-native";


const styles = StyleSheet.create({
    container:{
        padding:12,
        flex:1,
        backgroundColor:'#EFEFEF'
    },
    person_container:{
        flexDirection:'row',
        padding:6,
        justifyContent:'center',
        
    },
    inner_container:{
        marginTop:18,
        padding:10,
        marginLeft:'22%',
    },
    person:{
        flexDirection:'row',
    },
    info:{
        marginBottom:12,
        color: '#2C3333',
        fontWeight: '500',
        display:'flex',
        justifyContent:'space-between',
        alignSelf:'center'
    },
    image:{
        width:80,
        height:80,
        borderRadius:20,
        // height:Dimensions.get('window').height/7,
        // width:Dimensions.get('window').width/3,
        height:125,
        width:125,
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
    text_container:{
        padding:0,
        margin:5,
        backgroundColor:'#F1F1F1',
        borderRadius: 5,
        flexDirection:'row',
        borderWidth:1,
        borderRadius:8,
        borderColor:'#F39426',
        color:"black",
        height:50
    },
    text_style:{
        color:'black',
        fontSize:15,
        padding:8,
    },
})


export default styles;