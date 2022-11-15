import React, { useState } from "react";
import { FlatList, SafeAreaView, View } from "react-native";
import styles from "./searchTeam.style";
import teamData from '../../team-data.json';
import Teams from "../../Components/TeamCards";
import SearchInput from "../../Components/SearchInput";

function SearchTeam() {

    const [team, SetTeam] = useState(teamData)
    const text = "Takım Detayları";
    const returnItem = ({ item }) => { item.MatchButton = text; return (<Teams team={item} />) }

    const changeText = (text) => {
        const filteredTeam = teamData.filter(team => {
            const searchText = text.toLowerCase();
            const currentTitle = team.title.toLocaleLowerCase();
            return currentTitle.indexOf(searchText) > -1;
        })
        SetTeam(filteredTeam);
    }

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <SearchInput search={changeText} />
                <FlatList
                    data={team}
                    renderItem={returnItem}
                    ItemSeparatorComponent={<View style={styles.seperator} />}
                />
            </View>
        </SafeAreaView>
    )
}

export default SearchTeam;