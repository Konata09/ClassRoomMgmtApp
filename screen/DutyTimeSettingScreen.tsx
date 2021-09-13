import React, {useState} from "react";
import {Button, Platform, ScrollView, Switch, Text, TextInput, View} from "react-native";
import {Colors, Styles} from "../styles";
// @ts-ignore
import Icon from "react-native-vector-icons/Ionicons";
import {GlobalState} from "../App";
import DateTimePickerModal from "react-native-modal-datetime-picker";

// @ts-ignore
export function DutyTimeSettingScreen({navigation, route}) {
  let [color1, setColor1] = useState(Colors.highlightBg)
  let [color2, setColor2] = useState(Colors.highlightBg)
  let [color3, setColor3] = useState(Colors.highlightBg)
  let [color4, setColor4] = useState(Colors.highlightBg)

  const [morningTime, setMorningTime] = useState(new Date());
  const [noonTime, setNoonTime] = useState(new Date());
  const [afternoonTime, setAfternoonTime] = useState(new Date());
  const [eveningTime, setEvening] = useState(new Date());

  const [settingTime, setSettingTime] = useState(new Date());
  const [nowSetting, setNowSetting] = useState("");

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = (settingDate: Date) => {
    setSettingTime(settingDate);
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    switch (nowSetting) {
      case "morningTime":
        setMorningTime(date);
        break;
      case "noonTime":
        setNoonTime(date);
        break;
      case "afternoonTime":
        setAfternoonTime(date);
        break;
      case "eveningTime":
        setEvening(date);
        break;
    }
    hideDatePicker();
  };

  return (
    <>
      <View style={Styles.menuContainer}>
        <View style={[Styles.menuRowView, {
          borderTopLeftRadius: 11,
          borderTopRightRadius: 11,
          paddingTop: 2,
          backgroundColor: color1
        }]}
              onTouchStart={() => setColor1(Colors.itemTouching)}
              onTouchEnd={() => {
                setColor1(Colors.highlightBg);
                showDatePicker(morningTime)
                setNowSetting("morningTime");
              }}>
          <Text style={Styles.menuText}>早晨值班时间</Text>
          <View style={{flexDirection: "row"}}>
            <Text style={Styles.infoTextInRow}>{("0" + morningTime.getHours()).slice(-2)}:{(morningTime.getMinutes()<10?'0':'') + morningTime.getMinutes()}</Text>
            <Icon name='ios-chevron-forward-outline' style={Styles.menuItemIconSize}/>
          </View>
        </View>
        <View style={Styles.menuCutoff}/>
        <View style={[Styles.menuRowView, {backgroundColor: color2}]}
              onTouchStart={() => setColor2(Colors.itemTouching)}
              onTouchEnd={() => {
                setColor2(Colors.highlightBg);
                showDatePicker(noonTime);
                setNowSetting("noonTime");
              }}>
          <Text style={Styles.menuText}>中午值班时间</Text>
          <View style={{flexDirection: "row"}}>
            <Text style={Styles.infoTextInRow}>{("0" + noonTime.getHours()).slice(-2)}:{(noonTime.getMinutes()<10?'0':'') + noonTime.getMinutes()}</Text>
            <Icon name='ios-chevron-forward-outline' style={Styles.menuItemIconSize}/>
          </View>
        </View>
        <View style={Styles.menuCutoff}/>
        <View style={[Styles.menuRowView, {backgroundColor: color3}]}
              onTouchStart={() => setColor3(Colors.itemTouching)}
              onTouchEnd={() => {
                setColor3(Colors.highlightBg);
                showDatePicker(afternoonTime)
                setNowSetting("afternoonTime");
              }}>
          <Text style={Styles.menuText}>下午值班时间</Text>
          <View style={{flexDirection: "row"}}>
            <Text style={Styles.infoTextInRow}>{("0" + afternoonTime.getHours()).slice(-2)}:{(afternoonTime.getMinutes()<10?'0':'') + afternoonTime.getMinutes()}</Text>
            <Icon name='ios-chevron-forward-outline' style={Styles.menuItemIconSize}/>
          </View>
        </View>
        <View style={Styles.menuCutoff}/>
        <View style={[Styles.menuRowView, {
          borderBottomLeftRadius: 11,
          borderBottomRightRadius: 11,
          paddingBottom: 2,
          backgroundColor: color4
        }]}
              onTouchStart={() => setColor4(Colors.itemTouching)}
              onTouchEnd={() => {
                setColor4(Colors.highlightBg);
                showDatePicker(eveningTime)
                setNowSetting("eveningTime");
              }}>
          <Text style={Styles.menuText}>晚上值班时间</Text>
          <View style={{flexDirection: "row"}}>
            <Text style={Styles.infoTextInRow}>{("0" + eveningTime.getHours()).slice(-2)}:{(eveningTime.getMinutes()<10?'0':'') + eveningTime.getMinutes()}</Text>
            <Icon name='ios-chevron-forward-outline' style={Styles.menuItemIconSize}/>
          </View>
        </View>
      </View>

      <View style={Styles.menuContainer}>
        <DateTimePickerModal
          date={settingTime}
          isVisible={isDatePickerVisible}
          mode="time"
          display="spinner"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>
    </>
  );
}
