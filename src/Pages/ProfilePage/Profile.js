import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, View, Image } from "react-native";
import styles from "./profile.style";
import Button from "../../Components/Button";
import firestore from "@react-native-firebase/firestore";
import auth from '@react-native-firebase/auth'
import storage from '@react-native-firebase/storage';

function Profile({ navigation }) {
    const [imageName, setImageName] = useState('https://pbs.twimg.com/media/FZukxoeUsAABmXt.jpg');
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState('')

    useEffect(() => {
        firestore()
            .collection('users')
            .doc(auth().currentUser.uid)
            .get().then((doc) => {
                setUser(doc.data())
            });
        storage().ref('userImage/' + auth().currentUser.uid)
            .getDownloadURL()
            .then((url) => {
                setImageName({ profileImageUrl: url });
            })
            .catch((e) => console.log('getting downloadURL of image error => ', e));
        navigation.addListener("focus", () => setLoading(!loading));
    }, [navigation, loading]);
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.person_container}>
                <Image source={{uri : imageName.profileImageUrl}} style={styles.image} />
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
                <Text style={styles.info}>{user.Description}</Text>
            </View>
            <Button color={"#fff"} icon={"account-edit"}
                onPress={() => navigation.navigate('Edit', { userToUpdate: user })} />
            <View>
                <Button theme="tertiary" size={15} icon={"logout"} onPress={() => { auth().signOut() }}></Button></View>
        </SafeAreaView>
    )
}

export default Profile;