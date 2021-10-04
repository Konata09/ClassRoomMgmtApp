import React, {useState} from "react";
import {Alert, Button, Dimensions, RefreshControl, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {Colors, Styles} from "../styles";
import {VLCPlayer, VlCPlayerView} from 'react-native-vlc-media-player';
import {API} from "../App";
import {isValidNumber} from "react-native-gesture-handler/lib/typescript/web/utils";
import Feather from "react-native-vector-icons/Feather";
import {getControllerColor} from "./ClassroomsScreen";

// @ts-ignore
export function ClassroomStatusScreen({navigation, route}) {
  const {id: classId, group_name, name} = route.params;
  const [classStatus, setClassStatus] = React.useState({});
  const [classDetail, setClassDetail] = React.useState({});
  const [isGetInit, setIsGetInit] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false)
  const deviceTypeMap = {
    1: "中控",
    2: "云盒",
    3: "交换机",
    4: "大华摄像头",
    5: "天地伟业摄像头",
    6: "网络对讲",
    7: "直播摄像头",
    8: "屏幕编码器",
  }
  React.useEffect(() => {
    if (!isGetInit || refreshing) {
      API.getRoomStatusGet({classid: classId})
        .then(res => {
          setClassStatus(res.data)
          setRefreshing(false)
        })
        .catch(e => Alert.alert("获取数据失败", e.message + ' ' + e.status));
      API.getRoomDetailGet({classid: classId})
        .then(res => {
          setClassDetail(res.data)
          setIsGetInit(true)
        })
        .catch(e => Alert.alert("获取数据失败", e.message + ' ' + e.status));
    }
  }, [refreshing]);
  const findDeviceNameById = (id: string) => {
    for (const v of classDetail.devices) {
      if (v.id === id) {
        return v.name;
      }
    }
  }
  const findDeviceTypeById = (id: string) => {
    for (const v of classDetail.devices) {
      if (v.id === id) {
        return v.typeid;
      }
    }
  }
  const getDevicePingMs = (us: number) => {
    if (us == -1) {
      return "超时"
    }
    return (us / 1000).toFixed(2)
  }
  const PingItemComponent = (props) => {
    return (
      <View style={Styles.pingItem}>
        <Text style={Styles.pingName}>{findDeviceNameById(props.status.Id)}</Text>
        <View style={Styles.pingRes}>
          <Text style={Styles.pingMs}>{getDevicePingMs(props.status.Ping)}</Text>
          <Text style={Styles.pingUnit}>ms</Text>
        </View>
      </View>
    )
  }
  const MyButton = (props) => {
    return (
      <TouchableOpacity onPress={() => sendCmd(props.cmdId)}>
        <View style={Styles.cmdButtonWrapper}>
          <Text style={Styles.cmdButtonText}>{props.title}</Text>
        </View>
      </TouchableOpacity>
    )
  }
  let PingItemComponents = [];
  if (classStatus.DeviceStatus) {
    for (let i = 1; i < classStatus.DeviceStatus.length; i++) {
      PingItemComponents.push(<PingItemComponent status={classStatus.DeviceStatus[i]}/>)
    }
  }
  const cmdNameMap = {
    1: "中控开",
    2: "中控关",
    3: "云盒开",
    4: "云盒关",
    5: "投影云盒",
    6: "幕布升",
    7: "幕布停",
    8: "幕布降",
    9: "音量加",
    10: "音量减",
    11: "静音",
    12: "静音取消",
    13: "投影开",
    14: "投影关",
  }
  const sendCmd = (id: number) => {
    API.sendCmdPost({inlineObject9: {cmdId: id, classId: classId, className: name, cmdName: cmdNameMap.id}})
      .then(res => {
        console.debug(res)
      })
      .catch(e => Alert.alert("发送命令失败", e.message + ' ' + e.status));
  }
  let VideoCard = []
  if (classDetail.cameras) {
    for (const cam of classDetail.cameras) {
      if (cam.device_type === 4) {
        VideoCard.push(
          <View style={Styles.videoCard}>
            <VLCPlayer
              style={{width: 326, height: 183}}
              videoAspectRatio="16:9"
              source={{uri: cam.rtsp_addr.substring(0, 7) + "admin:abc123456@" + cam.rtsp_addr.substring(7)}}
            />
          </View>
        )
      } else if (cam.device_type === 7) {
        VideoCard.push(
          <View style={Styles.videoCard}>
            <VLCPlayer
              style={{width: 326, height: 183}}
              videoAspectRatio="16:9"
              source={{uri: cam.rtsp_addr}}
            />
          </View>
        )
      } else if (cam.device_type === 8) {
        VideoCard.push(
          <View style={Styles.videoCard}>
            <VLCPlayer
              style={{width: 244, height: 183}}
              videoAspectRatio="4:3"
              source={{uri: cam.rtsp_addr}}
            />
          </View>
        )
      }
    }
  }
  const getControllerColorInStatusScreen = () => {
    if (classStatus.DeviceStatus) {
      for (const d of classStatus.DeviceStatus) {
        if (findDeviceTypeById(d.Id) === 1) {
          return getControllerColor(d.Status)
        }
      }
      return Colors.deepBg
    }
  }
  const handleTouch = (id: number, group_name: string, name: string) => {
    navigation.push("ClassroomDetail", {id: id, group_name: group_name, name: name})
  }

  return (
    <ScrollView refreshControl={
      <RefreshControl
        refreshing={false}
        onRefresh={() => {
          setRefreshing(true)
          console.log("ref")
        }}
      />
    }>
      <View style={Styles.cardContainer}>
        <View style={Styles.classroomHeader}>
          <View>
            <Text style={Styles.bigName}>
              {name}
            </Text>
            <Text style={Styles.smallName}>
              {group_name}
            </Text>
          </View>
          <View style={Styles.classStatusIconContainer}>
            <Feather name={"power"} style={{color: getControllerColorInStatusScreen() || Colors.deepBg}} size={26}/>
            <TouchableOpacity onPress={() => handleTouch(classId, group_name, name)}>
              <Feather name={"edit"} style={{marginLeft: 15, color: Colors.iosBlue}} size={26}/>
            </TouchableOpacity>
          </View>
        </View>
        <View style={Styles.pingCard}>
          {PingItemComponents}
        </View>
        <View style={Styles.cmdCard}>
          <MyButton title={"中控开"} cmdId={1}/>
          <MyButton title={"中控关"} cmdId={2}/>
          <MyButton title={"云盒开"} cmdId={3}/>
          <MyButton title={"云盒关"} cmdId={4}/>
          <MyButton title={"投影云盒"} cmdId={5}/>
          <MyButton title={"幕布升"} cmdId={6}/>
          <MyButton title={"幕布停"} cmdId={7}/>
          <MyButton title={"幕布降"} cmdId={8}/>
          <MyButton title={"音量加"} cmdId={9}/>
          <MyButton title={"音量减"} cmdId={10}/>
          <MyButton title={"静音"} cmdId={11}/>
          <MyButton title={"静音取消"} cmdId={12}/>
          <MyButton title={"投影开"} cmdId={13}/>
          <MyButton title={"投影关"} cmdId={14}/>
        </View>
        {VideoCard}
      </View>
    </ScrollView>
  );
}
