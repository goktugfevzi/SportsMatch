import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from './Pages/Homepage/HomeScreen';
import ProfilePage from "./Pages/ProfilePage/Profile";
import TeamDetail from './Pages/TeamDetailPage/TeamDetailPage';
import TeamEdit from './Pages/EditTeamPage/EditTeamPage';
import Login from './Pages/auth/Login';
import Invate from './Pages/PlayerInvatePage/InvatePage';
import Request from './Pages/PlayerInvatePage/RequestPage'
import Sign from './Pages/auth/Sign';
import auth from '@react-native-firebase/auth';
import FlashMessage from 'react-native-flash-message';
import EditProfile from './Pages/EditProfile';
import CreateTeam from './Pages/CreateTeamPage/DEmo';
import firestore from '@react-native-firebase/firestore';

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();
const TabTop = createMaterialTopTabNavigator();

export default function App() {
  const [user, setUser] = useState('')
  const [userSession, setUserSession] = useState();
  useEffect(() => {
    auth().onAuthStateChanged(user => {
      setUserSession(!!user);
    })
    firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .get().then((doc) => {
        setUser(doc.data())
      });
  }, [setUser]);


  //Profile-EditProfile Stack
  const ProfileStack = () => {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="ProfilePage" component={ProfilePage} />
        <Stack.Screen name="Edit" component={EditProfile} options={{
          headerShown: true, headerTitle: 'Kişisel Bilgiler',
          headerTintColor: 'black',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} />
      </Stack.Navigator>
    );
  }

  const TeamStack = () => {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {(user.hasTeam == false) ? (
          <Stack.Screen
            name="CreateTeamPage"
            component={CreateTeam}
            options={{ headerShown: false }} />) : (
              <Stack.Screen name="HasTeamStack" component={HasTeamStack}  />
          )}
          </Stack.Navigator>
    );
  };
const HasTeamStack = () =>{
  return(   <Stack.Navigator screenOptions={{ headerShown: true }}>
    <Stack.Screen name="TeamDetailPage" component={TeamDetail}  />
    <Stack.Screen name="TeamEditPage" component={TeamEdit}  />
<Stack.Screen name="TeamTabTop" component={TeamTabTop}  />
</Stack.Navigator>)
}
  //PlayerInvationPage TopTab
  const TeamTabTop = () => {
    return (
      <TabTop.Navigator initialRouteName='Invate' screenOptions={{
        tabBarActiveTintColor: '#e91e63',
        tabBarLabelStyle: { fontSize: 12 },
        tabBarStyle: { backgroundColor: 'orange' },
      }}>
        <TabTop.Screen name="Invate" component={Invate} />
        <TabTop.Screen name="Request" component={Request} />
      </TabTop.Navigator>
    );
  }

  //TAB NAVİGATOR FOR APP
  const TabNav = () => {
    return (
      <Tab.Navigator
        shifting={true}
        activeColor="#e91e63"
        barStyle={{ backgroundColor: 'orange' }}>
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
          name="TeamStack"
          component={TeamStack}
          options={{
            tabBarLabel: 'Team',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="account-group" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Create"
          component={CreateTeam}
          options={{
            tabBarLabel: 'Search',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="text-search" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileStack}
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
            options={{
              headerShown: true,
              headerStyle: { backgroundColor: 'orange' },
              headerTitle: "SpotsMatch",
              headerTitleAlign: 'center',
              headerTintColor: 'snow',
            }}
          />
        )}
      </Stack.Navigator>
      <FlashMessage position="top" />
    </NavigationContainer>
  );
}