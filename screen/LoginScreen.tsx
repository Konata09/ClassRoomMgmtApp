import React from "react";
import {Button, Image, ImageBackground, Text, TextInput, View} from "react-native";
import {GlobalState} from "../App";
import {Colors, Styles} from "../styles";

// @ts-ignore
export function LoginScreen({navigation, route}) {
  const [username, setUsername] = React.useState(0);
  React.useEffect(() => {
    if (route.params?.post) {
      // Post updated, do something with `route.params.post`
      // For example, send the post to the server
    }
  }, [route.params?.post]);

  return (
    <>
      <View style={{backgroundColor: 'deepskyblue', height: '30%'}}/>
      <View style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 100,
        backgroundColor: Colors.deepBg
      }}>
        <TextInput style={Styles.loginInput} textContentType="username" autoCorrect={false} autoCapitalize="none"
                   placeholder="用户名"/>
        <TextInput style={Styles.loginInput} textContentType="password" secureTextEntry={true} autoCapitalize="none"
                   autoCorrect={false} placeholder="密码"/>
        <View style={{marginTop: 30}}>
          <Button
            title="登录"
            onPress={() => {
              GlobalState.isLoggedIn = true
              navigation.navigate('LoggedInScreen', {screen: "Home"})
            }}
          />
        </View>
      </View>

    </>
  );
}
