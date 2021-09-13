import React, {useState} from "react";
import {Button, Platform, ScrollView, Switch, Text, TextInput, View} from "react-native";
import {Colors, Styles} from "../styles";
// @ts-ignore
import Icon from "react-native-vector-icons/Ionicons";
import {GlobalState} from "../App";

// @ts-ignore
export function NotificationSettingScreen({navigation, route}) {
  let [color1, setColor1] = useState(Colors.highlightBg)
  let [color3, setColor3] = useState(Colors.highlightBg)
  let [color4, setColor4] = useState(Colors.highlightBg)
  const [isDutyTicketNotify, setIsDutyTicketNotify] = useState(false);
  const [isNewTicketNotify, setNewTicketNotify] = useState(false);
  const [isDutyDayNotify, setDutyDayNotify] = useState(false);
  const toggleIsDutyTicketNotify = () => setIsDutyTicketNotify(previousState => !previousState);
  const toggleIsNewTicketNotify = () => setNewTicketNotify(previousState => !previousState);
  const toggleIsDutyDayNotify = () => setDutyDayNotify(previousState => !previousState);
  return (
    <>
      <View style={Styles.menuContainer}>
        <View style={[Styles.menuRowView, {
          borderTopLeftRadius: 11,
          borderTopRightRadius: 11,
          paddingTop: 2,
          backgroundColor: color1
        }]}
              onTouchStart={() => setColor1(Colors.itemTouching)}
              onTouchEnd={() => setColor1(Colors.highlightBg)}>
          <Text style={Styles.menuText}>负责工单开始通知</Text>
          <Switch
            style={Styles.switchStyle}
            trackColor={{false: Colors.switchBg, true: Colors.iosGreen}}
            thumbColor={Platform.OS === 'ios' ? undefined : "#ffffff"}
            // ios_backgroundColor="#3e3e3e"
            onValueChange={toggleIsDutyTicketNotify}
            value={isDutyTicketNotify}
          />
        </View>
        <View style={Styles.menuCutoff}/>
        <View style={[Styles.menuRowView, {backgroundColor: color3}]}
              onTouchStart={() => setColor3(Colors.itemTouching)} onTouchEnd={() => {
          setColor3(Colors.highlightBg);
          navigation.navigate("通知设置")
        }}>
          <Text style={Styles.menuText}>新工单通知</Text>
          <Switch
            style={Styles.switchStyle}
            trackColor={{false: Colors.switchBg, true: Colors.iosGreen}}
            thumbColor={Platform.OS === 'ios' ? undefined : "#ffffff"}
            // ios_backgroundColor="#3e3e3e"
            onValueChange={toggleIsNewTicketNotify}
            value={isNewTicketNotify}
          />

        </View>
        <View style={Styles.menuCutoff}/>
        <View style={[Styles.menuRowView, {
          borderBottomLeftRadius: 11,
          borderBottomRightRadius: 11,
          paddingBottom: 2,
          backgroundColor: color4
        }]}
              onTouchStart={() => setColor4(Colors.itemTouching)} onTouchEnd={() => setColor4(Colors.highlightBg)}>
          <Text style={Styles.menuText}>值班通知</Text>
          <Switch
            style={Styles.switchStyle}
            trackColor={{false: Colors.switchBg, true: Colors.iosGreen}}
            thumbColor={Platform.OS === 'ios' ? undefined : "#ffffff"}
            // ios_backgroundColor="#3e3e3e"
            onValueChange={toggleIsDutyDayNotify}
            value={isDutyDayNotify}
          />
        </View>
      </View>
    </>
  );
}
