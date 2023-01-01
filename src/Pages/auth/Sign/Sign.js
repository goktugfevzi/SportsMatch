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

const initialFormValues = {
  usermail: '',
  password: '',
  repassword: '',
};

const Sign = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    navigation.goBack();
  };

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
      );
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
                    value={values.usermail}
                    onChangeText={handleChange('usermail')}
                    placeholder="E-postanızı giriniz"
                    iconName="email"
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
                    onPress={() => navigation.navigate('LoginPage')}>
                    Zaten bir hesabınız var mı? <Text style={{color: '#3740FE'}}>Giriş yap</Text>
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
