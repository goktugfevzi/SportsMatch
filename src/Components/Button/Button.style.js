import {Dimensions, StyleSheet} from 'react-native';
import colors from "../../styles/colors"

const base_style = StyleSheet.create({
  container: {
    padding: 8,
    margin: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent:'center',  
  },
  button_container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft:'auto',
    marginRight:'auto'
  },
  title: {
    marginLeft: 5,
    fontWeight: 'bold',
    fontSize: 17,
    color:"#fff"
  },
});

export default {
  primary: StyleSheet.create({
      ...base_style,
    container: {
      ...base_style.container,
      backgroundColor: colors.darkgreen,
    },
    title: {
      ...base_style.title,
      color: '#fff',
    },
  }),
  secondary: StyleSheet.create({
    ...base_style,
    container: {
      ...base_style.container,
      backgroundColor: '#fff',
      borderColor: colors.darkgreen,
      borderWidth:1,
    },
    title: {
      ...base_style.title,
      color: '#00897b',
    },
  }),
  tertiary: StyleSheet.create({
    ...base_style,
    container: {
      marginLeft:'auto',
      marginRight:'auto',
      backgroundColor: '#fff',
      borderColor: colors.darkgreen,
      borderWidth:1,
      width: Dimensions.get('window').width/7,
      ...base_style.container,
      justifyContent: "center",
      alignItems: "center",
    },
    title: {
      justifyContent: "center",
      alignItems: "center",
      ...base_style.title,
      color: '#00897b',
    },
  }),
};
