import {View, Text,SafeAreaView,Image} from 'react-native';
import React, {useState} from 'react';
import styles from './Sign.style';
import Input from '../../../Components/LoginInput';
import Button from '../../../Components/LogInButton';
import {Formik} from 'formik';
import auth from '@react-native-firebase/auth';
import {showMessage} from 'react-native-flash-message';
import authErrorMessageParser from '../../../utils/authErrorMessageParser';
import { GoogleSignin } from '@react-native-google-signin/google-signin';


GoogleSignin.configure({
  webClientId: '739050688413-h8kft1fn1s3rqe5se3307dr71ke916nq.apps.googleusercontent.com',
});

const initialFormValues = {
  usermail: '',
  password: '',
  repassword: '',
};

const Sign = ({navigation}) => {
  const [loading, setLoading] = useState(false);

  
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
    <SafeAreaView style={styles.container}>
         <View style={styles.logo_container}>
            <Image style={styles.logo} source={require("../../../Components/Images/logo2.png")}/>
            <Text style={styles.name_style}>SPORTSMATCH</Text>
      </View>

      <Formik initialValues={initialFormValues} onSubmit={handleFormSubmit}>
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
            <Input
              value={values.repassword}
              onChangeText={handleChange('repassword')}
              placeholder="Şifrenizi tekrar giriniz"
              iconName="key"
              isSecure
            />
            <Button title={"Kayıt Ol"} loading={loading} function={handleSubmit} />
            <Button
      theme="secondary"
      title={"Google"}
      icon={"google"}
      loading={loading}
      function={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
    />
      <Button
        title={"Geri"}
        theme="secondary"
        function={handleLogin}
        loading={loading}
      />
          </View>
        )}
      </Formik>
     
    </SafeAreaView>
  );
};

export default Sign;
