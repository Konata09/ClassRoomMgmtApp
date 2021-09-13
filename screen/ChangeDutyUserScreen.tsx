import React, {useState} from "react";
import {Alert, Animated, Button, ScrollView, SectionList, Text, TextInput, View} from "react-native";
import {Colors, Styles} from "../styles";
// @ts-ignore
import Icon from "react-native-vector-icons/Ionicons";
import {API, GlobalState} from "../App";
import {Picker} from "@react-native-picker/picker";

let userData = {}

// @ts-ignore
export function ChangeDutyUserScreen() {
  // const rowColorArray = new Array(20)
  // rowColorArray.fill(Colors.highlightBg)
  // const [rowColor, setRowColor] = useState(rowColorArray)
  const dutyData_ = {
    monday_1: 0,
    monday_1_name: "",
    monday_2: 0,
    monday_2_name: "",
    monday_3: 0,
    monday_3_name: "",
    tuesday_1: 0,
    tuesday_1_name: "",
    tuesday_2: 0,
    tuesday_2_name: "",
    tuesday_3: 0,
    tuesday_3_name: "",
    wednesday_1: 0,
    wednesday_1_name: "",
    wednesday_2: 0,
    wednesday_2_name: "",
    wednesday_3: 0,
    wednesday_3_name: "",
    thursday_1: 0,
    thursday_1_name: "",
    thursday_2: 0,
    thursday_2_name: "",
    thursday_3: 0,
    thursday_3_name: "",
    friday_1: 0,
    friday_1_name: "",
    friday_2: 0,
    friday_2_name: "",
    friday_3: 0,
    friday_3_name: "",
  }
  const [dutyData, setDutyData] = React.useState(dutyData_);
  const [changed, setChanged] = React.useState(false);

  React.useEffect(() => {
    API.getDutyCalendarGet({})
      .then((res) => {
        // @ts-ignore
        console.debug(res.data)
        // @ts-ignore
        setDutyData(res.data)
      })
      .catch(e => Alert.alert("获取数据失败", e.message + ' ' + e.status));
  }, []);

  React.useEffect(() => {
    API.adminSetUserGet({})
      .then((res) => {
        // @ts-ignore
        console.debug(res.data)
        // @ts-ignore
        userData = res.data
      })
      .catch(e => Alert.alert("获取数据失败", e.message + ' ' + e.status));
  }, []);

  React.useEffect(() => {
    if (changed) {
      setChanged(false);
      API.setDutyPost({
        inlineObject: dutyData
      })
        .then((res) => {
          console.debug(res)
        })
        .catch(e => Alert.alert("提交修改失败", e.message + ' ' + e.status));
    }
  }, [changed]);

  let pickerItems = [];
  // @ts-ignore
  for (let i = 0; i < userData.count; i++) {
    // @ts-ignore
    pickerItems.push(<Picker.Item key={i} value={userData.users[i].uid} label={userData.users[i].username}/>)
  }

  return (
    <ScrollView>
      <View style={Styles.listContainer}>
        <View style={Styles.sectionHeader}><Text>星期一</Text></View>
        <View style={Styles.dutyRow}>
          <Picker
            style={{backgroundColor: Colors.highlightBg}}
            selectedValue={dutyData["monday_1"]}
            onValueChange={(itemValue, itemIndex) => {
              setDutyData(prevState => ({
                ...prevState,
                monday_1: itemValue
              }))
              setChanged(true);
            }}>
            {pickerItems}
          </Picker>
        </View>
        <View style={Styles.menuCutoff}/>
        <View style={Styles.dutyRow}>
          <Picker
            style={{backgroundColor: Colors.highlightBg}}
            selectedValue={dutyData["monday_2"]}
            onValueChange={(itemValue, itemIndex) => {
              setDutyData(prevState => ({
                ...prevState,
                monday_2: itemValue
              }))
              setChanged(true);
            }}>
            {pickerItems}
          </Picker>
        </View>
        <View style={Styles.menuCutoff}/>
        <View style={Styles.dutyRow}>
          <Picker
            style={{backgroundColor: Colors.highlightBg}}
            selectedValue={dutyData["monday_3"]}
            onValueChange={(itemValue, itemIndex) => {
              setDutyData(prevState => ({
                ...prevState,
                monday_3: itemValue
              }))
              setChanged(true);
            }}>
            {pickerItems}
          </Picker>
        </View>
        <View style={Styles.sectionHeader}>
          <Text>星期二</Text>
        </View>
        <View style={Styles.dutyRow}>
          <Picker
            style={{backgroundColor: Colors.highlightBg}}
            selectedValue={dutyData["tuesday_1"]}
            onValueChange={(itemValue, itemIndex) => {
              setDutyData(prevState => ({
                ...prevState,
                tuesday_1: itemValue
              }))
              setChanged(true);
            }}>
            {pickerItems}
          </Picker>
        </View>
        <View style={Styles.menuCutoff}/>
        <View style={Styles.dutyRow}>
          <Picker
            style={{backgroundColor: Colors.highlightBg}}
            selectedValue={dutyData["tuesday_2"]}
            onValueChange={(itemValue, itemIndex) => {
              setDutyData(prevState => ({
                ...prevState,
                tuesday_2: itemValue
              }))
              setChanged(true);
            }}>
            {pickerItems}
          </Picker>
        </View>
        <View style={Styles.menuCutoff}/>
        <View style={Styles.dutyRow}>
          <Picker
            style={{backgroundColor: Colors.highlightBg}}
            selectedValue={dutyData["thursday_3"]}
            onValueChange={(itemValue, itemIndex) => {
              setDutyData(prevState => ({
                ...prevState,
                thursday_3: itemValue
              }))
              setChanged(true);
            }}>
            {pickerItems}
          </Picker>
        </View>
        <View style={Styles.sectionHeader}>
          <Text>星期三</Text>
        </View>
        <View style={Styles.dutyRow}>
          <Picker
            style={{backgroundColor: Colors.highlightBg}}
            selectedValue={dutyData["wednesday_1"]}
            onValueChange={(itemValue, itemIndex) => {
              setDutyData(prevState => ({
                ...prevState,
                wednesday_1: itemValue
              }))
              setChanged(true);
            }}>
            {pickerItems}
          </Picker>
        </View>
        <View style={Styles.menuCutoff}/>
        <View style={Styles.dutyRow}>
          <Picker
            style={{backgroundColor: Colors.highlightBg}}
            selectedValue={dutyData["wednesday_2"]}
            onValueChange={(itemValue, itemIndex) => {
              setDutyData(prevState => ({
                ...prevState,
                wednesday_2: itemValue
              }))
              setChanged(true);
            }}>
            {pickerItems}
          </Picker>
        </View>
        <View style={Styles.menuCutoff}/>
        <View style={Styles.dutyRow}>
          <Picker
            style={{backgroundColor: Colors.highlightBg}}
            selectedValue={dutyData["wednesday_3"]}
            onValueChange={(itemValue, itemIndex) => {
              setDutyData(prevState => ({
                ...prevState,
                wednesday_3: itemValue
              }))
              setChanged(true);
            }}>
            {pickerItems}
          </Picker>
        </View>
        <View style={Styles.sectionHeader}>
          <Text>星期四</Text>
        </View>
        <View style={Styles.dutyRow}>
          <Picker
            style={{backgroundColor: Colors.highlightBg}}
            selectedValue={dutyData["thursday_1"]}
            onValueChange={(itemValue, itemIndex) => {
              setDutyData(prevState => ({
                ...prevState,
                thursday_1: itemValue
              }))
              setChanged(true);
            }}>
            {pickerItems}
          </Picker>
        </View>
        <View style={Styles.menuCutoff}/>
        <View style={Styles.dutyRow}>
          <Picker
            style={{backgroundColor: Colors.highlightBg}}
            selectedValue={dutyData["thursday_2"]}
            onValueChange={(itemValue, itemIndex) => {
              setDutyData(prevState => ({
                ...prevState,
                thursday_2: itemValue
              }))
              setChanged(true);
            }}>
            {pickerItems}
          </Picker>
        </View>
        <View style={Styles.menuCutoff}/>
        <View style={Styles.dutyRow}>
          <Picker
            style={{backgroundColor: Colors.highlightBg}}
            selectedValue={dutyData["thursday_3"]}
            onValueChange={(itemValue, itemIndex) => {
              setDutyData(prevState => ({
                ...prevState,
                thursday_3: itemValue
              }))
              setChanged(true);
            }}>
            {pickerItems}
          </Picker>
        </View>
        <View style={Styles.sectionHeader}>
          <Text>星期五</Text>
        </View>
        <View style={Styles.dutyRow}>
          <Picker
            style={{backgroundColor: Colors.highlightBg}}
            selectedValue={dutyData["friday_1"]}
            onValueChange={(itemValue, itemIndex) => {
              setDutyData(prevState => ({
                ...prevState,
                friday_1: itemValue
              }))
              setChanged(true);
            }}>
            {pickerItems}
          </Picker>
        </View>
        <View style={Styles.menuCutoff}/>
        <View style={Styles.dutyRow}>
          <Picker
            style={{backgroundColor: Colors.highlightBg}}
            selectedValue={dutyData["friday_2"]}
            onValueChange={(itemValue, itemIndex) => {
              setDutyData(prevState => ({
                ...prevState,
                friday_2: itemValue
              }))
              setChanged(true);
            }}>
            {pickerItems}
          </Picker>
        </View>
        <View style={Styles.menuCutoff}/>
        <View style={Styles.dutyRow}>
          <Picker
            style={{backgroundColor: Colors.highlightBg}}
            selectedValue={dutyData["friday_3"]}
            onValueChange={(itemValue, itemIndex) => {
              setDutyData(prevState => ({
                ...prevState,
                friday_3: itemValue
              }))
              setChanged(true);
            }}>
            {pickerItems}
          </Picker>
        </View>
      </View>
    </ScrollView>
  );
}
