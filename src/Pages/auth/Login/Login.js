import {View, Text,SafeAreaView,Image} from 'react-native';
import React,{useState} from 'react';
import styles from './Login.style';
import Input from '../../../Components/LoginInput';
import Button from '../../../Components/LogInButton';
import authErrorMessageParser from '../../../utils/authErrorMessageParser';
import {showMessage} from "react-native-flash-message"
import {Formik} from 'formik';
import auth from '@react-native-firebase/auth';

const initialFormValues = {
  usermail: '',
  password: '',
};

const Login = ({navigation}) => {
  const [loading,setLoading] = useState(false)

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
        message:authErrorMessageParser(error.code),
        type:"danger"
      })
      setLoading(false)
    }
    console.log(formValues);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logo_container}>
            <Image style={styles.logo} source={require("../../../Components/Images/logo2.png")}/>
            <Text style={styles.name_style}>SPORTSMATCH</Text>
      </View>
      <Formik initialValues={initialFormValues}
       onSubmit={handleFormSubmit}>
        {({values, handleChange, handleSubmit}) => (
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

            <Button title={"Giriş Yap"} theme="primary"  function={handleSubmit} loading={loading} />

            <Button title={"Kayıt Ol"} theme="secondary"  function={handleSignUp} />
        </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default Login;
