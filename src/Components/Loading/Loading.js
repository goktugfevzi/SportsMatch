import { StyleSheet, View, ActivityIndicator } from 'react-native'
import React from 'react'

const Loading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator style={styles.loading} size="large" color="white" />
    </View>
  )
}

export default Loading

const styles = StyleSheet.create({
    container:{
        flex:1,
        // backgroundColor:"#DAFAF8",
        backgroundColor:"#FCD63B",
        justifyContent:"center",
        alignItems:"center"
    },
    loading:{
        fontSize:30,
        color:"white",
        textAlign:"center"
    }
})