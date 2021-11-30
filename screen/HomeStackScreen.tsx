import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {HomeScreen} from "./HomeScreen";
import {DutyUserScreen} from "./DutyUserScreen";

const HomeStack = createStackNavigator();

export function HomeStackScreen() {
  return (
    <HomeStack.Navigator initialRouteName="MyHome">
      <HomeStack.Screen name="MyHome" component={HomeScreen} options={{headerShown: false}}/>
      <HomeStack.Screen name="DutyScreen" component={DutyUserScreen} options={{title: "值班表"}}/>
    </HomeStack.Navigator>
  );
}
