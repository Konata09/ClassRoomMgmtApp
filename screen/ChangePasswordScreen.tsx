import React, {useState} from "react";
import {Button, ScrollView, Text, TextInput, View} from "react-native";
import {Colors, Styles} from "../styles";
// @ts-ignore
import Icon from "react-native-vector-icons/Ionicons";
import {GlobalState} from "../App";

// @ts-ignore
export function ChangePasswordScreen({navigation, route}) {
  return (
    <>
      <View style={Styles.menuContainer}>
        <TextInput style={Styles.textInput} textContentType={"password"} secureTextEntry={true} placeholder={"请输入原密码"} placeholderTextColor={Colors.lightText}/>
        <View style={Styles.menuCutoff}/>
        <TextInput style={Styles.textInput} textContentType={"password"} secureTextEntry={true} placeholder={"请输入新密码"} placeholderTextColor={Colors.lightText}/>
        <View style={Styles.menuCutoff}/>
        <TextInput style={Styles.textInput} textContentType={"password"} secureTextEntry={true} placeholder={"请再次输入新密码"} placeholderTextColor={Colors.lightText}/>
      </View>
      <View style={Styles.menuContainer}>
        <Button title="提交" color={Colors.iosBlue} onPress={() => (navigation.pop())}/>
      </View>
    </>
  );
}
