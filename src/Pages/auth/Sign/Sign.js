import {View, Text} from 'react-native';
import React, {useState} from 'react';
import styles from './Sign.style';
import Input from '../../../Components/Input';
import Button from '../../../Components/Button';
import {Formik} from 'formik';
import auth from '@react-native-firebase/auth';
import {showMessage} from 'react-native-flash-message';
import authErrorMessageParser from '../../../utils/authErrorMessageParser';

const initialFormValues = {
  usermail: '',
  password: '',
  repassword: '',
};

const Sign = ({navigation}) => {
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
            <Input
              value={values.repassword}
              onChangeText={handleChange('repassword')}
              placeholder="Şifrenizi tekrar giriniz"
              iconName="key"
              isSecure
            />
            <Button text="Kayıt Ol" loading={loading} onPress={handleSubmit} />
          </>
        )}
      </Formik>

      <Button
        text="Geri"
        theme="secondary"
        onPress={handleLogin}
        loading={loading}
      />
    </View>
  );
};

export default Sign;
