import React from 'react'
import { Text, View, ScrollView, StyleSheet } from "react-native";
import { Card, Avatar } from 'react-native-elements'
import { FlatList } from "react-native-gesture-handler";
import { useNavigation } from '@react-navigation/native';

const App = ({ data, input }) => {
    let keyExtractor = () => {
        return new Date().getTime().toString() + (Math.floor(Math.random() * Math.floor(new Date().getTime()))).toString();
    };
    const img = "https://www.freeiconspng.com/uploads/soccer-ball-icon-png-28.png";
    const navigation = useNavigation();
    return (
        <View>
            <FlatList style={{marginBottom:150}}
                keyExtractor={keyExtractor}
                data={data} renderItem={({ item }) => {
                    if (input === "") {
                        return (
                            <ScrollView>
                                <View style={[styles.cardContainer]}>
                                    <Card containerStyle={{ backgroundColor: '#EEEEEE', borderRadius: 10 }}>
                                        <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                                            <View style={{ flexDirection: 'row-reverse', }}>

                                                <View>
                                                    <Card.Title style={{ color: "#14274E", fontStyle: 'italic', fontWeight: "bold", fontSize: 18, maxWidth: 140, marginTop: 'auto', marginBottom: 'auto', marginLeft: 10 }}>
                                                        {item.name}</Card.Title>

                                                    <Card.Title style={{ color: "#8D93AB", fontWeight: "bold", fontSize: 12, maxWidth: 140, marginTop: 'auto', marginBottom: 'auto', marginRight: 'auto', marginLeft: 10 }}>~
                                                        {item.captain}</Card.Title>
                                                </View>
                                                <Avatar
                                                    rounded
                                                    source={{ uri: item.ImageUrl }}
                                                    size="large"
                                                    onPress={() => {
                                                        navigation.navigate("TeamDetailPage",
                                                            { teamName: item.name })
                                                    }}
                                                />

                                            </View>
                                            <View>
                                                <Text style={{ fontSize: 15, color: "black", textAlign: 'center', marginTop: 'auto', marginBottom: 'auto', borderWidth: 1, borderColor: '#FFA500', paddingHorizontal: 10, padding: 4, borderRadius: 6, backgroundColor: '#EEEEEE', marginRight: 20, }} onPress={() => {
                                                    navigation.navigate("TeamDetailPage",
                                                        { teamName: item.name })
                                                }}>Detay</Text>

                                            </View>
                                        </View>
                                    </Card>
                                </View>
                            </ScrollView>)
                    } else if (input.includes(item.name))
                        return (
                            <ScrollView>
                                <View style={styles.cardContainer}>
                                    <Card >
                                        <View style={{ flexDirection: "row", justifyContent: 'space-around' }}>
                                            <View style={{}}>
                                                <Card.Title style={{ color: "orange", fontWeight: "bold", fontSize: 20 }}>
                                                    {item.name}</Card.Title>

                                                <Avatar
                                                    rounded
                                                    source={{ uri: item.ImageUrl }}
                                                    size="large"
                                                    onPress={() => {
                                                        navigation.navigate("TeamDetailPage",
                                                            { teamName: item.name })
                                                    }}
                                                />
                                            </View>
                                            <View>
                                                <Text style={{ fontSize: 15, color: "black", textAlign: 'center', marginTop: 2 }} onPress={() => {
                                                    navigation.navigate("TeamDetailPage",
                                                        { teamName: item.name })
                                                }}>Detay</Text>

                                            </View>

                                        </View>



                                    </Card>

                                </View>
                            </ScrollView>)
                }
                }
            />
        </View>
    )
}
export default App

const styles = StyleSheet.create({
    textInput: {
        height: 40,
        borderWidth: 1,
        paddingLeft: 20, margin: 5,
        borderColor: "green",
    },

    cardContainer: {
        flex: 1,
        justifyContent: "space-around",
        flexDirection: "column",
    },
    memContainer: {

        alignSelf: "center", flexDirection: "row", padding: 10, borderRadius: 20,
        shadowOpacity: 90, backgroundColor: "#fff", elevation: 10,
        marginTop: 5, marginBottom: 5, width: "90%", justifyContent: "center"


    },
    bottomContainer: {
        marginTop: "0%",
        height: "0%",
        width: 400,
        backgroundColor: 'wheat',
        borderRadius: 50,
        borderBottomEndRadius: 50,
        alignItems: 'center',
        borderTopEndRadius: 50,
        flexDirection: "column",


    }, profile: {
        height: 150,
        width: 150,
        borderRadius: 20,
        bottom: "30%"
    },
    name: {
        fontSize: 20,
        color: "orange",
        fontWeight: "bold",
        bottom: "10%",
    },


})