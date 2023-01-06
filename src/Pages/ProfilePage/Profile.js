import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, View, Image } from "react-native";
import styles from "./profile.style";
import Button from "../../Components/Button";
import firestore from "@react-native-firebase/firestore";
import auth from '@react-native-firebase/auth'

function Profile({navigation}) {
    const [user, setUser] = useState('')
    useEffect(() => {
        firestore()
            .collection('users')
            .doc(auth().currentUser.uid)
            .get().then((doc) => {
                setUser(doc.data())
            });
    }, []);
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.person_container}>
                <Image style={styles.image} source={{ uri: 'https://pbs.twimg.com/media/FZukxoeUsAABmXt.jpg' }} />
                <Text style={styles.title}></Text>
            </View>
            <View style={styles.inner_container}>
                <Text style={styles.info}> Ad         :  {user.Name}  </Text>
                <Text style={styles.info}> Şehir :     {user.City}</Text>
                <Text style={styles.info}> Boy       :    {user.Weight}</Text>
                <Text style={styles.info}> Kilo       :     {user.Height}</Text>
                <Text style={styles.info}> Takım   :     {!(user.Team) ? "Takımı Yok" : user.Team}</Text>
                <Text style={styles.info}> Mevki   :     {user.Position}</Text>
                <Text style={styles.info}> Yaş       :     {user.Age}  </Text>
            </View>
            <View style={styles.description}>
            </View>
            <Button icon={"account-edit"}
              onPress={() => navigation.navigate('Edit',{userToUpdate: user})} />
        </SafeAreaView>
    )
}

export default Profile;