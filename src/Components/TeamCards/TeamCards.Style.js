import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container:{
        padding:20,
    },
    teams:{
        flexDirection: 'row',
    },
    inner_container:{
        marginLeft:16,
    },
    title:{
        fontSize:16,
        fontWeight:'bold',
        color: 'black',
    },
    image:{
        width:62,
        height:62,
        borderRadius:31,
        marginLeft:10,
    },
    captain:{
        fontStyle: 'italic',
    },
    offer:{
        backgroundColor:'orange',
        height:38,
        padding:10,
        justifyContent: 'center',
        marginTop: 'auto',
        marginBottom:'auto',
        borderRadius:5,
    },
    offerText:{
        color: 'black',
    },
    touchable:{
        marginLeft:'auto',
        marginRight:8,
    }
})

export default styles;