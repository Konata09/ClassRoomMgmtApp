import React from "react";
import {Alert, BackHandler, Button, Image, ImageBackground, Text, TextInput, View} from "react-native";
import {API, GlobalState} from "../App";
import {Colors, Styles} from "../styles";
import {useFocusEffect} from "@react-navigation/native";
import { Buffer } from "buffer";

// @ts-ignore
export function LoginScreen({navigation, route}) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        Alert.alert("确认退出", "你确定要退出吗?", [
          {
            text: "取消",
            onPress: () => null,
            style: "cancel"
          },
          {text: "确定", onPress: () => BackHandler.exitApp()}
        ]);
        return true;
      };
      BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, []));
  React.useEffect(() => {
    if (route.params?.post) {
      // Post updated, do something with `route.params.post`
      // For example, send the post to the server
    }
  }, [route.params?.post]);
  const submitLogin = (): Promise<object> => {
    return new Promise((resolve, reject) => {
      API.loginPost({inlineObject3: {username: username, password: password}})
        .then(res => resolve(res))
        .catch(e => reject(e));
    });
  }
  return (
    <>
      <View style={{backgroundColor: 'deepskyblue', height: '30%'}}/>
      <View style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 100,
        backgroundColor: Colors.deepBg,
      }}>
        <TextInput style={Styles.loginInput} textContentType="username" autoCorrect={false} autoCapitalize="none"
                   placeholder="用户名" onChangeText={t => setUsername(t)}/>
        <TextInput style={Styles.loginInput} textContentType="password" secureTextEntry={true} autoCapitalize="none"
                   autoCorrect={false} placeholder="密码" onChangeText={t => setPassword(t)}/>
        <View style={{marginTop: 30}}>
          <Button
            title="登录"
            onPress={async () => {
              let res = await submitLogin().catch(e => Alert.alert("登录失败", `${e.message} ${e.status ? e.status : ''}`));
              if (res && res.retcode === 0) {
                API.updateHeader({"authorization": `Bearer ${res.data.token}`});
                const jwtPayload = res.data.token.split('.')[1];
                const jwtData = JSON.parse(Buffer.from(jwtPayload, 'base64').toString());
                GlobalState.uid = jwtData.uid;
                GlobalState.username = jwtData.username;
                GlobalState.rolename = jwtData.rolename;
                GlobalState.isAdmin = jwtData.isadmin;
                GlobalState.isStaff = jwtData.isstaff;
                GlobalState.phone = jwtData.phone;
                GlobalState.isLoggedIn = true;
                navigation.goBack();
              } else {
                Alert.alert("登录失败", `${res.message}`);
              }
            }}
          />
        </View>
      </View>
    </>
  );
}
