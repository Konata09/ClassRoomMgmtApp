import React, {useState} from "react";
import {Alert, Appearance, Button, ScrollView, Text, TextInput, View} from "react-native";
import {Colors, Styles} from "../styles";
// @ts-ignore
import Icon from "react-native-vector-icons/Ionicons";
import {API, GlobalState} from "../App";


// @ts-ignore
export function ClassroomDetailScreen({navigation, route}) {
  const {id: classId, group_name, name} = route.params;
  const [classDetail, setClassDetail] = React.useState({});
  const [isGetInit, setIsGetInit] = React.useState(false);
  const [classname, setClassname] = React.useState("");
  const [newGroupName, setNewGroupName] = React.useState("");
  const [changedDev, setChangedDev] = React.useState({});

  React.useEffect(() => {
    if (!isGetInit) {
      API.getRoomDetailGet({classid: classId})
        .then(res => {
          setClassDetail(res.data)
          setIsGetInit(true)
        })
        .catch(e => Alert.alert("获取数据失败", e.message + ' ' + e.status));
    }
  }, []);

  const updateDeviceIp = (devId: number, newIp: string) => {
    let prevDevs = [...classDetail.devices]
    for (const v of prevDevs) {
      if (v.id === devId) {
        v.ip = newIp
        break
      }
    }
    setClassDetail(prevState => ({
      ...prevState,
      devices: prevDevs
    }))
    let c = changedDev;
    c[devId] = true
    setChangedDev(c)
  }

  let DeviceItem = []
  if (classDetail.devices) {
    for (const v of classDetail.devices) {
      DeviceItem.push(
        <>
          <View style={Styles.menuCutoff}/>
          <View style={Styles.menuRowViewNew}>
            <Text style={Styles.menuText}>{v.name}</Text>
            <TextInput style={Styles.menuInput} onChangeText={t => updateDeviceIp(v.id, t)}>{v.ip}</TextInput>
          </View>
        </>
      )
    }
  }
  const getGroupIdByName = async (gName: string) => {
    let classrooms = []
    await API.getRoomsGet({ping: "false"}).then(res => classrooms = res.data.classrooms)
    for (const c of classrooms) {
      if (c.group_name == gName) {
        return c.group_id
      }
    }
    return undefined
  }
  const handleSubmit = async () => {
    const newGroupId = await getGroupIdByName(newGroupName || group_name)
    if (!newGroupId) {
      Alert.alert("分组不存在, 请联系管理员添加!")
      return
    }
    API.adminSetRoomPost({inlineObject10: {classid: classId, name: classname || name, groupid: newGroupId}})
      .then(r => console.debug(r))
      .catch(e => Alert.alert("修改失败", e.message + ' ' + e.status));
    for (let [key, value] of Object.entries(changedDev)) {
      if (value) {
        for (const v of classDetail.devices) {
          if (v.id == key) {
            await API.adminSetDevicePost({
              inlineObject12: {
                id: v.id,
                classid: classId,
                typeid: v.typeid,
                ip: v.ip,
                mac: v.mac
              }
            })
              .then(r => console.debug(r))
              .catch(e => Alert.alert("修改失败", e.message + ' ' + e.status));
            break
          }
        }
      }
    }
    navigation.goBack()
  }

  return (
    <ScrollView style={{backgroundColor: Colors.deepBg}}>
      <Text style={Styles.titleText}>
        {name}
      </Text>
      <View style={Styles.menuContainer}>
        <View style={Styles.menuRowViewNew}>
          <Text style={Styles.menuText}>教室名称</Text>
          <TextInput style={Styles.menuInput} onChangeText={t => setClassname(t)}>{name}</TextInput>
        </View>
        <View style={Styles.menuCutoff}/>
        <View style={Styles.menuRowViewNew}>
          <Text style={Styles.menuText}>分组</Text>
          <TextInput style={Styles.menuInput} onChangeText={t => setNewGroupName(t)}>{group_name}</TextInput>
        </View>
        {DeviceItem}
      </View>
      <View style={Styles.menuContainer}>
        <Button title="提交" color={Colors.iosBlue} onPress={() => (handleSubmit())}/>
      </View>
    </ScrollView>
  );
}
