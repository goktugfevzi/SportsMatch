import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Font from 'react-native-vector-icons/Feather';
import Home from './Pages/Homepage/HomeScreen';
import ProfilePage from "./Pages/ProfilePage/Profile";
import SearchTeam from './Pages/SearchTeamPage/SearchTeam';
import Team from './Pages/TeamPage/TeamPage';
import Login from './Pages/auth/Login';
import Invate from './Pages/PlayerInvatePage/InvatePage';
import Request from './Pages/PlayerInvatePage/RequestPage'
import Sign from './Pages/auth/Sign';
import auth from '@react-native-firebase/auth';
import FlashMessage from 'react-native-flash-message';
import EditProfile from './Pages/EditProfile';

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();
const TabTop = createMaterialTopTabNavigator();

export default function App() {

  const [userSession, setUserSession] = useState();
  useEffect(() => {
    auth().onAuthStateChanged(user => {
      setUserSession(!!user);
    })
  }, []);

  //Profile-EditProfile Stack
  const ProfileStack = ({ navigation }) => {
    return (
      <Stack.Navigator>
        <Stack.Screen name="ProfilePage" component={ProfilePage}
          options={{
            headerShown: true,
            headerRight: () => (<Font name="edit"
              size={20}
              color="orange"
              onPress={() => navigation.navigate('Edit')} />)
          }} />
        <Stack.Screen name="Edit" component={EditProfile}
          options={{
            headerShown: true,
            headerRight: () => (<Font name="edit"
              size={20}
              color="orange"
            />)
          }}
        />
      </Stack.Navigator>
    );
  }

  const TeamStack = () => {
    return (<Stack.Navigator initialRouteName='Team'>
      <Stack.Screen name="Team" component={Team} options={{ headerShown: false }} />
      <Stack.Screen name="TeamTabTop" component={TeamTabTop} options={{ headerShown: false }} />
    </Stack.Navigator>
    );
  };

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
          name="SearchTeam"
          component={SearchTeam}
          options={{
            tabBarLabel: 'Search',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="text-search" color={color} size={26} />
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

  ////İLK DEFA KAYIT OLAN KULLANICIYI EDİT SAYFASINA YÖNLENDİRME HENÜZ ÇALIŞMIYOR
  const userTime = "a";
  const StackEdit = () => {
    if (!(auth().currentUservariable === null)) {
      userTime ??= auth().currentUser.metadata;
    }
    return (<Stack.Navigator> {(userTime.creationTime) === (userTime.lastSignInTime) ? (<Stack.Screen name="Edit" component={EditProfile} />) : (null)}</Stack.Navigator>);
  }

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
              headerTintColor: 'snow', headerRight: () => (<MaterialCommunityIcons name="logout"
                size={26}
                color="snow"
                onPress={() => auth().signOut()} />),
            }}
          />
        )}
      </Stack.Navigator>
      <FlashMessage position="top" />
    </NavigationContainer>
  );
}
