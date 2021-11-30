import React, {useState} from "react";
import {Alert, Button, Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Colors, Styles} from "../styles";
// @ts-ignore
import Icon from "react-native-vector-icons/Ionicons";
import {API} from "../App";
import {Picker} from "@react-native-picker/picker";

// @ts-ignore
export function ChangeDutyUserScreen({navigation}) {
  const [mondayDutyData, setMondayDutyData] = React.useState([]);
  const [tuesdayDutyData, setTuesdayDutyData] = React.useState([]);
  const [wednesdayDutyData, setWednesdayDutyData] = React.useState([]);
  const [thursdayDutyData, setThursdayDutyData] = React.useState([]);
  const [fridayDutyData, setFridayDutyData] = React.useState([]);
  const [saturdayDutyData, setSaturdayDutyData] = React.useState([]);
  const [sundayDutyData, setSundayDutyData] = React.useState([]);
  const [updateDutyUid, setUpdateDutyUid] = React.useState(1);
  const [addDutyUid, setAddDutyUid] = React.useState(1);
  const [updateDutyId, setUpdateDutyId] = React.useState("");
  const [updateDutyDay, setUpdateDutyDay] = React.useState("Monday");
  const [addDutyDay, setAddDutyDay] = React.useState("Monday");
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [pickerItems, setPickerItems] = useState([]);
  const [userData, setUserData] = useState({});

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => setAddModalVisible(true)} title="添加"/>
      ),
    });
  }, [navigation]);

  // 更新数据
  React.useEffect(() => {
    fetchData();
  }, []);

  React.useEffect(() => {
    if (userData.users) {
      const p = [];
      for (let i = 0; i < userData.count; i++) {
        p.push(<Picker.Item key={i} value={userData.users[i].uid} label={userData.users[i].username}/>);
      }
      p.push(<Picker.Item key={255} value={0} label={"不指定"}/>);
      setPickerItems(p);
    }
  }, [userData])

  const fetchData = () => {
    // 获取值班表数据
    API.getDutyCalendarGet({})
      .then((res) => {
        console.debug(res.data);
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

  // 修改值班人
  const updateDutyUser = (id: string, uid: number, day: string) => {
    API.setDutyPost({inlineObject: {uid: uid, id: id, day: day}})
      .then(res => res.retcode === 0 ? Alert.alert("修改成功") : Alert.alert("修改失败", res.message))
      .then(() => fetchData())
      .catch(e => Alert.alert("修改失败", e.message + ' ' + e.status));
  }

  // 新增值班人
  const addDutyUser = (uid: number, day: string) => {
    API.setDutyPut({inlineObject13: {uid: uid, day: day}})
      .then(res => res.retcode === 0 ? Alert.alert("添加成功") : Alert.alert("添加失败", res.message))
      .then(() => fetchData())
      .catch(e => Alert.alert("添加失败", e.message + ' ' + e.status));
  }

  // 点击值班人员的弹窗
  const handleTouch = (id: string, uid: number, day: string) => {
    Alert.alert(`选择操作`, undefined, [{
      text: "删除",
      onPress: () => API.setDutyDelete({inlineObject14: {id: id}}) && fetchData(),
      style: "destructive"
    }, {
      text: "修改",
      onPress: () => {
        setUpdateDutyUid(uid);
        setUpdateDutyDay(day);
        setUpdateDutyId(id);
        setEditModalVisible(true);
      }
    }, {
      text: "取消",
      onPress: () => null,
      style: "cancel"
    }])
  }

  const EditModal = () => {
    return (
      <View style={Styles.centeredView}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={editModalVisible}
          onRequestClose={() => {
            setEditModalVisible(!editModalVisible);
          }}
        >
          <View style={Styles.centeredView}>
            <View style={Styles.modalView}>
              <Text style={Styles.modalText}>修改值班人</Text>
              <Picker
                style={Styles.modalPicker}
                selectedValue={updateDutyUid}
                onValueChange={(itemValue, itemIndex) => {
                  setUpdateDutyUid(itemValue);
                }}>
                {pickerItems}
              </Picker>
              <Pressable
                style={[Styles.button, Styles.buttonClose]}
                onPress={() => {
                  updateDutyUser(updateDutyId, updateDutyUid, updateDutyDay);
                  setEditModalVisible(!editModalVisible);
                }}
              >
                <Text style={Styles.textStyle}>保存</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    )
  }

  const AddModal = () => {
    return (
      <View style={Styles.centeredView}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={addModalVisible}
          onRequestClose={() => {
            setAddModalVisible(!addModalVisible);
          }}
        >
          <View style={Styles.centeredView}>
            <View style={Styles.modalView}>
              <Text style={Styles.modalText}>新增值班人</Text>
              <Picker
                style={Styles.modalPicker}
                selectedValue={addDutyUid}
                onValueChange={(itemValue, itemIndex) => {
                  setAddDutyUid(itemValue);
                }}>
                {pickerItems}
              </Picker>
              <Picker
                style={{backgroundColor: Colors.highlightBg, width: 200}}
                selectedValue={addDutyDay}
                onValueChange={(itemValue, itemIndex) => {
                  setAddDutyDay(itemValue);
                }}>
                <Picker.Item label="星期一" value="Monday" key={1}/>
                <Picker.Item label="星期二" value="Tuesday" key={2}/>
                <Picker.Item label="星期三" value="Wednesday" key={3}/>
                <Picker.Item label="星期四" value="Thursday" key={4}/>
                <Picker.Item label="星期五" value="Friday" key={5}/>
                <Picker.Item label="星期六" value="Saturday" key={6}/>
                <Picker.Item label="星期日" value="Sunday" key={7}/>
              </Picker>
              <Pressable
                style={[Styles.button, Styles.buttonClose]}
                onPress={() => {
                  addDutyUser(addDutyUid, addDutyDay);
                  setAddModalVisible(!addModalVisible);
                }}
              >
                <Text style={Styles.textStyle}>保存</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    )
  }

  const styles = StyleSheet.create({});

  return (
    <ScrollView>
      <View style={Styles.listContainer}>
        <View style={Styles.sectionHeader}><Text>星期一</Text></View>
        {mondayDutyData.map((o, i) => {
          return <TouchableOpacity onPress={() => handleTouch(o.id, o.uid, "Monday")}>
            <View style={Styles.dutyRow}><Text>{o.username}</Text></View>
          </TouchableOpacity>
        })}
        <View style={Styles.sectionHeader}><Text>星期二</Text></View>
        <View style={Styles.menuCutoff}/>
        {tuesdayDutyData.map((o, i) => {
          return <TouchableOpacity onPress={() => handleTouch(o.id, o.uid, "Tuesday")}>
            <View style={Styles.dutyRow}><Text>{o.username}</Text></View>
          </TouchableOpacity>
        })}
        <View style={Styles.sectionHeader}><Text>星期三</Text></View>
        <View style={Styles.menuCutoff}/>
        {wednesdayDutyData.map((o, i) => {
          return <TouchableOpacity onPress={() => handleTouch(o.id, o.uid, "Wednesday")}>
            <View style={Styles.dutyRow}><Text>{o.username}</Text></View>
          </TouchableOpacity>
        })}
        <View style={Styles.sectionHeader}><Text>星期四</Text></View>
        <View style={Styles.menuCutoff}/>
        {thursdayDutyData.map((o, i) => {
          return <TouchableOpacity onPress={() => handleTouch(o.id, o.uid, "Thursday")}>
            <View style={Styles.dutyRow}><Text>{o.username}</Text></View>
          </TouchableOpacity>
        })}
        <View style={Styles.sectionHeader}><Text>星期五</Text></View>
        <View style={Styles.menuCutoff}/>
        {fridayDutyData.map((o, i) => {
          return <TouchableOpacity onPress={() => handleTouch(o.id, o.uid, "Friday")}>
            <View style={Styles.dutyRow}><Text>{o.username}</Text></View>
          </TouchableOpacity>
        })}
        <View style={Styles.sectionHeader}><Text>星期六</Text></View>
        <View style={Styles.menuCutoff}/>
        {saturdayDutyData.map((o, i) => {
          return <TouchableOpacity onPress={() => handleTouch(o.id, o.uid, "Saturday")}>
            <View style={Styles.dutyRow}><Text>{o.username}</Text></View>
          </TouchableOpacity>
        })}
        <View style={Styles.sectionHeader}><Text>星期日</Text></View>
        <View style={Styles.menuCutoff}/>
        {sundayDutyData.map((o, i) => {
          return <TouchableOpacity onPress={() => handleTouch(o.id, o.uid, "Sunday")}>
            <View style={Styles.dutyRow}><Text>{o.username}</Text></View>
          </TouchableOpacity>
        })}
      </View>
      <AddModal/>
      <EditModal/>
    </ScrollView>
  );
}
