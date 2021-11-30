import {StyleSheet} from "react-native";

export const Colors = {
  iosRed: '#FF3A30',
  iosCarmine: '#FF2D55',
  iosOrange: '#FF9502',
  iosYellow: '#FFCB01',
  iosGreen: '#34C748',
  iosSkyBlue: '#5AC8FA',
  iosBlue: '#007AFF',
  iosViolet: '#5756D7',
  iosPurple: '#AF52DE',
  tabBg: '#F8F8F8',
  tabBorder: '#D0D0D0',
  deepBg: '#F2F2F6',
  highlightBg: '#FFFFFF',
  menuIcon: '#C4C4C6',
  lightText: '#8A898B',
  itemTouching: '#D1D1D6',
  switchBg: '#E9E8E9',
  iconOff: '#7D7D7D'
}

export const Styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  pureBackgroud: {
    backgroundColor: Colors.deepBg,
  },
  loginInput: {
    backgroundColor: Colors.highlightBg,
    borderStyle: "solid",
    margin: 5,
    paddingBottom: 4,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 4,
    borderColor: Colors.highlightBg,
    borderWidth: 1,
    borderRadius: 11,
    width: 250,
    height: 40,
    fontSize: 15
  },
  menuContainer: {
    borderRadius: 11,
    borderColor: Colors.deepBg,
    borderStyle: "solid",
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: Colors.highlightBg
  },
  menuCutoff: {
    marginLeft: 20,
    borderStyle: "solid",
    borderBottomWidth: 0.8,
    borderBottomColor: Colors.deepBg
  },
  menuRowView: {
    paddingLeft: 15,
    borderStyle: "solid",
    borderWidth: 0,
    borderColor: Colors.highlightBg,
    backgroundColor: Colors.highlightBg,
    flexDirection: 'row',
    justifyContent: "space-between"
  },
  menuText: {
    fontSize: 17,
    paddingRight: 10,
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 5
  },
  menuItemIconSize: {
    fontSize: 18,
    color: Colors.menuIcon,
    alignSelf: "center",
    marginRight: 10,
  },
  titleText: {
    marginTop: 10,
    marginLeft: 30,
    marginRight: 30,
    fontSize: 26,
    fontWeight: 'bold'
  },
  textInput: {
    fontSize: 17,
    paddingLeft: 10,
    paddingRight: 10,
    color: 'black',
  },
  switchStyle: {
    marginRight: 10,
  },
  infoTextInRow: {
    alignSelf: "center",
    fontSize: 17,
    color: Colors.lightText,
    marginRight: 8
  },
  listContainer: {
    backgroundColor: Colors.deepBg
  },
  sectionHeader: {
    backgroundColor: Colors.deepBg,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 20,
    paddingRight: 20,
  },
  classroomSectionHeader: {
    backgroundColor: Colors.highlightBg,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 14,
    paddingRight: 14
  },
  dutyRow: {
    backgroundColor: Colors.highlightBg,
    paddingLeft: 20,
    fontSize: 17,
    height: 34,
    justifyContent: "center"
  },
  dutyText: {
    fontSize: 18,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 14,
    paddingRight: 14,
  },
  classroomContainer: {
    backgroundColor: Colors.deepBg,
    flexDirection: "row",
    flexWrap: "wrap",
    paddingLeft: 10,
    paddingTop: 10
  },
  classroomComponent: {},
  classroomRect: {
    marginTop: 10,
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 5,
    borderStyle: "solid",
    borderWidth: 0,
    borderColor: Colors.deepBg,
    borderRadius: 11,
    height: 110,
    width: 110,
    backgroundColor: Colors.highlightBg,
  },
  classroomRectName: {
    textAlign: "center",
    marginBottom: 5
  },
  bigName: {
    fontWeight: "bold",
    fontSize: 32
  },
  smallName: {
    fontSize: 18,
    color: Colors.lightText
  },
  cardContainer: {
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 0,
    paddingBottom: 10,
    backgroundColor: Colors.deepBg
  },
  pingCard: {
    marginTop: 10,
    backgroundColor: Colors.highlightBg,
    height: 110,
    borderRadius: 11,
    borderColor: Colors.deepBg,
    borderStyle: "solid",
    padding: 12,
    flexWrap: "wrap"
  },
  pingItem: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 155,
    marginRight: 15
  },
  pingRes: {
    flexDirection: "row",
    alignItems: "center",
  },
  pingName: {
    fontSize: 14
  },
  pingMs: {
    color: Colors.iosGreen,
    fontSize: 14,
    paddingRight: 2,
    paddingLeft: 5,
  },
  pingUnit: {
    fontSize: 10,
    color: Colors.lightText,
    alignSelf: "flex-end",
    paddingBottom: 1.5
  },
  cmdCard: {
    marginTop: 10,
    backgroundColor: Colors.highlightBg,
    height: 160,
    borderRadius: 11,
    borderColor: Colors.deepBg,
    justifyContent: "space-between",
    alignItems: 'center',
    borderStyle: "solid",
    padding: 12,
    flexWrap: "wrap"
  },
  cmdButtonWrapper: {
    marginRight: 18,
    marginTop: 2,
    marginBottom: 2,
  },
  cmdButtonText: {
    color: Colors.iosBlue,
    fontSize: 18
  },
  videoCard: {
    alignContent: "center",
    marginTop: 10,
    backgroundColor: Colors.highlightBg,
    height: 203,
    borderRadius: 11,
    borderColor: Colors.deepBg,
    borderStyle: "solid",
    padding: 12,
    flexWrap: "wrap"
  },
  video: {
    width: 320
  },
  classroomHeader: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  classStatusIconContainer: {
    flexDirection: "row",
    paddingTop: 20,
    paddingRight: 5
  },
  menuInput: {
    fontSize: 17,
    paddingRight: 20,
    paddingTop: 7,
    paddingBottom: 7,
    color: Colors.lightText,
  },
  menuRowViewNew: {
    paddingLeft: 14,
    paddingRight: 8,
    borderStyle: "solid",
    borderWidth: 0,
    borderColor: Colors.highlightBg,
    borderRadius: 11,
    backgroundColor: Colors.highlightBg,
    flexDirection: 'row',
    justifyContent: "space-between"
  },
  ticketTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  ticketAddIcon: {
    color: Colors.iosBlue,
    marginTop: 15,
    marginRight: 20,
    marginBottom: 10,
    fontSize: 34
  },
  commonRowCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Colors.highlightBg,
    borderStyle: "solid",
    borderWidth: 0,
    borderColor: Colors.deepBg,
    borderRadius: 11,
    paddingLeft: 14,
    paddingRight: 9
  },
  rowCardContainer: {
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: Colors.deepBg
  },
  multiLineText: {
    fontSize: 17,
    paddingRight: 10,
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 5,
    height: 150,
    textAlignVertical: "top"
  },
  smallRightPicker: {
    right: 0,
    height: 5,
    width: 150,
    // backgroundColor: Colors.highlightBg,

    color: Colors.lightText
  },
  inRowPickerWrapper: {
    alignSelf: "center",
    alignItems: "flex-end",
    marginRight: -78
  },
  ticketCard: {
    backgroundColor: Colors.highlightBg,
    borderRadius: 11,
    borderColor: Colors.deepBg,
    borderStyle: "solid",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15
  },
  ticketSeverityIcon: {
    fontSize: 32,
    paddingRight: 10
  },
  homeSectionView: {
    marginTop: 12,
    marginLeft: 10,
    marginRight: 10
  },
  subTitleText: {
    fontSize: 20,
    fontWeight: "bold"
  },
  subTitleLink: {
    color: Colors.iosBlue,
    fontSize: 20
  },
  homeTitleContainer: {
    marginTop: 12
  },
  HomeDutyCard: {
    backgroundColor: Colors.highlightBg,
    borderRadius: 11,
    borderColor: Colors.highlightBg,
    borderStyle: "solid",
    borderWidth: 0,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 10,
    padding: 10,
    width: 160,
    height: 70,
    justifyContent: "center",
    alignItems: "center"
  },
  homeDutyName: {
    fontSize: 20,
    color: '#ffffff'
  },
  homeDutyCardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between"
  },
  cardContainerHome: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 10,
    backgroundColor: Colors.deepBg
  }
});
