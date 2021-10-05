import React, {useEffect, useState} from 'react';
import {NavigationContainer, useFocusEffect} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
// @ts-ignore
import Ionicons from 'react-native-vector-icons/Ionicons';
import {HomeScreen} from "./screen/HomeScreen";
import {TicketScreen} from "./screen/TicketScreen";
import {ChangePhoneScreen} from "./screen/ChangePhoneScreen"

import {
  Alert, AsyncStorage,
  BackHandler, SafeAreaView,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import {Api} from "./api/Api";
import {Configuration} from "./api/runtime";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {LoginScreen} from "./screen/LoginScreen";
import {MyStackScreen} from "./screen/MyStackScreen";
import {ClassroomsStackScreen} from "./screen/ClassroomsStackScreen";
import {TicketStackScreen} from "./screen/TicketStackScreen";
import {getAsyncStorage, setAsyncStorage, updateGlobalStateFromJWT} from "./utils";
import {LoadingScreen} from "./screen/LoadingScreen";

export var GlobalState = {
  uid: 0,
  username: "unknown",
  rolename: "unknown",
  // isLoggedIn: false,
  isAdmin: false,
  isStaff: false,
  phone: "",
  // serverAddr: "http://172.31.96.5:63112/api/v2",
  serverAddr: "http://10.0.3.59:63112/api/v2",
  token: "unknown",
  tokenExp: 0,
}

export const API = new Api(
  new Configuration(
    {
      // basePath: "http://172.31.161.101:63112/api/v2",
      // basePath: "http://172.31.168.150:63112/api/v2",
      // basePath: "http://172.31.55.199:63112/api/v2",
      basePath: GlobalState.serverAddr,
      headers: {
        "authorization": "Bearer " + GlobalState.token
      }
    }
  )
)
// const test = API.getMyTicketGet({
//   userid: "1"
// }).then((a) => console.log(a))

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
      <Tab.Screen name="Home" component={HomeScreen}/>
      <Tab.Screen name="Classroom" component={ClassroomsStackScreen}/>
      <Tab.Screen name="Ticket" component={TicketStackScreen}/>
      <Tab.Screen name="My" component={MyStackScreen}/>
    </Tab.Navigator>)
}


const App = () => {
  // const [isLogin, setIsLogin] = React.useState(false);
  // const [initScreen, setInitScreen] = React.useState("LoginScreen");
  // useEffect(() => {
  //   async function checkLoginState() {
  //     const token = await getAsyncStorage("token");
  //     if (token) {
  //       updateGlobalStateFromJWT(token);
  //       if (GlobalState.tokenExp > Date.now() + 60000) { // 如果 Token 将在 1 分钟内过期 那么重新登录
  //         const res = await API.refreshPost({inlineObject11: {username: GlobalState.username, uid: GlobalState.uid}})
  //           .catch(_ => null);
  //         if (res && res.retcode === 0) {
  //           updateGlobalStateFromJWT(res.data.token);
  //           await setAsyncStorage("token", res.data.token);
  //           setIsLogin(true);
  //           // initScreen = "LoggedInScreen";
  //         }
  //       }
  //     }
  //   }
  //
  //   checkLoginState();
  //   // let initScreen = "LoginScreen";
  // }, [])
  // console.log(isLogin)
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
