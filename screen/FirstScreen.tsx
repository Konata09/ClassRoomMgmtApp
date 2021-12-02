import * as React from 'react';
import {useEffect} from 'react';
import {getAsyncStorage, setAsyncStorage, updateGlobalStateFromJWT} from "../utils";
import {API, GlobalState} from "../App";
import {LoadingScreen} from "./LoadingScreen";

export function FirstScreen({navigation}) {
  useEffect(() => {
    async function checkLoginState() {
      const token = await getAsyncStorage("token");
      if (token) {
        updateGlobalStateFromJWT(token);
        if (GlobalState.tokenExp > Math.floor((Date.now() + 60000) / 1000)) { // 如果 Token 将在 1 分钟内过期 那么重新登录
          const res = await API.refreshPost({inlineObject11: {username: GlobalState.username, uid: GlobalState.uid}})
            .catch(_ => null);
          console.log("login: " + res);
          if (res && res.retcode === 0) {
            updateGlobalStateFromJWT(res.data.token);
            await setAsyncStorage("token", res.data.token);
            navigation.navigate("LoggedInScreen");
            return
          }
        }
      }
      navigation.navigate("LoginScreen");
    }

    checkLoginState()
  }, [])

  return (
    <LoadingScreen/>
  );
}
