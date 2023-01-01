import {Dimensions, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container:{
        padding:18,
        flex:1,
        backgroundColor:'#EFEFEF'
    },
    team_container:{
        flexDirection:'row',
        padding:6,
        marginTop:8,
        borderWidth:2,
        borderColor:'orange',
    },
    image:{
        height:80,
        width:80,
        borderRadius:40,
    },
    title:{
        color:'black',
        fontWeight:'500',
        fontSize:16,
        marginBottom:'auto',
        marginTop:'auto',
        marginLeft:18,
    },
    inner_container:{
        marginTop:24,
        borderWidth:2,
        borderColor:'orange',
        padding:10,
    },
    members_container:{
        padding:6,
    },
    members:{
        flexDirection:'row',
        marginBottom:14,
    },
    memberImage:{
        height:40,
        width:40,
        borderRadius:20,
    },
    hrElement:{
        height:4,
        width:Dimensions.get('window').width,
        backgroundColor:'orange',
        position:'relative'
    },
    captain:{},
})

export default styles;
