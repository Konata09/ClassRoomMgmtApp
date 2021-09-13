import React, {useState} from "react";
import {Alert, Appearance, Button, ScrollView, Text, TextInput, View} from "react-native";
import {Colors, Styles} from "../styles";
// @ts-ignore
import Icon from "react-native-vector-icons/Ionicons";
import {API, GlobalState} from "../App";


// @ts-ignore
export function TicketDetailScreen({navigation, route}) {
  const {ticket} = route.params;
  const [isGetInit, setIsGetInit] = React.useState(false);
  const [ticketDetail, setTicketDetail] = React.useState({})

  React.useEffect(() => {
    if (!isGetInit) {
      API.getTicketDetailGet({id: ticket})
        .then(res => {
          setTicketDetail(res.data)
          setIsGetInit(true)
        })
        .catch(e => Alert.alert("获取数据失败", e.message + ' ' + e.status));
    }
  }, []);

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
        <View style={Styles.menuCutoff}/>
        <View style={Styles.menuRowViewNew}>
          <Text style={Styles.menuText}>负责人1</Text>
          <Text
            style={Styles.infoTextInRow}>{ticketDetail.duty_user_1_name}</Text>
        </View>
        <View style={Styles.menuCutoff}/>
        <View style={Styles.menuRowViewNew}>
          <Text style={Styles.menuText}>负责人2</Text>
          <Text
            style={Styles.infoTextInRow}>{ticketDetail.duty_user_2_name}</Text>
        </View>
        <View style={Styles.menuCutoff}/>
        <View style={Styles.menuRowViewNew}>
          <Text style={Styles.menuText}>负责人3</Text>
          <Text
            style={Styles.infoTextInRow}>{ticketDetail.duty_user_3_name}</Text>
        </View>
        <View style={Styles.menuCutoff}/>
        <View style={Styles.menuRowViewNew}>
          <Text style={Styles.menuText}>完成人</Text>
          <Text
            style={Styles.infoTextInRow}>{ticketDetail.complete_user_name}</Text>
        </View>
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
        <View style={Styles.menuCutoff}/>
        <View style={Styles.menuRowViewNew}>
          <Text style={Styles.menuText}>完成时间</Text>
          <Text
            style={Styles.infoTextInRow}>{ticketDetail.complete_time}</Text>
        </View>
      </View>
      {GlobalState.isAdmin ? <>
        <View style={Styles.menuContainer}>
          <Button title="完成工单" color={Colors.iosBlue} onPress={() => handleDone()}/>
        </View>
        <View style={Styles.menuContainer}>
          <Button title="修改负责人" color={Colors.iosBlue} onPress={() => handleDone()}/>
        </View>
        <View style={[Styles.menuContainer, {marginBottom: 40}]}>
          <Button title="删除工单" color={Colors.iosRed} onPress={() => handleDel()}/>
        </View>
      </> : ""}

    </ScrollView>

  );
}
