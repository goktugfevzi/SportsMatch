import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';

import Home from './Pages/Homepage/HomeScreen';
import Profile from './Pages/ProfilePage/Profile'
import SearchTeam from './Pages/SearchTeamPage/SearchTeam'
import Team from './Pages/TeamPage/TeamPage'

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{headerShown:false,tabBarStyle:{backgroundColor:'orange' },headerStyle:{backgroundColor:'orange'}}}>
        <Tab.Screen name="Home" component={Home} options={{headerShown:true,headerTitle:'Sport Match',headerTitleAlign:'center'}} />
        <Tab.Screen name="SearchdTseam" component={SearchTeam} />
        <Tab.Screen name="Team" component={Team} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}