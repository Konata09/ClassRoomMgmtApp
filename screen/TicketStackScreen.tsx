import React, {useState} from "react";
import {Button, ScrollView, Text, View} from "react-native";
import {Colors, Styles} from "../styles";
// @ts-ignore
import Icon from "react-native-vector-icons/Ionicons";
import {createStackNavigator} from "@react-navigation/stack";
import {ClassroomStatusScreen} from "./ClassroomStatusScreen";
import {ClassroomDetailScreen} from "./ClassroomDetailScreen";
import {TicketScreen} from "./TicketScreen";
import {AddTicketScreen} from "./AddTicketScreen";
import {TicketDetailScreen} from "./TicketDetailScreen";

const MyStack = createStackNavigator();

// @ts-ignore
export function TicketStackScreen({navigation, route}) {
  return (
    <MyStack.Navigator initialRouteName="Tickets">
      <MyStack.Screen name="Tickets" component={TicketScreen} options={{headerShown: false}}/>
      <MyStack.Screen name="新建工单" component={AddTicketScreen} options={{headerShown: true}}/>
      <MyStack.Screen name="Ticket Detail" component={TicketDetailScreen} options={{headerShown: false}}/>
    </MyStack.Navigator>
  );
}
