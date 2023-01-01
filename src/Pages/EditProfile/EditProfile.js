import React from "react";
import { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    KeyboardAvoidingView,
    ScrollView
} from "react-native";
import Button from "../../Components/Button";
import styles from './EditProfile.style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomSheet from "../../Components/BottomSheets/BottomSheet";
import { Provider } from "react-native-paper";
import ImagePicker from 'react-native-image-crop-picker';
import EditProfileCard from "../../Components/EditProfileCard/EditProfileCard";

const EditProfile = ({ navigation }) => {

    const [image, setImage] = useState('https://pbs.twimg.com/media/FZukxoeUsAABmXt.jpg');

    const takePhotos = () => {
        ImagePicker.openCamera({
            compressImageMaxWidth: 300,
            compressImageMaxHeight: 400,
            cropping: true,
            compressImageQuality: 0.7,
        }).then(image => {
            console.log(image);
            setImage(image.path);
        });
    }

    const choosePhotos = () => {
        ImagePicker.openPicker({
            compressImageMaxWidth: 300,
            compressImageMaxHeight: 400,
            cropping: true,
            compressImageQuality: 0.7,
        }).then(image => {
            console.log(image);
        });

    }

    const [show, setshow] = useState(false);

    return (
        <Provider>
            <ScrollView>
                <View style={styles.container}>
                    <KeyboardAvoidingView behavior='position'>

                        <TouchableOpacity onPress={() => { setshow(true) }}>
                            <View style={styles.imageContainer}>
                                <ImageBackground source={{ uri: image }}
                                    style={{ height: 100, width: 100 }}
                                    imageStyle={{ borderRadius: 15 }}>
                                    <View style={{
                                        flex: 1,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                        <Icon name="camera" size={40} color={'#fff'} style={styles.ıconContainer} />
                                    </View>
                                </ImageBackground>
                            </View>
                        </TouchableOpacity>

                        <BottomSheet show={show} onDismiss={() => { setshow(false); }}>
                            <Text style={styles.TitleBottomSheetStyle}> Upload Photo</Text>
                            <Text style={styles.textBottomSheetStyle}> Choose your profile picture..</Text>

                            <TouchableOpacity style={styles.galleryButtonStyle} onPress={choosePhotos}>
                                <Text style={styles.galleyButtonTitleStyle}>
                                    Choose From Library</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.galleryButtonStyle} onPress={takePhotos}>
                                <Text style={styles.galleyButtonTitleStyle}>
                                    Take Photo</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.galleryButtonStyle} onPress={() => { setshow(false) }}>
                                <Text style={styles.galleyButtonTitleStyle}>
                                    Cancel</Text>
                            </TouchableOpacity>
                        </BottomSheet>

                        <EditProfileCard name="user" text="Surname" />
                        <EditProfileCard name="mail" text="E-mail" />
                        <EditProfileCard name="phone-call" text="Phone Number" />
                        <EditProfileCard name="map" text="City" />
                        <EditProfileCard name="users" text="Team Name" />
                        <EditProfileCard name="dribbble" text="field" />
                        <EditProfileCard name="more-vertical" text="Age,foot,weight,height(Pyshcial appearance)" />
                        <Button text={"Save"} theme={"secondary"} onPress={() => { navigation.goBack("ProfilePage") }} />
                    </KeyboardAvoidingView>
                </View>
            </ScrollView>




        </Provider>
    )
}
export default EditProfile;
