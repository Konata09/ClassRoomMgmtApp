import React, {useState} from "react";
import {Button, ScrollView, Text, View} from "react-native";
import {Colors, Styles} from "../styles";
// @ts-ignore
import Icon from "react-native-vector-icons/Ionicons";
import {GlobalState} from "../App";
import {LoginScreen} from "./LoginScreen";
import {ChangePhoneScreen} from "./ChangePhoneScreen";
import {createStackNavigator} from "@react-navigation/stack";
import {MyScreen} from "./MyScreen";
import {ChangePasswordScreen} from "./ChangePasswordScreen";
import {NotificationSettingScreen} from "./NotificationSettingScreen";
import {DutyTimeSettingScreen} from "./DutyTimeSettingScreen";
import {ChangeDutyUserScreen} from "./ChangeDutyUserScreen";

const MyStack = createStackNavigator();

// @ts-ignore
export function MyStackScreen({navigation, route}) {
  return (
    <MyStack.Navigator initialRouteName="MyHome">
      <MyStack.Screen name="MyHome" component={MyScreen} options={{headerShown: false}}/>
      <MyStack.Screen name="修改手机" component={ChangePhoneScreen}/>
      <MyStack.Screen name="修改密码" component={ChangePasswordScreen}/>
      <MyStack.Screen name="通知设置" component={NotificationSettingScreen}/>
      <MyStack.Screen name="值班时间设置" component={DutyTimeSettingScreen}/>
      <MyStack.Screen name="修改值班表" component={ChangeDutyUserScreen}/>
    </MyStack.Navigator>
  );
}
