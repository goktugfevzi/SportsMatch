import React from 'react';
import {View, StyleSheet, Text,ImageBackground} from 'react-native';
import Button from '../../../Components/Button';


const AuthFirstPage = ({navigation}) => {
    function handleSubmit(){
        navigation.navigate('LoginPage');
    }
    function handleSignUp(){
        navigation.navigate('SignPage');
    }
  return (
    <View>
    <ImageBackground source={require("../../../assets/deneme1.jpg")} resizeMode='cover' style={{ height: '100%' }} />
    <View style={{ position: "absolute" }}>
    <View style={{ marginHorizontal: 40, marginVertical: 80 }}>
      <Text style={{ color: 'white', fontSize: 58, marginBottom: 40 }}>SportMatch</Text>
     
      </View>
      <Button text={"Giriş Yap"} theme="primary" onPress={handleSubmit}/>
      <Button text={"Kayıt Ol"} theme="secondary" onPress={handleSignUp} />
    </View>
  </View>
  );
}

const styles = StyleSheet.create({})

export default AuthFirstPage;