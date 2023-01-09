import React from "react";
import { Text, View, Image, ImageBackground} from "react-native";
import styles from "./TeamPage.style";
import FloatingButton from "../../Components/FloatingButton";
import { Button } from "react-native-paper";

function TeamPage({ navigation }) {

    const FloatingButtonPress = () => {
        navigation.navigate('TeamTabTop');
    }
    return (
        <View style={styles.container}>
            <FloatingButton onPress={()=> FloatingButtonPress()} icon={"plus"}/>
            <View style={styles.team_container}>
                <Image style={styles.image} source={{ uri: 'https://ankaragucu.org.tr/wp-content/uploads/2018/06/MKE_Ankarag%C3%BCc%C3%BC_logo.png' }} />
                <Text style={styles.title}>MKE Ankaragücü</Text>
            </View>
            <View style={styles.inner_container}>
            <ImageBackground source={require("../../assets/Soccer_Field_Transparant.svg.png")} resizeMode="stretch" style={styles.backgroundimage}/>
                <View style={styles.members_container}>
                    

                    <View style={styles.forvet}>
                        <Image style={styles.memberImage} source={{ uri: 'https://img.a.transfermarkt.technology/portrait/header/7043-1483915677.png?lm=1' }} />
                        <Text style={styles.memberText}>Semih Şentürk</Text>
                    </View>


                    <View style={styles.ortasaha}>
                        <View style={styles.members}>
                            <Image style={styles.memberImage} source={{ uri: 'https://img.a.transfermarkt.technology/portrait/header/236471-1629383707.png?lm=1' }} />
                            <Text style={styles.memberText}>Ozan Tufan</Text>
                        </View>
                        <View style={styles.members}>
                        <   Image style={styles.memberImage} source={{ uri: 'https://img.a.transfermarkt.technology/portrait/header/126414-1663572427.jpg?lm=1' }} />
                            <Text style={styles.memberText}>Hakan Çalhanoğlu</Text>
                        </View>
                    </View>

                    <View style={styles.defans}>
                    <View style={styles.members}>
                        <Image style={styles.memberImage} source={{ uri: 'https://img.a.transfermarkt.technology/portrait/header/340879-1655706148.jpg?lm=1' }} />
                        <Text style={styles.memberText}>Merih Demiral</Text>
                    </View>
                    <View style={styles.members}>
                        <Image style={styles.memberImage} source={{ uri: 'https://img.a.transfermarkt.technology/portrait/header/320141-1662367296.jpg?lm=1' }} />   
                        <Text style={styles.memberText}>Çağlar Söyüncü</Text>
                    </View>
                    </View>
               
                    <View style={styles.kaleci}>
                        <Image style={styles.memberImage} source={{ uri: 'https://img.a.transfermarkt.technology/portrait/header/500091-1667035726.png?lm=1' }} />
                        <Text style={styles.memberText}>Ersin Korkut</Text>
                    </View>
                </View>
                <Button title="TeamEditPage" onPress={()=>{
    navigation.navigate("TeamEditPage")
}}/>
            </View>
        </View>
    )
}
export default TeamPage;