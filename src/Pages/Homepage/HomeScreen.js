import React from "react";
import { FlatList, SafeAreaView, View } from "react-native";
import styles from "./homeSreen.style";
import teamData from '../../team-data.json';
import Teams from "../../Components/TeamCards";

function HomeScreen(){
    const text = "Maç Bul";
    const returnItem = ({item}) => {item.MatchButton=text; return(<Teams team={item}/>)}

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