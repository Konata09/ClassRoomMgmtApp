import React from "react";
import {Alert, ScrollView, Text, View} from "react-native";
import {Styles} from "../styles";
import {API} from "../App";
import {Picker} from "@react-native-picker/picker";

export function DutyUserScreen() {
  const [mondayDutyData, setMondayDutyData] = React.useState([]);
  const [tuesdayDutyData, setTuesdayDutyData] = React.useState([]);
  const [wednesdayDutyData, setWednesdayDutyData] = React.useState([]);
  const [thursdayDutyData, setThursdayDutyData] = React.useState([]);
  const [fridayDutyData, setFridayDutyData] = React.useState([]);
  const [saturdayDutyData, setSaturdayDutyData] = React.useState([]);
  const [sundayDutyData, setSundayDutyData] = React.useState([]);
  const [userData, setUserData] = React.useState([]);

  // 更新数据
  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    // 获取值班表数据
    API.getDutyCalendarGet({})
      .then((res) => {
        setMondayDutyData(res.data.monday);
        setTuesdayDutyData(res.data.tuesday);
        setWednesdayDutyData(res.data.wednesday);
        setThursdayDutyData(res.data.thursday);
        setFridayDutyData(res.data.friday);
        setSaturdayDutyData(res.data.saturday);
        setSundayDutyData(res.data.sunday);
      })
      .catch(e => Alert.alert("获取数据失败", e.message + ' ' + e.status));
    // 获取所有用户UID和用户名
    API.adminSetUserGet({})
      .then((res) => {
        setUserData(res.data);
      })
      .catch(e => Alert.alert("获取数据失败", e.message + ' ' + e.status));
  }

  let pickerItems = [];
  for (let i = 0; i < userData.count; i++) {
    pickerItems.push(<Picker.Item key={i} value={userData.users[i].uid} label={userData.users[i].username}/>)
  }

  return (
    <ScrollView>
      <View style={Styles.listContainer}>
        <View><Text style={Styles.sectionTitleText}>星期一</Text></View>
        <View style={Styles.dutyCardContainer}>
          {mondayDutyData.map((o, i) => {
            return <View style={Styles.dutyCard}><Text style={Styles.dutyCardText}>{o.username}</Text></View>
          })}
        </View>
        <View><Text style={Styles.sectionTitleText}>星期二</Text></View>
        <View style={Styles.dutyCardContainer}>

          {tuesdayDutyData.map((o, i) => {
            return <View style={Styles.dutyCard}><Text style={Styles.dutyCardText}>{o.username}</Text></View>
          })}
        </View>
        <View><Text style={Styles.sectionTitleText}>星期三</Text></View>
        <View style={Styles.dutyCardContainer}>
          {wednesdayDutyData.map((o, i) => {
            return <View style={Styles.dutyCard}><Text style={Styles.dutyCardText}>{o.username}</Text></View>
          })}
        </View>
        <View><Text style={Styles.sectionTitleText}>星期四</Text></View>
        <View style={Styles.dutyCardContainer}>
          {thursdayDutyData.map((o, i) => {
            return <View style={Styles.dutyCard}><Text style={Styles.dutyCardText}>{o.username}</Text></View>
          })}
        </View>
        <View><Text style={Styles.sectionTitleText}>星期五</Text></View>
        <View style={Styles.dutyCardContainer}>
          {fridayDutyData.map((o, i) => {
            return <View style={Styles.dutyCard}><Text style={Styles.dutyCardText}>{o.username}</Text></View>
          })}
        </View>
        <View><Text style={Styles.sectionTitleText}>星期六</Text></View>
        <View style={Styles.dutyCardContainer}>
          {saturdayDutyData.map((o, i) => {
            return <View style={Styles.dutyCard}><Text style={Styles.dutyCardText}>{o.username}</Text></View>
          })}
        </View>
        <View><Text style={Styles.sectionTitleText}>星期日</Text></View>
        <View style={Styles.dutyCardContainer}>
          {sundayDutyData.map((o, i) => {
            return <View style={Styles.dutyCard}><Text style={Styles.dutyCardText}>{o.username}</Text></View>
          })}
        </View>
      </View>
    </ScrollView>
  );
}
