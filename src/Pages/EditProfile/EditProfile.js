// import React from "react";
// import { useState, useEffect } from "react";
// import {
//     View,
//     Text,
//     TouchableOpacity,
//     ImageBackground,
//     KeyboardAvoidingView,
//     ScrollView
// } from "react-native";
// import Button from "../../Components/Button";
// import { Formik } from 'formik';
// import styles from './EditProfile.style';
// import { showMessage } from 'react-native-flash-message';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import BottomSheet from "../../Components/BottomSheets/BottomSheet";
// import { Provider } from "react-native-paper";
// import ImagePicker from 'react-native-image-crop-picker';
// import EditProfileCard from "../../Components/EditProfileCard/EditProfileCard";
// import auth from "@react-native-firebase/auth";
// import firestore from "@react-native-firebase/firestore"
// const initialFormValues = {
//     Name: userToUpdate.Name,
//     Age: userToUpdate.Age,
//     Height: userToUpdate.Height,
//     Weight: userToUpdate.Weight,
//     hasTeam: userToUpdate.hasTeam,
//     isCaptain: userToUpdate.isCaptain,
//     City: userToUpdate.City,
//     Position: userToUpdate.Position,
//     Team: userToUpdate.Team,
//     Description: userToUpdate.Description
// }
// const EditProfile = ({ navigation, route }) => {
//    const { userToUpdate } = route.params
   
//     const [loading, setLoading] = useState(false);
//     const handleFormSubmit = async formValues => {
//         try {
//             setLoading(true);
//             await firestore().collection('users').doc(auth().currentUser.uid).update({
//                 Name: formValues.Name,
//                 Age: formValues.Age,
//                 Height: formValues.Height,
//                 Weight: formValues.Weight,
//                 hasTeam: false,
//                 isCaptain: false,
//                 City: formValues.City,
//                 Position: formValues.Position,
//                 Team: formValues.Team,
//                 Description: formValues.Description,
//             })
//             navigation.goBack("ProfilePage")
//         } catch (error) { console.log(error) }
//     }
//     setLoading(false);
//     showMessage({
//         message: 'Güncelleme işlemi başarıyla tamamlandı',
//         type: 'success',
//     });
//     const [image, setImage] = useState('https://pbs.twimg.com/media/FZukxoeUsAABmXt.jpg');
//     // PROFILE IMAGE 
//     const takePhotos = () => {
//         ImagePicker.openCamera({
//             compressImageMaxWidth: 300,
//             compressImageMaxHeight: 400,
//             cropping: true,
//             compressImageQuality: 0.7,
//         }).then(image => {
//             console.log(image);
//             setImage(image.path);
//         });
//     }
//     const choosePhotos = () => {
//         ImagePicker.openPicker({
//             compressImageMaxWidth: 300,
//             compressImageMaxHeight: 400,
//             cropping: true,
//             compressImageQuality: 0.7,
//         }).then(image => {
//             console.log(image);
//         });
//     }
//     const [show, setshow] = useState(false);
//     // PROFILE IMAGE 


//     return (
//         <Provider>
//             <ScrollView>
//                 <View style={styles.container}>
//                     <KeyboardAvoidingView behavior='position'>
//                         {/* PROFILE IMAGE  */}
//                         <TouchableOpacity onPress={() => { setshow(true) }}>
//                             <View style={styles.imageContainer}>
//                                 <ImageBackground source={{ uri: image }}
//                                     style={{ height: 100, width: 100 }}
//                                     imageStyle={{ borderRadius: 15 }}>
//                                     <View style={{
//                                         flex: 1,
//                                         justifyContent: 'center',
//                                         alignItems: 'center',
//                                     }}>
//                                         <Icon name="camera" size={40} color={'#fff'} style={styles.ıconContainer} />
//                                     </View>
//                                 </ImageBackground>
//                             </View>
//                         </TouchableOpacity>
//                         <BottomSheet show={show} onDismiss={() => { setshow(false); }}>
//                             <Text style={styles.TitleBottomSheetStyle}> Upload Photo</Text>
//                             <Text style={styles.textBottomSheetStyle}> Choose your profile picture..</Text>
//                             <TouchableOpacity style={styles.galleryButtonStyle} onPress={choosePhotos}>
//                                 <Text style={styles.galleyButtonTitleStyle}>
//                                     Choose From Library</Text>
//                             </TouchableOpacity>
//                             <TouchableOpacity style={styles.galleryButtonStyle} onPress={takePhotos}>
//                                 <Text style={styles.galleyButtonTitleStyle}>
//                                     Take Photo</Text>
//                             </TouchableOpacity>
//                             <TouchableOpacity style={styles.galleryButtonStyle} onPress={() => { setshow(false) }}>
//                                 <Text style={styles.galleyButtonTitleStyle}>
//                                     Cancel</Text>
//                             </TouchableOpacity>
//                         </BottomSheet>
//                         {/* PROFILE IMAGE  */}
//                         <Formik initialValues={initialFormValues} onSubmit={handleFormSubmit}>
//                             {({ values, handleChange, handleSubmit }) => (
//                                 <View style={styles.body_container}>
//                                     <Input
//                                         value={values.Name}
//                                         onChangeText={handleChange('Name')}
//                                         placeholder={initialFormValues.Name}
//                                         iconName="name"
//                                     />
//                                     <Input
//                                         value={values.Age}
//                                         onChangeText={handleChange('Age')}
//                                         placeholder={initialFormValues.Age}
//                                         iconName="age"
//                                     />
//                                     <Input
//                                         value={values.Height}
//                                         onChangeText={handleChange('Height')}
//                                         placeholder={initialFormValues.Height}
//                                         iconName="height"
//                                     />
//                                     <Input
//                                         value={values.Weight}
//                                         onChangeText={handleChange('Weight')}
//                                         placeholder={initialFormValues.Weight}
//                                         iconName="weight"
//                                     />
//                                     <Input
//                                         value={values.City}
//                                         onChangeText={handleChange('City')}
//                                         placeholder={initialFormValues.City}
//                                         iconName="city"
//                                     />
//                                     <Input
//                                         value={values.Position}
//                                         onChangeText={handleChange('Position')}
//                                         placeholder={initialFormValues.Position}
//                                         iconName="account"
//                                     />
//                                     <Input
//                                         value={values.Position}
//                                         onChangeText={handleChange('Description')}
//                                         placeholder={initialFormValues.Description}
//                                         iconName="account"
//                                     />     
//                            <Button text={"Kaydet"} loading={loading} onPress={handleSubmit} />
//                            </View>
//                             )}
//                         </Formik>
//                     </KeyboardAvoidingView>
//                 </View>
//             </ScrollView>
//         </Provider>
//     )
// }
// export default EditProfile;
