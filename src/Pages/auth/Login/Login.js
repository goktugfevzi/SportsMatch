import {View, Text} from 'react-native';
import React,{useState} from 'react';
import styles from './Login.style';
import Input from '../../../Components/Input';
import Button from '../../../Components/Button';
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
    <View style={styles.container}>
      <Text style={styles.header}>SPORTSMATCH</Text>

      <Formik initialValues={initialFormValues} onSubmit={handleFormSubmit}>
        {({values, handleChange, handleSubmit}) => (
          <>
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
            <Button text="Giriş Yap" theme="primary" onPress={handleSubmit} loading={loading} />
          </>
        )}
      </Formik>

      <Button text="Kayıt Ol" theme="secondary" onPress={handleSignUp} />
    </View>
  );
};

export default Login;
