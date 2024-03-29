import React, {useState} from "react";
import {Button, ScrollView, Text, View} from "react-native";
import {Colors, Styles} from "../styles";
// @ts-ignore
import Icon from "react-native-vector-icons/Ionicons";
import {createStackNavigator} from "@react-navigation/stack";
import {ClassroomsScreen} from "./ClassroomsScreen";
import {ClassroomStatusScreen} from "./ClassroomStatusScreen";
import {ClassroomDetailScreen} from "./ClassroomDetailScreen";

const MyStack = createStackNavigator();

// @ts-ignore
export function ClassroomsStackScreen({navigation, route}) {
  return (
    <MyStack.Navigator initialRouteName="Classrooms" screenOptions={{headerShown: false}}>
      <MyStack.Screen name="Classrooms" component={ClassroomsScreen}/>
      <MyStack.Screen name="ClassroomStatus" component={ClassroomStatusScreen}/>
      <MyStack.Screen name="ClassroomDetail" component={ClassroomDetailScreen}/>
    </MyStack.Navigator>
  );
}
