import React from "react";
import { FlatList, SafeAreaView, View } from "react-native";
import styles from "./homeSreen.style";
import teamData from '../../team-data.json';
import Teams from "../../Components/TeamCards";

function HomeScreen(){

    const returnItem = ({item}) => <Teams team={item} MatchButton={"Maç İsteği"}/>
    return(
        <SafeAreaView>
            <View style={styles.container}>
               <FlatList 
                data={teamData} 
                renderItem={returnItem}
                ItemSeparatorComponent = {<View style={styles.seperator}/>}
               /> 
            </View>
        </SafeAreaView>
    )
}

export default HomeScreen;