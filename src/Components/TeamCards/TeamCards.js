import React from "react";
import { View,Text,Image,TouchableOpacity, } from "react-native";
import styles from "./TeamCards.Style";

function Teams(props){

    return(
        <View style={styles.container}>
            <View style={styles.teams}>
            <TouchableOpacity>
                    <Image style={styles.image} source={{uri: props.team.imageUrl}} />
                    </TouchableOpacity>
                <View style={styles.inner_container}>
                    <Text style={styles.title}>{props.team.title}</Text>
                    <Text style={styles.captain}>{props.team.captain}</Text>
                </View>
                <View style={styles.touchable}>
                    <TouchableOpacity style={styles.offer}>
                        <Text style={styles.offerText}>{props.team.MatchButton}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Teams;