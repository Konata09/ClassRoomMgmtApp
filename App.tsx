import React from 'react';
import {NavigationContainer, useFocusEffect} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
// @ts-ignore
import Ionicons from 'react-native-vector-icons/Ionicons';
import {HomeScreen} from "./screen/HomeScreen";
import {TicketScreen} from "./screen/TicketScreen";
import {ChangePhoneScreen} from "./screen/ChangePhoneScreen"

import {
  Alert,
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

export const API = new Api(
  new Configuration(
    {
      basePath: "http://172.31.161.101:63112/api/v2",
      // basePath: "http://172.31.168.150:63112/api/v2",
      // basePath: "http://172.31.55.199:63112/api/v2",
      // basePath: "http://10.0.3.59:63112/api/v2",
      headers: {
        "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJyb2xlbmFtZSI6ImFkbWluIiwiaXNhZG1pbiI6dHJ1ZSwiaXNzdGFmZiI6dHJ1ZSwicGhvbmUiOjAsImV4cCI6MTYzMjEwMDY0MCwiaWF0IjoxNjMxNDk1ODQwfQ.4q4ujZ19kbFZlb9LuGe3U3ToKHuW1vWXe3Iql3zGsUs"
      }
    }
  )
)

const test = API.getMyTicketGet({
  userid: "1"
}).then((a) => console.log(a))

export var GlobalState = {
  isLoggedIn: true,
  isAdmin: true,
  isStaff: true,
  uid: 1,
  token: "jwt",
  username: "admin"
}

const RootStack = createStackNavigator();
const Tab = createBottomTabNavigator();

function LoggedInScreen() {
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        Alert.alert("Hold on!", "Are you sure you want to Exit?", [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel"
          },
          {text: "YES", onPress: () => BackHandler.exitApp()}
        ]);
        return true;
      };
      BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, []));

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
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
      })}
      tabBarOptions={{
        activeTintColor: Colors.iosBlue,
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen name="Home" component={HomeScreen}/>
      <Tab.Screen name="Classroom" component={ClassroomsStackScreen}/>
      <Tab.Screen name="Ticket" component={TicketStackScreen}/>
      <Tab.Screen name="My" component={MyStackScreen}/>
    </Tab.Navigator>)
}

const App = () => {
    // console.log(GlobalState.isLoggedIn)
    return (
        <NavigationContainer>
          <RootStack.Navigator initialRouteName={GlobalState.isLoggedIn ? "LoggedInScreen" : "登录"}>
            <RootStack.Screen name="LoggedInScreen" component={LoggedInScreen} options={{headerShown: false}}/>
            <RootStack.Screen name="登录" component={LoginScreen} options={{headerShown: false}}/>
          </RootStack.Navigator>
        </NavigationContainer>
    );
  }
;

export default App;
