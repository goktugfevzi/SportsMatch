import {View, Text,SafeAreaView,Image} from 'react-native';
import React,{useState} from 'react';
import styles from './Login.style';
import Input from '../../../Components/LoginInput';
import Button from '../../../Components/Button';
import authErrorMessageParser from '../../../utils/authErrorMessageParser';
import {showMessage} from "react-native-flash-message"
import {Formik} from 'formik';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';


GoogleSignin.configure({
  webClientId: '739050688413-h8kft1fn1s3rqe5se3307dr71ke916nq.apps.googleusercontent.com',
});
  
async function onGoogleButtonPress() {
  // Check if your device supports Google Play
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  // Get the users ID token
  const { idToken } = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
}
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

            <Button text={"Giriş Yap"} theme="primary"  onPress={handleSubmit} loading={loading} />

            <Button text={"Kayıt Ol"} theme="secondary"  onPress={handleSignUp} />
            <Button
      theme="secondary"
      title={"Google"}
      icon={"google"}
      loading={loading}
      onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
    />
        </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default Login;
