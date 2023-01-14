
import { Text, SafeAreaView, View, Image, ImageBackground, TouchableOpacity } from "react-native";
import styles from "./TeamDetailPage.style";
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore'
import { Provider } from "react-native-paper";
import BottomSheet from '../../Components/detailBottomSheet/DetailBottomSheet'
import Storage from "@react-native-firebase/storage";

function TeamDetailPage({ navigation, route }) {

    const [show, setshow] = useState(false);
    const [team, setTeam] = useState([])
    const [loading, setLoading] = useState(false)
    const [member, setmember] = useState([])
    const [imageUrl, setImageUrl] = useState();


    //useeffect
    useEffect(() => {
        searchTeam(route.params.teamName)
        // console.log(route.params.teamName + 'benbir praramsıım')
        navigation.addListener("focus", () =>
            setLoading(!loading));
    }, [navigation, loading])



    //Takım Arama
    const searchTeam = async (search) => {//Sorgu
        const collection = await firestore().collection('Teams').where('name', '==', search).limit(1).get()
        console.log(collection.docs)
        setTeam(
            collection.docs.map((doc) => {
                return { ...doc.data(), id: doc.id }
            })
        )
    }




    const searchMem = async (name) => {//Sorgu
        const collection = await firestore().collection('users').where('Name', '==', name).get()
        //console.log(collection.docs)
        try {
            if (collection !== "") {
                setmember(
                    collection.docs.map((doc) => {
                        return { ...doc.data(), id: doc.id }
                    })
                )
            }


        } catch (error) {

            console.log(error)
        }

    }
    const img = "https://as2.ftcdn.net/v2/jpg/01/26/61/13/1000_F_126611337_m8kcRtS5G7AhrFpOQ0Wufx4PgL6J4yxg.jpg"

    //Fotoğraf cekme
    const func = async (use) => {
        try {
            console.log("aaa")
            // console.log(Storage().ref)
            const reference = await Storage().ref('userImage/' + use).getDownloadURL()
            //console.log(reference)
            if (reference !== null) {
                setImageUrl(reference)
            }
        } catch (error) {
            console.log(error)
            setImageUrl(img)
        }

    }

   

    return (
        <Provider>
            <SafeAreaView>
                {team.map(
                    teams => {
                        return (
                            <View key={teams.id}>
                                <View style={styles.team_container}>
                                    <Image style={styles.image} source={{ uri: teams.ImageUrl }} />
                                    <Text style={styles.title}>{teams.name}</Text>
                                </View>
                                <View style={styles.inner_container}>
                                    <ImageBackground source={require("../../assets/Soccer_Field_Transparant.svg.png")} resizeMode="stretch" style={styles.backgroundimage} />

                                    <View style={styles.members_container}>
                                        <View style={styles.forvet}>
                                            <TouchableOpacity onPress={() => {
                                                names = teams.captain
                                                searchMem(names)
                                                setshow(true)
                                            }}>

                                                <Image style={styles.memberImage} source={{ uri: img }} />
                                                <Text style={styles.memberText}>{teams.captain}</Text>
                                            </TouchableOpacity>
                                        </View>

                                        <View style={styles.ortasaha}>
                                            <View style={styles.members}>
                                                <TouchableOpacity onPress={() => {
                                                    if (teams.mem1) {
                                                        names = teams.mem1
                                                        searchMem(names)
                                                        setshow(true)
                                                    }
                                                }}>

                                                    <Image style={styles.memberImage} source={{ uri: img }} />
                                                    <Text style={styles.memberText}>{teams.mem1}</Text>
                                                </TouchableOpacity>
                                            </View>

                                            <View style={styles.members}>
                                                <TouchableOpacity onPress={() => {
                                                    if (teams.mem2) {
                                                        names = teams.mem2
                                                        searchMem(names)
                                                        setshow(true)
                                                    }
                                                }}>
                                                    <Image style={styles.memberImage} source={{ uri: img }} />
                                                    <Text style={styles.memberText}>{teams.mem2}</Text>
                                                </TouchableOpacity>
                                            </View>

                                        </View>

                                        <View style={styles.defans}>
                                            <View style={styles.members}>
                                                <TouchableOpacity onPress={() => {
                                                    if (teams.mem3) {
                                                        names = teams.mem3
                                                        searchMem(names)
                                                        setshow(true)
                                                    }
                                                }}>
                                                    <Image style={styles.memberImage} source={{ uri: img }} />
                                                    <Text style={styles.memberText}>{teams.mem3}</Text>
                                                </TouchableOpacity>
                                            </View>
                                            <View style={styles.members}>
                                                <TouchableOpacity onPress={() => {
                                                    if (teams.mem4) {
                                                        names = teams.mem4
                                                        searchMem(names)
                                                        setshow(true)
                                                    }
                                                }}>
                                                    <Image style={styles.memberImage} source={{ uri: img }} />
                                                    <Text style={styles.memberText}>{teams.mem4}</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>

                                        <View style={styles.kaleci}>
                                            <TouchableOpacity onPress={() => {
                                                if (teams.mem5) {
                                                    names = teams.mem5
                                                    searchMem(names)
                                                    setshow(true)
                                                }
                                            }}>
                                                <Image style={styles.memberImage} source={{ uri: img }} />
                                                <Text style={styles.memberText}>{teams.mem5}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>)
                    })}
            </SafeAreaView>
            <View>
                <BottomSheet show={show} onDismiss={() => { setshow(false); }}>

                    {member.map(mem => {

                        func(mem.id)

                        //console.log(mem.id)
                        //console.log("/userImage/"+mem.id)
                        return (

                            <View style={{ alignItems: "center" }}>

                                <Image style={{ width: 200, height: 200 }} source={{ uri: imageUrl }} />

                                <Text style={{ fontSize: 25, color: "black", fontWeight: "bold", padding: 10 }}>{mem.Name}</Text>


                                <View style={styles.memContainer}>
                                    <Text style={{ fontSize: 15, color: "gray", fontWeight: "bold" }} > Age:{mem.Age}</Text>

                                </View >
                                <View style={styles.memContainer}>
                                    <Text style={{ fontSize: 15, color: "gray", fontWeight: "bold" }} >City: {mem.City}</Text>
                                </View>
                                <View style={styles.memContainer}>
                                    <Text style={{ fontSize: 15, color: "gray", fontWeight: "bold" }} >Description: {mem.Description}</Text>
                                </View>
                                <View style={styles.memContainer}>
                                    <Text style={{ fontSize: 15, color: "gray", fontWeight: "bold" }} >Height: {mem.Height}</Text>
                                </View>
                                <View style={styles.memContainer}>
                                    <Text style={{ fontSize: 15, color: "gray", fontWeight: "bold" }} >Team:{mem.Team}</Text>
                                </View>
                                <View style={styles.memContainer}>
                                    <Text style={{ fontSize: 15, color: "gray", fontWeight: "bold" }} >Position: {mem.Position}</Text>
                                </View>
                                <View style={styles.memContainer}>
                                    <Text style={{ fontSize: 15, color: "gray", fontWeight: "bold" }} >Weight: {mem.Weight}</Text>
                                </View>
                                <View style={styles.memContainer}>
                                    <Text style={{ fontSize: 15, color: "gray", fontWeight: "bold" }} >id: {mem.id}</Text>
                                </View>


                            </View>


                        )
                    }
                    )

                    }
                </BottomSheet>
            </View>


        </Provider>


    );



}

export default TeamDetailPage;