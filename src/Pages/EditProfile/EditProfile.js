import React from "react";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import Button from "../../Components/Button";
import styles from './EditProfile.style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomSheet from "../../Components/BottomSheets/BottomSheet";
import { Provider } from "react-native-paper";
import ImagePicker from 'react-native-image-crop-picker';
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore"
import { Formik } from 'formik';
import { showMessage } from 'react-native-flash-message';
import Input from '../../Components/LoginInput';
import storage from '@react-native-firebase/storage';

const initialFormValues = {
  usermail: '',
  password: '',
  repassword: '',
  Name: '',
  Age: '',
  Height: '',
  Weight: '',
  City: '',
  Position: '',
  Description: '',
  ImageUrl: '',
};
const EditProfile = ({ navigation }) => {
  const [user, setUser] = useState('')
  const [image, setImage] = useState('https://pbs.twimg.com/media/FZukxoeUsAABmXt.jpg');
  useEffect(() => {
    firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .get().then((doc) => {
        setUser(doc.data())
      });
  }, []);
  useEffect(()=>{
    storage().ref('userImage/' + auth().currentUser.uid)
    .getDownloadURL()
    .then((url) => {
      setImage( url );
    })
    .catch((e) => console.log('getting downloadURL of image error => ', e));
  },[setImage])
  const [loading, setLoading] = useState(false);
  const handleFormSubmit = async formValues => {
    let Name = user.Name
    let Age = user.Age
    let Height = user.Height
    let Weight = user.Weight
    let City = user.City
    let Position = user.Position
    let Description = user.Description
    let ImageUrl = user.ImageUrl
    if (formValues.Name != "") {
      Name = formValues.Name
    }
    if (formValues.Age != "") {
      Age = formValues.Age
    }
    if (formValues.Height != "") {
      Height = formValues.Height
    }
    if (formValues.Weight != "") {
      Weight = formValues.Weight
    }
    if (formValues.City != "") {
      City = formValues.City
    }
    if (formValues.Position != "") {
      Position = formValues.Position
    }
    if (formValues.Description != "") {
      Description = formValues.Description
    }
    if (image != "") {
      ImageUrl = image
    }
    try {
      setLoading(true);
      firestore().collection('users').doc(auth().currentUser.uid).update({
        Name: Name,
        Age: Age,
        Height: Height,
        Weight: Weight,
        City: City,
        Position: Position,
        Description: Description,
        ImageUrl: ImageUrl
      }).then(() => {
        console.log('User updated!');
      });

      setLoading(false);
      showMessage({
        message: 'Değişiklik başarıyla tamamlandı',
        type: 'success',
      });
      navigation.goBack("ProfilePage")
    } catch (error) {
      setLoading(false);
      console.log(error);
      console.log(formValues);
    }
  };
  // FOR IMAGE UPDATING
  const takePhotos = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 400,
      cropping: true,
      compressImageQuality: 0.7,
    }).then(async image => {

      console.log(image.path);
      setImage(image.path);
      const reference = storage().ref('userImage/' + auth().currentUser.uid);
      try {
        const task1 = reference.putFile(image.path);
        task1.on('state_changed', taskSnapshot => {
          console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
        });
        task1.then(() => {
          ImageUrl = image;
          console.log('Image uploaded to the bucket!');
        });
      } catch (error) {
        console.log(error);
      }
    });
  }
  const choosePhotos = () => {
    ImagePicker.openPicker({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 400,
      cropping: true,
      compressImageQuality: 0.7,
    }).then(async image => {

      setImage(image.path);
      const reference = storage().ref('userImage/' + auth().currentUser.uid);
      try {
        const task = reference.putFile(image.path);
        task.on('state_changed', taskSnapshot => {
          console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
        });
        task.then(() => {
          ImageUrl = image;
          console.log('Image uploaded to the bucket!');
        });
      } catch (error) {
        console.log(error);
      }
    });
  }

  const [show, setshow] = useState(false);
  return (
    <Provider>
      <ScrollView>
        <View style={styles.container}>
          <KeyboardAvoidingView behavior='position'>


            <View style={styles.TouchableOpacityContainer}>
            <TouchableOpacity onPress={() => { setshow(true) }}>
              <View style={styles.imageContainer}>
                <ImageBackground source={{ uri: image}}
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
            </View>
            <BottomSheet show={show} onDismiss={() => { setshow(false); }}>
              <Text style={styles.TitleBottomSheetStyle}> Upload Photo</Text>
              <Text style={styles.textBottomSheetStyle}> Choose your profile picture..</Text>
              <TouchableOpacity style={styles.galleryButtonStyle} onPress={choosePhotos}>
                <Text style={styles.galleyButtonTitleStyle}>
                  Galeriden Seç</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.galleryButtonStyle} onPress={takePhotos}>
                <Text style={styles.galleyButtonTitleStyle}>
                  Fotoğraf Çek</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.galleryButtonStyle} onPress={() => { setshow(false) }}>
                <Text style={styles.galleyButtonTitleStyle}>
                  Cancel</Text>
              </TouchableOpacity>
            </BottomSheet>

            <Formik initialValues={initialFormValues} onSubmit={handleFormSubmit}>
              {({ values, handleChange, handleSubmit }) => (
                <View style={styles.body_container}>
                  <Input
                    value={values.Name}
                    onChangeText={handleChange('Name')}
                    placeholder="Adınızı Giriniz"
                    iconName="name"
                  />
                  <Input
                    value={values.Age}
                    onChangeText={handleChange('Age')}
                    placeholder="Yaşınızı Giriniz"
                    iconName="age"
                  />
                  <Input
                    value={values.Height}
                    onChangeText={handleChange('Height')}
                    placeholder="Ağırlığınızı Giriniz"
                    iconName="height"
                  />
                  <Input
                    value={values.Weight}
                    onChangeText={handleChange('Weight')}
                    placeholder="Boyunuzu Giriniz"
                    iconName="weight"
                  />
                  <Input
                    value={values.City}
                    onChangeText={handleChange('City')}
                    placeholder="Şehrinizi Giriniz"
                    iconName="city"
                  />
                  <Input
                    value={values.Description}
                    onChangeText={handleChange('Description')}
                    placeholder="Şehrinizi Giriniz"
                    iconName="city"
                  />
                  <Input
                    value={values.Position}
                    onChangeText={handleChange('Position')}
                    placeholder="Oynadığınız Pozisyonu Giriniz"
                    iconName="account"
                  />
                  <Button text={"Kaydet"} loading={loading} onPress={handleSubmit} />
                </View>
              )}
            </Formik>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>




    </Provider>
  )
}
export default EditProfile;


