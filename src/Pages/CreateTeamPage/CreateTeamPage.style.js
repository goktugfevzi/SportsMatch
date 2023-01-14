import { StyleSheet } from "react-native";

const styles =StyleSheet.create({
    selectButton: {
      borderRadius: 5,
      width: 150,
      height: 50,
      backgroundColor: '#8ac6d1',
      alignItems: 'center',
      justifyContent: 'center'
    },
    uploadButton: {
      borderRadius: 5,
      width: 150,
      height: 50,
      backgroundColor: '#ffb6b9',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold'
    },
    imageContainer: {
      marginTop: 30,
      marginBottom: 50,
      alignItems: 'center',
    },
    TouchableOpacityContainer: {
      alignItems: 'center',
    },
    progressBarContainer: {
      marginTop: 20
    },
    imageBox: {
      width: 300,
      height: 300
    }
  ,
    container:{
       flex:1,
       margin:5,
       padding:10,
       resizeMode:'contain',
       flexDirection:'column',
       
    },  
    keyStyle:{
      flex:1,
   },
    containerTwo:{
        flexDirection:'row-reverse',
        backgroundColor:'orange',
    },
    imageContainer:{
        height:100,
        width:100,
        borderRadius:15,
        justifyContent:'center',
        alignItems:'center',
    },
    ıconContainer:{
        opacity:0.5,
        alignItems:'center',
        justifyContent:'center',
        borderWidth:1,
        borderColor:"#fff",
        borderRadius:10,
    
    },

      TitleBottomSheetStyle:{
        fontSize:20,
        fontWeight:'bold',
        color:'gray',
        alignSelf:'center',
      },
      textBottomSheetStyle:{
        fontSize:15,
        fontWeight:'bold',
        color:'gray',
        alignSelf:'center',
      },
      galleryButtonStyle:{
        opacity:0.8,
        borderColor:'orange',
        borderWidth:2,
        padding:10,
        backgroundColor:"#fff",
        borderRadius:10,
        alignItems:'center',
        marginTop:10,
      },
      galleyButtonTitleStyle:{
        color:"orange",
        fontSize: 17,
        fontWeight:'bold',
      }
     

})
export default styles;