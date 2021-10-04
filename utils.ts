import {Buffer} from "buffer";
import {API, GlobalState} from "./App";
import {AsyncStorage} from "react-native";

export const updateGlobalStateFromJWT = (token: string) => {
  GlobalState.token = token;
  API.updateHeader({"authorization": `Bearer ${token}`});
  const jwtPayload = token.split('.')[1];
  const jwtData = JSON.parse(Buffer.from(jwtPayload, 'base64').toString());
  GlobalState.uid = jwtData.uid;
  GlobalState.username = jwtData.username;
  GlobalState.rolename = jwtData.rolename;
  GlobalState.isAdmin = jwtData.isadmin;
  GlobalState.isStaff = jwtData.isstaff;
  GlobalState.phone = jwtData.phone;
  GlobalState.tokenExp = jwtData.exp;
  // GlobalState.isLoggedIn = true;
}

export const setAsyncStorage = (key: string, value: string): Promise<void> => {
  return AsyncStorage.setItem(key, value);
}
export const getAsyncStorage = (key: string): Promise<string | null> => {
  return AsyncStorage.getItem(key);
}
