import React from "react";
import {Alert, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {Colors, Styles} from "../styles";
import {API, GlobalState} from "../App";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Icon from "react-native-vector-icons/Ionicons";

export function HomeScreen({navigation}) {
  const [isGetInit, setIsGetInit] = React.useState(false);
  const [tickets, setTickets] = React.useState([]);
  const [todayDuty, setTodayDuty] = React.useState([]);
  const todayDutyColor = [Colors.iosBlue, Colors.iosViolet, Colors.iosPurple, Colors.iosSkyBlue, Colors.iosGreen, Colors.iosYellow, Colors.iosOrange, Colors.iosCarmine];

  React.useEffect(() => {
    if (!isGetInit) {
      API.getMyTicketGet({userid: GlobalState.uid.toString()})
        .then((res) => {
          setTickets(res.data)
          setIsGetInit(true)
        })
        .catch(e => {
          if (e.status === 401) {
            console.error("用户登录过期");
            navigation.navigate("LoginScreen");
          } else {
            Alert.alert("获取数据失败", `${e.message} ${e.status ? e.status : ''}`)
          }
        });
      const date = new Date();
      const dayOfWeek = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
      const today = dayOfWeek[date.getDay() - 1];
      API.getDutyCalendarGet({})
        .then((res) => {
          const duties = [];
          res.data[today].map((u, i) => {
            duties.push(u.username);
          })
          setTodayDuty(duties);
        })
        .catch(e => Alert.alert("获取数据失败", e.message + ' ' + e.status));
    }
  }, []);

  const TicketComponent = (props: object) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate("TicketDetailScreen", {ticket: props.ticket.id})}>
        <View style={Styles.ticketCard}>
          <View style={{flexDirection: "row", alignItems: "center"}}>
            {props.ticket.severity === 1 ?
              <MaterialIcons style={[Styles.ticketSeverityIcon, {color: Colors.iosBlue}]} name={"info"}/>
              : props.ticket.severity === 2 ?
                <MaterialIcons style={[Styles.ticketSeverityIcon, {color: Colors.iosYellow}]} name={"error"}/>
                : <MaterialIcons style={[Styles.ticketSeverityIcon, {color: Colors.iosRed}]} name={"warning"}/>}
            <View style={{justifyContent: "space-between"}}>
              <Text style={{fontSize: 20}}>{props.ticket.title}</Text>
              <Text style={{fontSize: 14, color: Colors.lightText}}>{props.ticket.place}</Text>
            </View>
          </View>
          <View style={{justifyContent: "space-between", alignItems: "flex-end"}}>
            <Icon style={{color: props.ticket.status === 1 ? Colors.iosGreen : Colors.highlightBg, fontSize: 22}}
                  name={"ios-checkmark-circle"}/>
            <Text style={{fontSize: 14, color: Colors.lightText}}>{props.ticket.create_user_name}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
  let TicketsComponent = []
  if (tickets.tickets) {
    for (const t of tickets.tickets) {
      TicketsComponent.push(<TicketComponent ticket={t}/>)
    }
  }

  return (
    <>
      <View style={Styles.homeTitleContainer}>
        <Text style={Styles.titleText}>
          {GlobalState.username}, 您好
        </Text>
      </View>
      <ScrollView style={{backgroundColor: Colors.deepBg, paddingLeft: 20, paddingRight: 20}}>
        <View style={Styles.homeSectionView}>
          <View style={{flexDirection: "row", justifyContent: "space-between"}}>
            <Text style={Styles.subTitleText}>今日值班</Text>
            <TouchableOpacity onPress={() => navigation.navigate("DutyScreen")}>
              <Text style={Styles.subTitleLink}>值班表</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={Styles.homeDutyCardContainer}>
          {todayDuty.map((o, i) => {
            return <View
              style={[Styles.HomeDutyCard, {backgroundColor: todayDutyColor[i % todayDutyColor.length]}]}><Text
              style={Styles.homeDutyName}>{o}</Text></View>
          })}
        </View>

        <View style={Styles.homeSectionView}>
          <View style={{marginBottom: 15, flexDirection: "row", justifyContent: "space-between"}}>
            <Text style={Styles.subTitleText}>我的工单</Text>
          </View>
          <View style={Styles.cardContainerHome}>
            {TicketsComponent}
          </View>
        </View>
      </ScrollView>
    </>
  )
}
