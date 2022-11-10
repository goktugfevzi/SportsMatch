import React from "react";
import { Text, View,Image } from "react-native";
import styles from "./teamPage.style";

function TeamPage(){
    return(
        <View style={styles.container}>
            <View style={styles.team_container}>
                <Image style={styles.image} source={{uri:'https://ankaragucu.org.tr/wp-content/uploads/2018/06/MKE_Ankarag%C3%BCc%C3%BC_logo.png'}}/>
                <Text style={styles.title}>MKE Ankaragücü</Text>
            </View>
            <View style={styles.inner_container}>
                <View style={styles.members_container}>
                    <View style={styles.members}>
                    <Image style={styles.memberImage} source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFIfHUbDgTWTFXPYBYXJynVvhyUvAfM0OXNQ&usqp=CAU'}}/>
                    <Text style={styles.title}>Panter Necmi</Text>
                    </View>
                    <View style={styles.members}>
                    <Image style={styles.memberImage} source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFIfHUbDgTWTFXPYBYXJynVvhyUvAfM0OXNQ&usqp=CAU'}}/>
                    <Text style={styles.title}>Panter Necmi</Text>
                    </View>
                    <View style={styles.members}>
                    <Image style={styles.memberImage} source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFIfHUbDgTWTFXPYBYXJynVvhyUvAfM0OXNQ&usqp=CAU'}}/>
                    <Text style={styles.title}>Panter Necmi</Text>
                    </View>
                    <View style={styles.members}>
                    <Image style={styles.memberImage} source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFIfHUbDgTWTFXPYBYXJynVvhyUvAfM0OXNQ&usqp=CAU'}}/>
                    <Text style={styles.title}>Panter Necmi</Text>
                    </View>
                    <View style={styles.members}>
                    <Image style={styles.memberImage} source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFIfHUbDgTWTFXPYBYXJynVvhyUvAfM0OXNQ&usqp=CAU'}}/>
                    <Text style={styles.title}>Panter Necmi</Text>
                    </View>
                    <View style={styles.members}>
                    <Image style={styles.memberImage} source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFIfHUbDgTWTFXPYBYXJynVvhyUvAfM0OXNQ&usqp=CAU'}}/>
                    <Text style={styles.title}>Panter Necmi</Text>
                    </View>
                     <View style={styles.members}>
                    <Image style={styles.memberImage} source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFIfHUbDgTWTFXPYBYXJynVvhyUvAfM0OXNQ&usqp=CAU'}}/>
                    <Text style={styles.title}>Panter Necmi</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default TeamPage;