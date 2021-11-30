import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {HomeScreen} from "./HomeScreen";
import {DutyUserScreen} from "./DutyUserScreen";
import {TicketDetailScreen} from "./TicketDetailScreen";

const HomeStack = createStackNavigator();

export function HomeStackScreen() {
  return (
    <HomeStack.Navigator initialRouteName="MyHome">
      <HomeStack.Screen name="MyHome" component={HomeScreen} options={{headerShown: false}}/>
      <HomeStack.Screen name="DutyScreen" component={DutyUserScreen} options={{title: "值班表"}}/>
      <HomeStack.Screen name="TicketDetailScreen" component={TicketDetailScreen} options={{headerShown: false}}/>
    </HomeStack.Navigator>
  );
}
