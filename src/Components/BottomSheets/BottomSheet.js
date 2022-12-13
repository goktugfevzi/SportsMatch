import React, { useEffect, useRef, useState } from "react";
import { Animated,Dimensions ,StyleSheet} from "react-native";
import { View } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import { IconButton, Portal } from "react-native-paper";
import styles from "./BottomSheetsStyle";

 const BottomSheet=({show,onDismiss,children})=>{

   const bottomSheetHeight=Dimensions.get('window').height*0.4;
   const deviceWidth=Dimensions.get('window').width;
   const [open,setOpen]=useState(show);
   const bottom=useRef(new Animated.Value(-bottomSheetHeight)).current;

    useEffect(()=>{
        if(show){
            setOpen(show);
            Animated.timing(bottom,{
                toValue:0,
                duration:500,
                useNativeDriver:false,
           }).start();
        }
        else{
            Animated.timing(bottom,{
                toValue:-bottomSheetHeight,
                duration:500,
                useNativeDriver:false,
            }).start(()=>{
                setOpen(false);
            });
        }
    },[show])
    if(!open){
        return null;
    }
   
    return(
        <Portal>
            <Animated.View style={[styles.root, {height:bottomSheetHeight,bottom:bottom,
            shadowOffset:{
            height:-3,
            width:0,
        }},styles.common]}>
        <PanGestureHandler >
                <View style={[styles.header,styles.common,{shadowOffset:{height:3}}]}>
                    <View  style={styles.ViewTwo}/>
                <IconButton color='#fff' icon="close" style={styles.closeIcon} onPress={onDismiss}/>
                </View>
        </PanGestureHandler>
                {children}
            </Animated.View>
         </Portal>
    );
 }

 export default BottomSheet;