import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from './Pages/Homepage/HomeScreen';
import Profile from './Pages/ProfilePage/Profile'
import SearchTeam from './Pages/SearchTeamPage/SearchTeam'
import Team from './Pages/TeamPage/TeamPage'
const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
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
    </Tab.Navigator>
    </NavigationContainer>
  );
}