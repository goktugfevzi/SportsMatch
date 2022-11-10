import React, {useState} from "react";
import { SafeAreaView,Text,View,Image, TextInput } from "react-native";
import styles from "./profile.style";

function Profile(){

    const [text,SetText] = useState(null)

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.person_container}>
                <Image style={styles.image} source={{uri:'https://pbs.twimg.com/media/FZukxoeUsAABmXt.jpg'}} />
                <Text style={styles.title}>Cristiano Ronaldo</Text>
            </View>
            <View style={styles.inner_container}>
                <Text style={styles.info}> Ad         :     Cristiano</Text>
                <Text style={styles.info}> Soyad   :     Ronaldo</Text>
                <Text style={styles.info}> Konum :     İngiltere</Text>
                <Text style={styles.info}> Boy       :     185 cm</Text>
                <Text style={styles.info}> Kilo       :     76 Kg</Text>
                <Text style={styles.info}> Ayak     :     Sağ</Text>
                <Text style={styles.info}> Takım   :     Manchester United</Text>
                <Text style={styles.info}> Mevki   :     Forvet-Santrafor</Text>
                <Text style={styles.info}> Yaş       :     37  </Text>
                <Text style={styles.info}> Tel no   :    0505 547 86 38</Text>
            </View>
            <View style={styles.description}>
                <TextInput style={styles.descriptionText} onChangeText={SetText} placeholder='Oyuncu Bio'/>
            </View>
        </SafeAreaView>
    )
}

export default Profile;