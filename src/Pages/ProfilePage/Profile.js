import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, View, Image, StyleSheet} from "react-native";
import styles from "./profile.style";
import Button from "../../Components/Button";
import firestore from "@react-native-firebase/firestore";
import auth from '@react-native-firebase/auth'
import storage from '@react-native-firebase/storage';
import Icon from 'react-native-vector-icons/Ionicons';
import Input from "../../Components/LoginInput/Input";

function Profile({ navigation }) {
    const [imageName, setImageName] = useState('https://pbs.twimg.com/media/FZukxoeUsAABmXt.jpg');
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState('')

    useEffect(() => {
        setLoading(true);
        firestore()
            .collection('users')
            .doc(auth().currentUser.uid)
            .get().then((doc) => {
                setUser(doc.data())
            });
            console.log(user);
        storage().ref('userImage/' + auth().currentUser.uid)
            .getDownloadURL()
            .then((url) => {
                if(url){
                setImageName( url );}
            })
            .catch((e) => console.log('getting downloadURL of image error => ', e));
            setLoading(false);
        navigation.addListener("focus", () => setLoading(!loading));
        setLoading(false);
    }, [navigation, loading]);
    return (
        <SafeAreaView style={styles.container}>
                                <Image source={require("../../assets/deneme3.jpg")} style={StyleSheet.absoluteFillObject}  blurRadius={7} />
            <View style={styles.person_container}>
                <Image source={{ uri: imageName }} style={styles.image} />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 14 }}>
                <View style={{ flex: 1, height: 2, backgroundColor: 'orange' }} />
                <View>
                    <Text style={{ width: 170, textAlign: 'center', fontWeight: 'bold', color: '#006400' }}>Oyuncu Profili</Text>
                </View>
                <View style={{ flex: 1, height: 2, backgroundColor: 'orange' }} />
            </View>
            <View style={styles.inner_container}>
                <View style={styles.person}>
                    <Text style={styles.info}>      Ad :</Text>
                    <View style={{ flexDirection: 'row', marginLeft: '29%' }}>
                        <View style={{ flexDirection: 'row', }}>
                            <Icon name="ios-person" size={20} color="#006400" />
                            <Text style={styles.info}>{user.Name}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.person}>
                    <Text style={styles.info}>  Şehir :</Text>
                    <View style={{ flexDirection: 'row', marginLeft: '29%' }}>
                        <Icon name="business" size={20} color="#006400" />
                        <Text style={styles.info}> {user.City}</Text>
                    </View>
                </View>

                <View style={styles.person}>
                    <Text style={styles.info}>    Boy :</Text>
                    <View style={{ flexDirection: 'row', marginLeft: '29%' }}>
                        <Icon name="md-ellipsis-vertical" size={20} color="#006400" />
                        <Text style={styles.info}> {user.Height}</Text>
                    </View>
                </View>

                <View style={styles.person}>
                    <Text style={styles.info}>    Kilo :</Text>
                    <View style={{ flexDirection: 'row', marginLeft: '29%' }}>
                        <Icon name="ios-barbell-sharp" size={20} color="#006400" />
                        <Text style={styles.info}> {user.Weight}</Text>
                    </View>
                </View>

                <View style={styles.person}>
                    <Text style={styles.info}>Takım :</Text>
                    <View style={{ flexDirection: 'row', marginLeft: '29%' }}>
                        <Icon name="shirt" size={20} color="#006400" />
                        <Text style={styles.info}>{!(user.Team) ? "Takımı Yok" : user.Team}</Text>
                    </View>
                </View>

                <View style={styles.person}>
                    <Text style={styles.info}>Mevki :</Text>
                    <View style={{ flexDirection: 'row', marginLeft: '29%' }}>
                        <Icon name="ios-football-sharp" size={20} color="#006400" />
                        <Text style={styles.info}> {user.Position}</Text>
                    </View>
                </View>

                <View style={styles.person}>
                    <Text style={styles.info}>    Yaş :</Text>
                    <View style={{ flexDirection: 'row', marginLeft: '29%' }}>
                        <Icon name="calendar-sharp" size={20} color="#006400" />
                        <Text style={styles.info}> {user.Age}</Text>
                    </View>
                </View>

            </View>
            <View style={styles.text_container}> 
            {(user.Description)?  <Text style={styles.text_style_true}>{user.Description}</Text>:  <Text style={styles.text_style_false}>{"Kendinizi Tanıtınız.."}</Text>}
             </View>
            
            <Button color={"#fff"} icon={"account-edit"}
                onPress={() => navigation.navigate('Edit', { userToUpdate: user })} />
            <View>
                <Button theme="tertiary" size={15} icon={"logout"} onPress={() => { auth().signOut() }}></Button></View>
        </SafeAreaView>
    )
}

export default Profile;