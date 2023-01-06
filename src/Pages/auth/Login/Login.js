import { View, Text, Image, ScrollView, KeyboardAvoidingView,TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import styles from './Login.style';
import Input from '../../../Components/LoginInput';
import Button from '../../../Components/Button';
import authErrorMessageParser from '../../../utils/authErrorMessageParser';
import { showMessage } from "react-native-flash-message"
import { Formik } from 'formik';
import auth from '@react-native-firebase/auth';
import { Provider, } from "react-native-paper";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const initialFormValues = {
  usermail: '',
  password: '',
};
const Login = ({ navigation }) => {
  const [loading, setLoading] = useState(false)
  const [show, setShow] = useState(true)
  
  const handleSignUp = () => {
    navigation.navigate('SignPage');
  };

  const handleFormSubmit = async (formValues) => {
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
      setLoading(true)
      await auth().signInWithEmailAndPassword(
        formValues.usermail,
        formValues.password,
      );
      setLoading(false)
    } catch (error) {
      console.log(error);
      showMessage({
        message: authErrorMessageParser(error.code),
        type: "danger"
      })
      setLoading(false)
    }
    console.log(formValues);
  };

  return (
    <Provider >
      <ScrollView>
        <View style={styles.container}>
          <KeyboardAvoidingView behavior='position'>
            <View style={styles.logo_container}>
              <Image style={styles.logo} source={require("../../../assets/logo2.png")} />
              <Text style={styles.name_style}>SPORTSMATCH</Text>
            </View>
            <Formik initialValues={initialFormValues}
              onSubmit={handleFormSubmit}>
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
                    hidepassword={show} keyboardType='default'
                  />
                  <TouchableOpacity style={{ position: 'absolute', right: 15, marginTop: 81, width: 30, height: 30 }} onPress={() => { setShow(!show) }}>
                    <MaterialCommunityIcons name={"eye-outline"} size={22} color={"gray"} />
                  </TouchableOpacity>
                  <Button text={"Giriş Yap"} theme="primary" onPress={handleSubmit} loading={loading} />
                  <Button text={"Kayıt Ol"} theme="secondary" onPress={handleSignUp} />
                </View>
              )}
            </Formik>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </Provider>
  );
};

export default Login;
