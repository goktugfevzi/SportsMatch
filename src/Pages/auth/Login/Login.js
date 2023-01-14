import { View, Text, Image, ScrollView, KeyboardAvoidingView,TouchableOpacity,ImageBackground, Dimensions } from 'react-native';
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
    navigation.navigate('AuthFirstPage')
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
            <View >
            {/* <View style={styles.logo_container}> 
              <Text style={styles.name_style}>SPORTSMATCH</Text>
            </View> */}
            <ImageBackground  imageStyle={{ opacity: 0.9 }} style={styles.backgroundImage} source={require("../../../assets/deneme2.jpeg")}  resizeMode='cover' >
           
            <Formik initialValues={initialFormValues}
              onSubmit={handleFormSubmit}>
              {({ values, handleChange, handleSubmit }) => (
                <View style={styles.body_container}>
                  <Text style={{color:'white',fontSize:38,padding:12,textAlign:'center',fontWeight:'bold'
                }}>SPORTSMATCH</Text>
                  <Input
                    value={values.usermail}
                    onChangeText={handleChange('usermail')}
                    placeholder="E-postanızı giriniz"
                    iconName="email"
                  />
                  <View>
                  <Input
                    value={values.password}
                    onChangeText={handleChange('password')}
                    placeholder="Şifrenizi giriniz"
                    iconName="key"
                    isSecure
                    hidepassword={show} keyboardType='default'
                  />
                  <TouchableOpacity style={{ position: 'absolute', right: 15, marginTop:18, width: 30, height: 30 }} onPress={() => { setShow(!show) }}>
                    <MaterialCommunityIcons name={"eye-outline"} size={22} color={"gray"} />
                  </TouchableOpacity>
                  </View>
                  <Button text={"Giriş Yap"} theme="primary" onPress={handleSubmit} loading={loading} />
                  <Button text={"Geri Dön"} theme="secondary" onPress={handleSignUp} />
                </View>
              )}
            </Formik>
            </ImageBackground>
            </View>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </Provider>
  );
};

export default Login;