import {
  View, Text, KeyboardAvoidingView,
  ScrollView, Image
} from 'react-native';
import React, { useState } from 'react';
import styles from './Sign.style';
import Input from '../../../Components/LoginInput';
import Button from '../../../Components/Button';
import { Formik } from 'formik';
import auth from '@react-native-firebase/auth';
import { showMessage } from 'react-native-flash-message';
import authErrorMessageParser from '../../../utils/authErrorMessageParser';
import { Provider } from "react-native-paper";
import firestore from '@react-native-firebase/firestore'
const initialFormValues = {
  usermail: '',
  password: '',
  repassword: '',
  Name: '',
  Age: '',
  Height: '',
  Weight: '',
  hasTeam: false,
  isCaptain: false,
  City: '',
  Position: '',
  Team: '',
};
const Sign = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const handleFormSubmit = async formValues => {
    if (formValues.password !== formValues.repassword) {
      showMessage({
        message: 'Şifreler uyuşmuyor...',
        type: 'danger',
      });
      return;
    }
    if (formValues.usermail === "") {
      showMessage({
        message: 'Mail giriniz...',
        type: 'danger',
      });
      return;
    }
    if (formValues.password === "") {
      showMessage({
        message: 'Şifre giriniz...',
        type: 'danger',
      });
      return;
    }
    try {
      setLoading(true);
      await auth().createUserWithEmailAndPassword(
        formValues.usermail,
        formValues.password,
      ).then(cred => {
        return firestore().collection('users').doc(cred.user.uid).set({
          Name: formValues.Name,
          Age: formValues.Age,
          Height: formValues.Height,
          Weight: formValues.Weight,
          hasTeam: false,
          isCaptain: false,
          City: formValues.City,
          Position: formValues.Position,
          Team: formValues.Team
        })
      });
      setLoading(false);
      showMessage({
        message: 'Kayıt işlemi başarıyla tamamlandı',
        type: 'success',
      });
    } catch (error) {
      setLoading(false);
      showMessage({
        message: authErrorMessageParser(error.code),
        type: 'danger',
      });
      console.log(formValues);
    }
  };

  return (
    <Provider >
      <ScrollView>
        <View style={styles.container}>
          <KeyboardAvoidingView behavior='position'>
            <View style={styles.logo_container}>
              <Image style={styles.logo} source={require("../../../Components/Images/logo2.png")} />
              <Text style={styles.name_style}>SPORTSMATCH</Text>
            </View>

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
                    value={values.usermail}
                    onChangeText={handleChange('usermail')}
                    placeholder="E-postanızı giriniz"
                    iconName="email"
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
                    value={values.Position}
                    onChangeText={handleChange('Position')}
                    placeholder="Oynadığınız Pozisyonu Giriniz"
                    iconName="account"
                  />

                  <Input
                    value={values.password}
                    onChangeText={handleChange('password')}
                    placeholder="Şifrenizi giriniz"
                    iconName="key"
                    isSecure
                  />
                  <Input
                    value={values.repassword}
                    onChangeText={handleChange('repassword')}
                    placeholder="Şifrenizi tekrar giriniz"
                    iconName="key"
                    isSecure
                  />
                  <Button text={"Kayıt Ol"} loading={loading} onPress={handleSubmit} />
                  <Text
                    style={{
                      color: 'black',
                      marginTop: 5,
                      marginBottom: 25,
                      fontSize: 15,
                      textAlign: 'center'
                    }}
                  >
                    Zaten bir hesabınız var mı? <Text onPress={() => navigation.navigate('LoginPage')} style={{ color: '#3740FE' }}>Giriş yap</Text>
                  </Text>
                </View>
              )}
            </Formik>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </Provider>
  );
};

export default Sign;
