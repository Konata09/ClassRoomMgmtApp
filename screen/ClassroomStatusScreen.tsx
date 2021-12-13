import React from "react";
import {Alert, RefreshControl, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {Colors, Styles} from "../styles";
import {VLCPlayer} from 'react-native-vlc-media-player';
import {API} from "../App";
import Feather from "react-native-vector-icons/Feather";
import {getControllerColor} from "./ClassroomsScreen";

export function ClassroomStatusScreen({navigation, route}) {
  const deviceTypeMap = {
    1: "中控",
    2: "云盒",
    3: "交换机(Ruijie)",
    4: "大华摄像头",
    5: "天地伟业摄像头",
    6: "网络对讲",
    7: "教师画面(电子云台)",
    8: "屏幕编码器",
    9: "教师画面(机械云台)",
    10: "学生画面",
    11: "电子班牌",
    12: "交换机(H3C)"
  }
  const {id: classId, group_name, name} = route.params;
  const [courseName, setCourseName] = React.useState("");
  const [teacherName, setTeacherName] = React.useState("");
  const [classStatus, setClassStatus] = React.useState({});
  const [classDetail, setClassDetail] = React.useState({});
  const [isGetInit, setIsGetInit] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [PingItemComponents, setPingItemComponents] = React.useState([]);
  const [powerIconColor, setPowerIconColor] = React.useState(Colors.deepBg);

  React.useEffect(() => {
    if (!isGetInit || refreshing) {
      API.getRoomStatusGet({classid: classId})
        .then(res => {
          // console.log(res)
          setClassStatus(res.data);
          setIsGetInit(true);
        })
        .catch(e => Alert.alert("获取数据失败", e.message + ' ' + e.status));
      API.getRoomDetailGet({classid: classId})
        .then(res => {
          // console.log(res)
          setClassDetail(res.data);
          setRefreshing(false);
        })
        .catch(e => Alert.alert("获取数据失败", e.message + ' ' + e.status));
    }
  }, [refreshing]);

  React.useEffect(() => {
    if (classStatus.DeviceStatus && classDetail.devices) {
      for (const d of classStatus.DeviceStatus) {
        if (findDeviceTypeById(d.Id) === 1) {
          setPowerIconColor(getControllerColor(d.Status));
        }
      }
    }
  }, [classStatus, classDetail])

  React.useEffect(() => {
    let PingItemComponentsTmp = [];
    if (classStatus.DeviceStatus && classDetail.devices) {
      for (let i = 1; i < classStatus.DeviceStatus.length; i++) {
        PingItemComponentsTmp.push(<PingItemComponent status={classStatus.DeviceStatus[i]}/>)
      }
    }
    setPingItemComponents(PingItemComponentsTmp)
  }, [classStatus, classDetail])

  React.useEffect(() => {
    if (classStatus.CourseName && classStatus.TeacherName) {
      setTeacherName(classStatus.TeacherName);
      setCourseName(classStatus.CourseName);
    }
  }, [classStatus])

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
          <Text style={props.disabled ? Styles.cmdButtonDisabledText : Styles.cmdButtonText}>{props.title}</Text>
        </View>
      </TouchableOpacity>
    )
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
      if (cam.device_type === 4) { // DaHua
        VideoCard.unshift(
          <View style={Styles.videoCard}>
            <VLCPlayer
              style={{width: 326, height: 183}}
              videoAspectRatio="16:9"
              source={{uri: cam.rtsp_addr.substring(0, 7) + "admin:abc123456@" + cam.rtsp_addr.substring(7)}}
            />
          </View>
        )
      } else if (cam.device_type === 7 || cam.device_type === 9 || cam.device_type === 10) { // ZhiBo
        VideoCard.unshift(
          <View style={Styles.videoCard}>
            <VLCPlayer
              style={{width: 326, height: 183}}
              videoAspectRatio="16:9"
              source={{uri: cam.rtsp_addr}}
            />
          </View>
        )
      } else if (cam.device_type === 8) { // Screen Encoder
        VideoCard.push(
          <View style={Styles.videoCard}>
            <VLCPlayer
              style={{width: 326, height: 183}}
              videoAspectRatio="16:9"
              source={{uri: cam.rtsp_addr}}
            />
          </View>
        )
      } else if (cam.device_type === 5) { // Tiandy
        VideoCard.push(
          <View style={Styles.videoCard}>
            <VLCPlayer
              style={{width: 326, height: 183}}
              videoAspectRatio="16:9"
              source={{uri: cam.rtsp_addr.substring(0, 7) + "admin:admin@" + cam.rtsp_addr.substring(7)}}
            />
          </View>
        )
      }
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
        }}
      />
    }>
      <View style={Styles.cardContainer}>
        <View style={Styles.classroomHeader}>
          <View style={{flexDirection: "column", flex: 1}}>
            <View style={{flexDirection: "row", alignItems: "center"}}>
              <Text style={Styles.bigName}>
                {name}
              </Text>
              <View style={{alignItems: "center", flex: 1}}>
                <Text style={Styles.courseName} numberOfLines={1}>
                  {courseName}
                </Text>
              </View>
            </View>
            <View style={{flexDirection: "row"}}>
              <Text style={Styles.smallName}>
                {group_name}
              </Text>
              <View style={{alignItems: "center", flex: 1}}>
                <Text style={Styles.teacherName}>
                  {teacherName}
                </Text>
              </View>
            </View>
          </View>
          <View style={Styles.classStatusIconContainer}>
            <Feather name={"power"} style={{color: powerIconColor}} size={26}/>
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
          <MyButton title={"投影云盒"} cmdId={5} disabled={1}/>
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
