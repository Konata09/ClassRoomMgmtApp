import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {Alert, BackHandler,} from 'react-native';

import {Colors,} from 'react-native/Libraries/NewAppScreen';

import {Api} from "./api/Api";
import {Configuration} from "./api/runtime";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {LoginScreen} from "./screen/LoginScreen";
import {MyStackScreen} from "./screen/MyStackScreen";
import {ClassroomsStackScreen} from "./screen/ClassroomsStackScreen";
import {TicketStackScreen} from "./screen/TicketStackScreen";
import {LoadingScreen} from "./screen/LoadingScreen";
import {HomeStackScreen} from "./screen/HomeStackScreen";

export var GlobalState = {
  uid: 0,
  username: "unknown",
  rolename: "unknown",
  isAdmin: false,
  isStaff: false,
  phone: "",
  // serverAddr: "http://172.31.166.35:63112/api/v2",
  serverAddr: "http://172.31.90.11:63112/api/v2",
  token: "unknown",
  tokenExp: 0,
}
console.log("Server Address is " + GlobalState.serverAddr);

export const API = new Api(
  new Configuration(
    {
      basePath: GlobalState.serverAddr,
      headers: {
        "authorization": "Bearer " + GlobalState.token
      }
    }
  )
)
const RootStack = createStackNavigator();
const Tab = createBottomTabNavigator();

export function LoggedInScreen({navigation, route}) {

  React.useEffect(
    () =>
      navigation.addListener('beforeRemove', (e: any) => {
        // Prevent default behavior of leaving the screen
        e.preventDefault();
        Alert.alert('确认退出', '你确定要退出吗?',
          [
            {text: "取消", style: 'cancel', onPress: () => null},
            {text: '退出', style: 'destructive', onPress: () => BackHandler.exitApp()},
          ]
        );
      }),
    [navigation])

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'ios-home' : 'ios-home-outline';
          } else if (route.name === 'Classroom') {
            // iconName = focused ? 'ios-apps-sharp' : 'ios-apps-outline';
            iconName = focused ? 'ios-business' : 'ios-business-outline';
          } else if (route.name === 'Ticket') {
            iconName = focused ? 'ios-receipt' : 'ios-receipt-outline';
          } else if (route.name === 'My') {
            iconName = focused ? 'ios-person' : 'ios-person-outline';
          }
          return <Ionicons name={iconName} size={size} color={color}/>;
        },
        tabBarActiveTintColor: Colors.iosBlue,
        tabBarInactiveTintColor: 'gray'
      })}>
      <Tab.Screen name="Home" component={HomeStackScreen}/>
      <Tab.Screen name="Classroom" component={ClassroomsStackScreen}/>
      <Tab.Screen name="Ticket" component={TicketStackScreen}/>
      <Tab.Screen name="My" component={MyStackScreen}/>
    </Tab.Navigator>)
}


const App = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="LoadingScreen" screenOptions={{headerShown: false}}>
        <RootStack.Screen name="LoggedInScreen" component={LoggedInScreen}/>
        <RootStack.Screen name="LoginScreen" component={LoginScreen}/>
        <RootStack.Screen name="LoadingScreen" component={LoadingScreen}/>
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
