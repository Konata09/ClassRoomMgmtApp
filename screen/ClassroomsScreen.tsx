import React from "react";
import {Alert, RefreshControl, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {Colors, Styles} from "../styles";
import Icon from "react-native-vector-icons/Ionicons";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import {API} from "../App";
import {LoadingScreen} from "./LoadingScreen";

export const getControllerColor = (status: number) => {
  switch (status) {
    case -1:
      return Colors.tabBorder
    case 0:
      return Colors.highlightBg
    case 1:
      return Colors.iosGreen
    case 2:
      return Colors.iconOff
    case 3:
      return Colors.iosYellow
    case 4:
      return Colors.iosPurple
  }
}

// @ts-ignore
export function ClassroomsScreen({navigation, route}) {
  const [classStatus, setClassStatus] = React.useState({});
  const [isGetInit, setIsGetInit] = React.useState(false);
  const [groups, setGroups] = React.useState({});
  const [refreshing, setRefreshing] = React.useState(false);

  React.useEffect(() => {
    fetchData();
    return navigation.addListener('focus', () => {
      fetchData();
    });
  }, [refreshing]);

  const fetchData = () => {
    API.getRoomsGet({ping: "true"})
      .then(res => {
        setClassStatus(res.data);
        setIsGetInit(true);
        setRefreshing(false);
      })
      .catch(e => Alert.alert("获取数据失败", e.message + ' ' + e.status));
  }

  React.useEffect(() => {
    if (typeof classStatus.classrooms !== 'undefined' && Object.keys(groups).length === 0) {
      let tmp_g = groups
      classStatus.classrooms.map(s => {
        let id = s.group_id
        if (!tmp_g.hasOwnProperty(id)) {
          tmp_g[id] = s.group_name
        }
      })
      setGroups(tmp_g)
    }
  }, [classStatus]);
  const getLindgeColor = (status: number) => {
    switch (status) {
      case -1:
        return Colors.iconOff
      case 0:
        return Colors.highlightBg
      default:
        return Colors.iosBlue
    }
  }
  const handleTouch = (id: number, group_name: string, name: string) => {
    navigation.push("ClassroomStatus", {id: id, group_name: group_name, name: name})
  }
  const ClassComponent = (props) => {
    return (
      <View style={Styles.classroomComponent}>
        <TouchableOpacity onPress={() => handleTouch(props.class.id, props.class.group_name, props.class.name)}>
          <View style={Styles.classroomRect}>
            <FontAwesome5 style={{
              left: 20,
              top: 15,
              fontSize: 25,
              color: getControllerColor(props.class.controller),
              position: "absolute"
            }}
                          name={"server"} light/>
            <Icon style={{
              left: 65,
              top: 15,
              fontSize: 25,
              color: getLindgeColor(props.class.lindge),
              position: "absolute"
            }}
                  name={"ios-logo-windows"}/>
            <FontAwesome5 style={{
              left: 65,
              top: 65,
              fontSize: 25,
              color: props.class.live ? Colors.iosOrange : Colors.iconOff,
              position: "absolute"
            }}
                          name={"satellite-dish"} light/>
            <Entypo style={{
              left: 20,
              top: 65,
              fontSize: 25,
              color: props.class.rec ? Colors.iosOrange : Colors.iconOff,
              position: "absolute"
            }}
                    name={"controller-record"}/>
          </View>
        </TouchableOpacity>
        <Text style={Styles.classroomRectName}>{props.class.name}</Text>
      </View>
    )
  }

  let groupCount = Object.keys(groups).length
  let ClassroomsGroups = new Array(groupCount + 1)
  for (let i = 1; i < groupCount + 1; i++) {
    ClassroomsGroups[i] = new Array([])
  }
  let Groups = [];

  for (let i = 0; i < groupCount; i++) {
    let [id, name] = Object.entries(groups)[i] // 组id和name
    for (const v of classStatus.classrooms) {
      if (v.group_id == id) { // 教室属于本组
        ClassroomsGroups[id].push(<ClassComponent class={v} key={v.id}/>)
      }
    }
    Groups.push(
      <>
        <View><Text style={Styles.sectionTitleText}>{name}</Text></View>
        <View style={Styles.classroomContainer}>
          {ClassroomsGroups[id]}
        </View>
      </>
    )
  }

  return (
    isGetInit ? <ScrollView refreshControl={
      <RefreshControl
        refreshing={false}
        onRefresh={() => {
          setRefreshing(true)
        }}
      />
    }>
      <View style={Styles.listContainer}>
        {Groups}
      </View>
    </ScrollView> : <LoadingScreen/>
  )
}
