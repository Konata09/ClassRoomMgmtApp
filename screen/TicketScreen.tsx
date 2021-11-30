import React from "react";
import {Alert, RefreshControl, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {Colors, Styles} from "../styles";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {API} from "../App";
import Icon from "react-native-vector-icons/Ionicons";

export function TicketScreen({navigation}) {
  const [isGetInit, setIsGetInit] = React.useState(false);
  const [tickets, setTickets] = React.useState([])
  const [refreshing, setRefreshing] = React.useState(false)
  const toAddTicket = () => {
    navigation.navigate("新建工单");
  }

  React.useEffect(() => {
    fetchData();
    return navigation.addListener('focus', () => {
      fetchData();
    });
  }, [refreshing]);

  const fetchData = () => {
    API.getTicketsGet({})
      .then((res) => {
        setTickets(res.data)
        setIsGetInit(true)
        setRefreshing(false)
      })
      .catch(e => Alert.alert("获取数据失败", e.message + ' ' + e.status));
  }

  const handleTouch = (t: number) => {
    navigation.push("Ticket Detail", {ticket: t})
  }

  const TicketComponent = (props) => {
    return (
      <TouchableOpacity onPress={() => handleTouch(props.ticket.id)}>
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
      <View style={Styles.ticketTitleContainer}>
        <Text style={Styles.titleText}>
          工单
        </Text>
        <TouchableOpacity onPress={() => toAddTicket()}>
          <Icon style={Styles.ticketAddIcon} name={"ios-add"}/>
        </TouchableOpacity>
      </View>
      <ScrollView style={{backgroundColor: Colors.deepBg}}
                  refreshControl={
                    <RefreshControl
                      refreshing={false}
                      onRefresh={() => {
                        setRefreshing(true)
                      }}
                    />
                  }>
        <View style={Styles.cardContainer}>
          {TicketsComponent}
        </View>
      </ScrollView>
    </>
  )
}
