import React, {useState} from "react";
import {Alert, Button, ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import {Colors, Styles} from "../styles";
// @ts-ignore
import Icon from "react-native-vector-icons/Ionicons";
import {API, GlobalState} from "../App";
import {LoginScreen} from "./LoginScreen";
import {ChangePhoneScreen} from "./ChangePhoneScreen";
import {createStackNavigator} from "@react-navigation/stack";
import {Picker} from "@react-native-picker/picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";


// @ts-ignore
export function AddTicketScreen({navigation, route}) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isGetInit, setIsGetInit] = React.useState(false);
  const [severity, setSeverity] = useState(1);
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [place, setPlace] = useState("");
  const [startDate, setStartDate] = useState(new Date())
  const [dutyUser1, setDutyUser1] = useState(0)
  const [dutyUser2, setDutyUser2] = useState(0)
  const [dutyUser3, setDutyUser3] = useState(0)
  const [userData, setUserData] = useState({})

  React.useEffect(() => {
    if (!isGetInit) {
      API.adminSetUserGet({})
        .then((res) => {
          // @ts-ignore
          setUserData(res.data)
          setIsGetInit(true)
        })
        .catch(e => Alert.alert("获取数据失败", e.message + ' ' + e.status));
    }
  }, []);

  const showDatePicker = (settingDate: Date) => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = (date: Date) => {
    setStartDate(date);
    hideDatePicker();
  };

  let pickerItems = [];
  // @ts-ignore
  if (userData.users) {
    for (let i = 0; i < userData.count; i++) {
      // @ts-ignore
      pickerItems.push(<Picker.Item key={i} value={userData.users[i].uid} label={userData.users[i].username}/>)
    }
    pickerItems.push(<Picker.Item key={255} value={0} label={"不指定"}/>)
  }

  const getDataFormatString = (dt: Date) => {
    return `${
      dt.getFullYear().toString().padStart(4, '0')}-${
      (dt.getMonth() + 1).toString().padStart(2, '0')}-${
      dt.getDate().toString().padStart(2, '0')} ${
      dt.getHours().toString().padStart(2, '0')}:${
      dt.getMinutes().toString().padStart(2, '0')}:${
      dt.getSeconds().toString().padStart(2, '0')}`
  }
  const handleSubmit = () => {
    API.addTicketPost({
      inlineObject2: {
        title: title,
        detail: detail,
        severity: severity,
        dutyUser1: dutyUser1,
        dutyUser2: dutyUser2,
        dutyUser3: dutyUser3,
        createTime: getDataFormatString(new Date()),
        place: place,
        createUser: GlobalState.uid,
        startTime: getDataFormatString(startDate)
      }
    })
      .then(res => {
        console.debug(res);
        navigation.goBack();
      })
      .catch(e => Alert.alert("提交工单失败", e.message + ' ' + e.status));
  }
  return (
    <>
      <ScrollView style={{backgroundColor: Colors.deepBg, paddingTop: 10}}>
        <View style={Styles.rowCardContainer}>
          <View style={Styles.commonRowCard}>
            <TextInput style={Styles.menuText} onChangeText={t => setTitle(t)} placeholder={"标题"}/>
          </View>
        </View>

        <View style={Styles.rowCardContainer}>
          <View style={Styles.commonRowCard}>
            <TextInput style={Styles.multiLineText} onChangeText={t => setDetail(t)} placeholder={"详细说明"}
                       multiline={true}/>
          </View>
        </View>

        <View style={Styles.rowCardContainer}>
          <View style={[Styles.commonRowCard, {paddingRight: 0}]}>
            <Text style={Styles.menuText}>紧急程度</Text>
            <View style={Styles.inRowPickerWrapper}>
              <Picker
                style={Styles.smallRightPicker}
                selectedValue={severity}
                onValueChange={(itemValue, itemIndex) =>
                  setSeverity(itemValue)
                }>
                <Picker.Item label="FATAL" value="3"/>
                <Picker.Item label="WARN" value="2"/>
                <Picker.Item label="INFO" value="1"/>
              </Picker>
            </View>
          </View>
        </View>
        <View style={Styles.rowCardContainer}>
          <View style={Styles.commonRowCard}>
            <TextInput style={Styles.menuText} onChangeText={t => setPlace(t)} placeholder={"地点"}/>
          </View>
        </View>
        <View style={Styles.rowCardContainer}>
          <TouchableOpacity onPress={showDatePicker}>
            <View style={Styles.commonRowCard}>
              <Text style={Styles.menuText}>开始时间</Text>
              <Text
                style={Styles.infoTextInRow}>{startDate.toLocaleDateString() + " " + startDate.toLocaleTimeString()}</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={Styles.menuContainer}>
          <View style={Styles.menuRowViewNew}>
            <Text style={Styles.menuText}>负责人1</Text>
            <View style={Styles.inRowPickerWrapper}>
              <Picker
                style={Styles.smallRightPicker}
                selectedValue={dutyUser1}
                onValueChange={(itemValue, itemIndex) =>
                  setDutyUser1(itemValue)
                }>
                {pickerItems}
              </Picker>
            </View>
          </View>
          <View style={Styles.menuCutoff}/>
          <View style={Styles.menuRowViewNew}>
            <Text style={Styles.menuText}>负责人2</Text>
            <View style={Styles.inRowPickerWrapper}>
              <Picker
                style={Styles.smallRightPicker}
                selectedValue={dutyUser2}
                onValueChange={(itemValue, itemIndex) =>
                  setDutyUser2(itemValue)
                }>
                {pickerItems}
              </Picker>
            </View>
            {/*<Text style={Styles.infoTextInRow}>234</Text>*/}
          </View>
          <View style={Styles.menuCutoff}/>
          <View style={Styles.menuRowViewNew}>
            <Text style={Styles.menuText}>负责人3</Text>
            <View style={Styles.inRowPickerWrapper}>
              <Picker
                style={Styles.smallRightPicker}
                selectedValue={dutyUser3}
                onValueChange={(itemValue, itemIndex) =>
                  setDutyUser3(itemValue)
                }>
                {pickerItems}
              </Picker>
            </View>
          </View>
        </View>

        <View style={Styles.menuContainer}>
          <Button title="提交" color={Colors.iosBlue} onPress={() => handleSubmit()}/>
        </View>
      </ScrollView>
      <View style={Styles.menuContainer}>
        <DateTimePickerModal
          date={startDate}
          isVisible={isDatePickerVisible}
          mode="datetime"
          display="default"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>
    </>
  );
}
