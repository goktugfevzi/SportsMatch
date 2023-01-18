
import { Text, SafeAreaView, View, Image, ImageBackground, TouchableOpacity,StyleSheet } from "react-native";
import styles from "./TeamDetailPage.style";
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore'
import { Provider } from "react-native-paper";
import BottomSheet from '../../Components/detailBottomSheet/DetailBottomSheet'
import Storage from "@react-native-firebase/storage";
import Icon from "react-native-vector-icons/Ionicons";

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
            setImageUrl('https://pbs.twimg.com/media/FZukxoeUsAABmXt.jpg')
        }

    }



    return (
        <Provider>
            <SafeAreaView>
                {team.map(
                    (teams, index) => {
                        return (
                            <View key={index}>
                                <View>
                                <Image source={require("../../assets/deneme3.jpg")} style={StyleSheet.absoluteFillObject}  blurRadius={1} /></View>
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
                        if (mem.isCaptain) {
                            return (
                                <View key={mem.id} style={{alignItems:'center',}} >
                                <Image style={{ width: 150, height: 150,borderRadius:75,marginTop:20 }} source={{ uri: imageUrl }} />
                                <View>
                                    <Text style={{fontSize:12,marginTop:8,fontStyle:'italic', color:"gray"}}>{mem.email}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
                                    <View style={{ flex: 1, height: 2, backgroundColor: 'orange' }} />
                                    <View>
                                        <Text style={{ width: 170, textAlign: 'center', fontWeight: 'bold', color: '#006400' }}>Oyuncu Profili</Text>
                                    </View>
                                    <View style={{ flex: 1, height: 2, backgroundColor: 'orange' }} />
                                </View>

                                <View style={{marginLeft:50,marginTop:30}}>
                                    <View style={styles.person}>
                                        <Text style={styles.info}>      Ad :</Text>
                                        <View style={{ flexDirection: 'row', marginLeft: '15%' }}>
                                            <View style={{ flexDirection: 'row', }}>
                                                <Icon name="ios-person" size={20} color="#006400" />
                                                <Text style={styles.info}>{mem.Name}</Text>
                                            </View>
                                        </View>
                                    </View>

                                    <View style={styles.person}>
                                        <Text style={styles.info}>  Şehir :</Text>
                                        <View style={{ flexDirection: 'row', marginLeft: '15%' }}>
                                            <Icon name="business" size={20} color="#006400" />
                                            <Text style={styles.info}> {mem.City}</Text>
                                        </View>
                                    </View>

                                    <View style={styles.person}>
                                        <Text style={styles.info}>    Boy :</Text>
                                        <View style={{ flexDirection: 'row', marginLeft: '15%' }}>
                                            <Icon name="md-ellipsis-vertical" size={20} color="#006400" />
                                            <Text style={styles.info}> {mem.Height}</Text>
                                        </View>
                                    </View>

                                    <View style={styles.person}>
                                        <Text style={styles.info}>    Kilo :</Text>
                                        <View style={{ flexDirection: 'row', marginLeft: '15%' }}>
                                            <Icon name="ios-barbell-sharp" size={20} color="#006400" />
                                            <Text style={styles.info}> {mem.Weight}</Text>
                                        </View>
                                    </View>

                                    <View style={styles.person}>
                                        <Text style={styles.info}>Takım :</Text>
                                        <View style={{ flexDirection: 'row', marginLeft: '15%' }}>
                                            <Icon name="shirt" size={20} color="#006400" />
                                            <Text style={styles.info}>{!(mem.Team) ? "Takımı Yok" : mem.Team}</Text>
                                        </View>
                                    </View>

                                    <View style={styles.person}>
                                        <Text style={styles.info}>Mevki :</Text>
                                        <View style={{ flexDirection: 'row', marginLeft: '15%' }}>
                                            <Icon name="ios-football-sharp" size={20} color="#006400" />
                                            <Text style={styles.info}> {mem.Position}</Text>
                                        </View>
                                    </View>

                                    <View style={styles.person}>
                                        <Text style={styles.info}>    Yaş :</Text>
                                        <View style={{ flexDirection: 'row', marginLeft: '15%' }}>
                                            <Icon name="calendar-sharp" size={20} color="#006400" />
                                            <Text style={styles.info}> {mem.Age}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            )
                        }
                        else {
                            return (
                                <View key={mem.id} style={{alignItems:'center',}} >
                                <Image style={{ width: 150, height: 150,borderRadius:75,marginTop:20 }} source={{ uri: imageUrl }} />
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
                                    <View style={{ flex: 1, height: 2, backgroundColor: 'orange' }} />
                                    <View>
                                        <Text style={{ width: 170, textAlign: 'center', fontWeight: 'bold', color: '#006400' }}>Oyuncu Profili</Text>
                                    </View>
                                    <View style={{ flex: 1, height: 2, backgroundColor: 'orange' }} />
                                </View>

                                <View style={{marginLeft:50,marginTop:30}}>
                                    <View style={styles.person}>
                                        <Text style={styles.info}>      Ad :</Text>
                                        <View style={{ flexDirection: 'row', marginLeft: '15%' }}>
                                            <View style={{ flexDirection: 'row', }}>
                                                <Icon name="ios-person" size={20} color="#006400" />
                                                <Text style={styles.info}>{mem.Name}</Text>
                                            </View>
                                        </View>
                                    </View>

                                    <View style={styles.person}>
                                        <Text style={styles.info}>  Şehir :</Text>
                                        <View style={{ flexDirection: 'row', marginLeft: '15%' }}>
                                            <Icon name="business" size={20} color="#006400" />
                                            <Text style={styles.info}> {mem.City}</Text>
                                        </View>
                                    </View>

                                    <View style={styles.person}>
                                        <Text style={styles.info}>    Boy :</Text>
                                        <View style={{ flexDirection: 'row', marginLeft: '15%' }}>
                                            <Icon name="md-ellipsis-vertical" size={20} color="#006400" />
                                            <Text style={styles.info}> {mem.Height}</Text>
                                        </View>
                                    </View>

                                    <View style={styles.person}>
                                        <Text style={styles.info}>    Kilo :</Text>
                                        <View style={{ flexDirection: 'row', marginLeft: '15%' }}>
                                            <Icon name="ios-barbell-sharp" size={20} color="#006400" />
                                            <Text style={styles.info}> {mem.Weight}</Text>
                                        </View>
                                    </View>

                                    <View style={styles.person}>
                                        <Text style={styles.info}>Takım :</Text>
                                        <View style={{ flexDirection: 'row', marginLeft: '15%' }}>
                                            <Icon name="shirt" size={20} color="#006400" />
                                            <Text style={styles.info}>{!(mem.Team) ? "Takımı Yok" : mem.Team}</Text>
                                        </View>
                                    </View>

                                    <View style={styles.person}>
                                        <Text style={styles.info}>Mevki :</Text>
                                        <View style={{ flexDirection: 'row', marginLeft: '15%' }}>
                                            <Icon name="ios-football-sharp" size={20} color="#006400" />
                                            <Text style={styles.info}> {mem.Position}</Text>
                                        </View>
                                    </View>

                                    <View style={styles.person}>
                                        <Text style={styles.info}>    Yaş :</Text>
                                        <View style={{ flexDirection: 'row', marginLeft: '15%' }}>
                                            <Icon name="calendar-sharp" size={20} color="#006400" />
                                            <Text style={styles.info}> {mem.Age}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            )
                        }
                    })}
                </BottomSheet>
            </View>
        </Provider>
    );
}

export default TeamDetailPage;

