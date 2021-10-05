import React, {useEffect} from "react";
import {Alert, BackHandler, Button, Image, ImageBackground, Text, TextInput, View} from "react-native";
import {API, GlobalState} from "../App";
import {Colors, Styles} from "../styles";
import {useFocusEffect} from "@react-navigation/native";
import {Buffer} from "buffer";
import {getAsyncStorage, setAsyncStorage, updateGlobalStateFromJWT} from "../utils";

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

  // useEffect(() => {
  //   let isLogin = false;
  //   async function checkLoginState() {
  //     const token = await getAsyncStorage("token");
  //     if (token) {
  //       updateGlobalStateFromJWT(token);
  //       if (GlobalState.tokenExp > Math.floor((Date.now() + 60000)/1000)) { // 如果 Token 将在 1 分钟内过期 那么重新登录
  //         const res = await API.refreshPost({inlineObject11: {username: GlobalState.username, uid: GlobalState.uid}})
  //           .catch(_ => null);
  //         if (res && res.retcode === 0) {
  //           updateGlobalStateFromJWT(res.data.token);
  //           await setAsyncStorage("token", res.data.token);
  //           isLogin = true;
  //           // setIsLogin(true);
  //           // initScreen = "LoggedInScreen";
  //         }
  //       }
  //     }
  //   }
  //   checkLoginState().then(()=>{
  //     console.log(isLogin)
  //     if (isLogin){
  //       navigation.navigate("LoggedInScreen");
  //     }
  //   })
  //   // let initScreen = "LoginScreen";
  // }, [])

  const submitLogin = (): Promise<object> => {
    return API.loginPost({inlineObject3: {username: username, password: password}});
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
                updateGlobalStateFromJWT(res.data.token);
                await setAsyncStorage("token", res.data.token);
                navigation.navigate("LoggedInScreen");
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
