import React, {useState} from "react";
import {Alert, Button, Modal, Pressable, ScrollView, Text, View} from "react-native";
import {Colors, Styles} from "../styles";
import {API, GlobalState} from "../App";
import {Picker} from "@react-native-picker/picker";

export function TicketDetailScreen({navigation, route}) {
  const {ticket} = route.params;
  const [isGetInit, setIsGetInit] = React.useState(false);
  const [ticketDetail, setTicketDetail] = React.useState({});
  const [changeDutyModalVisible, setChangeDutyModalVisible] = React.useState(false);
  const [updateDutyUid1, setUpdateDutyUid1] = React.useState(0);
  const [updateDutyUid2, setUpdateDutyUid2] = React.useState(0);
  const [updateDutyUid3, setUpdateDutyUid3] = React.useState(0);
  const [pickerItems, setPickerItems] = useState([]);
  const [userData, setUserData] = useState({});

  React.useEffect(() => {
    if (!isGetInit) {
      fetchData();
    }
  });

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
    API.getTicketDetailGet({id: ticket})
      .then(res => {
        setTicketDetail(res.data)
        setIsGetInit(true)
        console.debug(ticketDetail)
      })
      .catch(e => Alert.alert("获取数据失败", e.message + ' ' + e.status));

    API.adminSetUserGet({})
      .then((res) => {
        setUserData(res.data)
        setIsGetInit(true)
      })
      .catch(e => Alert.alert("获取数据失败", e.message + ' ' + e.status));
  }
  const handleDone = () => {
    API.setTicketStatusPost({inlineObject1: {id: ticket, status: 1}})
      .then(res => {
        console.debug(res);
        navigation.goBack();
      })
      .catch(e => Alert.alert("操作失败", e.message + ' ' + e.status));
  }
  const handleDel = () => {
    API.deleteTicket({id: ticket})
      .then(res => {
        console.debug(res);
        navigation.goBack();
      })
      .catch(e => Alert.alert("删除失败", e.message + ' ' + e.status));
  }

  const handleChangeDuty = () => {
    setUpdateDutyUid1(ticketDetail.duty_user_1);
    setUpdateDutyUid2(ticketDetail.duty_user_2);
    setUpdateDutyUid3(ticketDetail.duty_user_3);
    setChangeDutyModalVisible(true);
  }

  const handleChangeDutySubmit = () => {
    API.adminSetTicketDutyUserPost({
      inlineObject4: {
        id: ticketDetail.id,
        dutyUser1: updateDutyUid1,
        dutyUser2: updateDutyUid2,
        dutyUser3: updateDutyUid3
      }
    })
      .then(res => res.retcode === 0 ? Alert.alert("修改成功") : Alert.alert("修改失败", res.message))
      .then(() => fetchData())
      .catch(e => Alert.alert("修改失败", e.message + ' ' + e.status));
  }
  const ChangeDutyModal = () => {
    return (
      <View style={Styles.centeredView}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={changeDutyModalVisible}
          onRequestClose={() => {
            setChangeDutyModalVisible(!changeDutyModalVisible);
          }}
        >
          <View style={Styles.centeredView}>
            <View style={Styles.modalView}>
              <Text style={Styles.modalText}>修改负责人</Text>
              <Picker
                style={Styles.modalPicker}
                selectedValue={updateDutyUid1}
                onValueChange={(itemValue, itemIndex) => {
                  setUpdateDutyUid1(itemValue);
                }}>
                {pickerItems}
              </Picker>
              <Picker
                style={Styles.modalPicker}
                selectedValue={updateDutyUid2}
                onValueChange={(itemValue, itemIndex) => {
                  setUpdateDutyUid2(itemValue);
                }}>
                {pickerItems}
              </Picker>
              <Picker
                style={Styles.modalPicker}
                selectedValue={updateDutyUid3}
                onValueChange={(itemValue, itemIndex) => {
                  setUpdateDutyUid3(itemValue);
                }}>
                {pickerItems}
              </Picker>
              <Pressable
                style={[Styles.button, Styles.buttonClose]}
                onPress={() => {
                  handleChangeDutySubmit();
                  setChangeDutyModalVisible(!changeDutyModalVisible);
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

  return (
    <ScrollView style={{backgroundColor: Colors.deepBg, paddingTop: 10}}>
      <View>
        <Text style={Styles.titleText}>{ticketDetail.title}</Text>
      </View>

      <View style={Styles.rowCardContainer}>
        <View style={Styles.commonRowCard}>
          <Text style={Styles.multiLineText}>{ticketDetail.detail}</Text>
        </View>
      </View>

      <View style={Styles.menuContainer}>
        <View style={Styles.menuRowViewNew}>
          <Text style={Styles.menuText}>紧急程度</Text>
          <Text
            style={Styles.infoTextInRow}>{ticketDetail.severity === 1 ? "INFO" : ticketDetail.severity === 2 ? "WARN" : "FATAL"}</Text>
        </View>
        <View style={Styles.menuCutoff}/>
        <View style={Styles.menuRowViewNew}>
          <Text style={Styles.menuText}>状态</Text>
          <Text
            style={Styles.infoTextInRow}>{ticketDetail.status === 1 ? "已完成" : "未完成"}</Text>
        </View>
        <View style={Styles.menuCutoff}/>
        <View style={Styles.menuRowViewNew}>
          <Text style={Styles.menuText}>地点</Text>
          <Text
            style={Styles.infoTextInRow}>{ticketDetail.place}</Text>
        </View>
        <View style={Styles.menuCutoff}/>
        <View style={Styles.menuRowViewNew}>
          <Text style={Styles.menuText}>创建人</Text>
          <Text
            style={Styles.infoTextInRow}>{ticketDetail.create_user_name}</Text>
        </View>
        {ticketDetail.duty_user_1 !== 0 ?
          <>
            <View style={Styles.menuCutoff}/>
            <View style={Styles.menuRowViewNew}>
              <Text style={Styles.menuText}>负责人</Text>
              <Text
                style={Styles.infoTextInRow}>{ticketDetail.duty_user_1_name}</Text>
            </View>
          </> : <></>
        }
        {ticketDetail.duty_user_2 !== 0 ?
          <>
            <View style={Styles.menuCutoff}/>
            <View style={Styles.menuRowViewNew}>
              <Text style={Styles.menuText}>负责人</Text>
              <Text
                style={Styles.infoTextInRow}>{ticketDetail.duty_user_2_name}</Text>
            </View>
          </> : <></>
        }
        {ticketDetail.duty_user_3 !== 0 ?
          <>
            <View style={Styles.menuCutoff}/>
            <View style={Styles.menuRowViewNew}>
              <Text style={Styles.menuText}>负责人</Text>
              <Text
                style={Styles.infoTextInRow}>{ticketDetail.duty_user_3_name}</Text>
            </View>
          </> : <></>
        }
        {ticketDetail.status === 1 ?
          <>
            <View style={Styles.menuCutoff}/>
            <View style={Styles.menuRowViewNew}>
              <Text style={Styles.menuText}>完成人</Text>
              <Text
                style={Styles.infoTextInRow}>{ticketDetail.complete_user_name}</Text>
            </View>
          </> : <></>
        }
        <View style={Styles.menuCutoff}/>
        <View style={Styles.menuRowViewNew}>
          <Text style={Styles.menuText}>创建时间</Text>
          <Text
            style={Styles.infoTextInRow}>{ticketDetail.create_time}</Text>
        </View>
        <View style={Styles.menuCutoff}/>
        <View style={Styles.menuRowViewNew}>
          <Text style={Styles.menuText}>开始时间</Text>
          <Text
            style={Styles.infoTextInRow}>{ticketDetail.start_time}</Text>
        </View>
        {ticketDetail.status === 1 ?
          <>
            <View style={Styles.menuCutoff}/>
            <View style={Styles.menuRowViewNew}>
              <Text style={Styles.menuText}>完成时间</Text>
              <Text
                style={Styles.infoTextInRow}>{ticketDetail.complete_time}</Text>
            </View>
          </> : <></>
        }
      </View>
      {GlobalState.isAdmin ? <>
        {ticketDetail.status === 0 ?
          <View style={Styles.menuContainer}>
            <Button title="完成工单" color={Colors.iosBlue} onPress={() => handleDone()}/>
          </View>
          : <></>
        }
        <View style={Styles.menuContainer}>
          <Button title="修改负责人" color={Colors.iosBlue} onPress={() => handleChangeDuty()}/>
        </View>
        <View style={[Styles.menuContainer, {marginBottom: 40}]}>
          <Button title="删除工单" color={Colors.iosRed} onPress={() => handleDel()}/>
        </View>
      </> : <></>}
      <ChangeDutyModal/>
    </ScrollView>
  );
}
