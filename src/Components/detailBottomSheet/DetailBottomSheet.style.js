import { StyleSheet } from "react-native";

const styles=StyleSheet.create({
    closeIcon:{
    position:'absolute',
    right:0,
    left:0,
    zIndex:10,
    },
    root:{
        position:'absolute',
        left:0,
        right:0,
        zIndex:100,
        backgroundColor:'#fff',
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        overflow:"hidden",
        
    },
    ViewTwo:{
            width:60,
            height:3,
            borderRadius:1.5,
            position:'absolute',
            left:170,
            top:20,
            zIndex:10,
            backgroundColor:'#fff',
    },
    header:{
        flexDirection:'row-reverse',
        height:0,
        backgroundColor:'#fff',
      
      },
    common:{
        borderTopLeftRadius:16,
        borderTopRightRadius:16,
        shadowColor:'#fff',
        shadowOffset:{
            height:-3,
            width:0,

        },
        shadowOpacity:0.24,
        shadowRadius:4,
        elevation:3,
    }
 });
 export default styles;