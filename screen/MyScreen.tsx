import React, {useState} from "react";
import {Button, ScrollView, Text, View} from "react-native";
import {Colors, Styles} from "../styles";
// @ts-ignore
import Icon from "react-native-vector-icons/Ionicons";
import {GlobalState} from "../App";
import {LoginScreen} from "./LoginScreen";
import {ChangePhoneScreen} from "./ChangePhoneScreen";
import {createStackNavigator} from "@react-navigation/stack";

// @ts-ignore
export function MyScreen({navigation, route}) {
  let [color1, setColor1] = useState(Colors.highlightBg)
  let [color2, setColor2] = useState(Colors.highlightBg)
  let [color3, setColor3] = useState(Colors.highlightBg)
  let [color4, setColor4] = useState(Colors.highlightBg)
  let [color5, setColor5] = useState(Colors.highlightBg)
  return (
    <ScrollView style={{backgroundColor: Colors.deepBg}}>
      <Text style={Styles.titleText}>
        {GlobalState.username}
      </Text>
      <View style={Styles.menuContainer}>
        <View style={[Styles.menuRowView, {
          borderTopLeftRadius: 11,
          borderTopRightRadius: 11,
          paddingTop: 2,
          backgroundColor: color1
        }]}
              onTouchStart={() => setColor1(Colors.itemTouching)}
              onTouchEnd={() => {
                setColor1(Colors.highlightBg);
                navigation.navigate("修改密码")
              }}>
          <Text style={Styles.menuText}>修改密码</Text>
          <Icon name='ios-chevron-forward-outline' style={Styles.menuItemIconSize}/>
        </View>
        <View style={Styles.menuCutoff}/>
        <View style={[Styles.menuRowView, {backgroundColor: color2}]}
              onTouchStart={() => setColor2(Colors.itemTouching)} onTouchEnd={() => {
          setColor2(Colors.highlightBg);
          navigation.navigate("修改手机")
        }}>
          <Text style={Styles.menuText}>修改手机</Text>
          <Icon name='ios-chevron-forward-outline' style={Styles.menuItemIconSize}/>
        </View>
        <View style={Styles.menuCutoff}/>
        <View style={[Styles.menuRowView, {backgroundColor: color3}]}
              onTouchStart={() => setColor3(Colors.itemTouching)} onTouchEnd={() => {
          setColor3(Colors.highlightBg);
          navigation.navigate("通知设置")
        }}>
          <Text style={Styles.menuText}>通知设置</Text>
          <Icon name='ios-chevron-forward-outline' style={Styles.menuItemIconSize}/>
        </View>
        {GlobalState.isAdmin ?
          <>
            <View style={Styles.menuCutoff}/>
            <View style={[Styles.menuRowView, {backgroundColor: color5}]}
                  onTouchStart={() => setColor5(Colors.itemTouching)}
                  onTouchEnd={() => {
                    setColor5(Colors.highlightBg);
                    navigation.navigate("修改值班表")
                  }}>
              <Text style={Styles.menuText}>修改值班表</Text>
              <Icon name='ios-chevron-forward-outline' style={Styles.menuItemIconSize}/>
            </View>
          </>
          : undefined}
        <View style={Styles.menuCutoff}/>
        <View style={[Styles.menuRowView, {
          borderBottomLeftRadius: 11,
          borderBottomRightRadius: 11,
          paddingBottom: 2,
          backgroundColor: color4
        }]}
              onTouchStart={() => setColor4(Colors.itemTouching)} onTouchEnd={() => {
          setColor4(Colors.highlightBg);
          navigation.navigate("值班时间设置")
        }}>
          <Text style={Styles.menuText}>值班时间设置</Text>
          <Icon name='ios-chevron-forward-outline' style={Styles.menuItemIconSize}/>
        </View>
      </View>
      <View style={Styles.menuContainer}>
        <Button title="注销" color={Colors.iosRed} onPress={() => (navigation.navigate("修改密码"))}/>
      </View>
    </ScrollView>
  );
}
