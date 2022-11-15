import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Home from './Pages/Homepage/HomeScreen';
import Profile from './Pages/ProfilePage/Profile';
import SearchTeam from './Pages/SearchTeamPage/SearchTeam';
import Team from './Pages/TeamPage/TeamPage';
import Login from './Pages/auth/Login';
import Invate from './Pages/PlayerInvatePage/InvatePage';
import Request from './Pages/PlayerInvatePage/RequestPage'
import Sign from './Pages/auth/Sign';
import auth from '@react-native-firebase/auth';
import FlashMessage from 'react-native-flash-message';

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();
const TabTop = createMaterialTopTabNavigator

export default function App() {
  const [userSession, setUserSession] = useState();

  useEffect(() => {
    auth().onAuthStateChanged(user => {
      setUserSession(!!user);
    });
  }, []);


  //PlayerInvationPage TopTab
  function  TeamStack(){
    return (
      <NavigationContainer>
      <TabTop.Navigator>
        <TabTop.Screen name="Invate" component={Invate} />
        <TabTop.Screen name="Request" component={Request} />
      </TabTop.Navigator>
      </NavigationContainer>
    );
  }

  //TAB NAVİGATOR FOR APP
  const TabNav = () => {
    return (
      <Tab.Navigator
        initialRouteName="Feed"
        activeColor="#e91e63"
        barStyle={{ backgroundColor: 'tomato' }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="SearchTeam"
          component={SearchTeam}
          options={{
            tabBarLabel: 'SearchTeam',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="shield-search" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Team"
          component={Team}
          options={{
            tabBarLabel: 'Team',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="cupcake" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="account" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>)
  }

  //AUTH SCREENS
  const AuthStack = () => {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="LoginPage" component={Login} />
        <Stack.Screen name="SignPage" component={Sign} />
      </Stack.Navigator>
    );
  };
  //STACK NAVİGATOR FOR AUTH
  const StackNav = () => {
    return (<Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AuthStack" component={AuthStack} />
    </Stack.Navigator>)
  }


  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!userSession ? (
         <Stack.Screen
         name="StackNav"
         component={StackNav}
         options={{ headerShown: false }}
       />) : (
            <Stack.Screen
           name="TabNav"
           component={TabNav}
           options={{ headerTintColor: 'orange', headerRight: () => (<MaterialCommunityIcons name="logout"
            size={30}
            color="orange"
            onPress={()=> auth().signOut()}/>)}}
         />
        )}
      </Stack.Navigator>
      <FlashMessage position="top" />
    </NavigationContainer>
  );
}