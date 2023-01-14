import React from "react";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {},
  seperator: {
    flex: 1,
    height: 1,
    backgroundColor: 'orange',
    opacity: 0.5
  },
  textContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'orange',
    paddingBottom: 0,

  },
  mage: {

    flex: 1,
    position: "absolute",
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },

  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  searchBar: {
    flexDirection: 'row',
    borderWidth: 1.5,
    borderRadius: 8,
    borderColor: 'orange',
    justifyContent: 'space-between',
    width: '92%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 10,
    marginBottom: -12,
  },
  iconStyle: {
    marginBottom: 'auto',
    marginTop: 'auto',
    marginRight: 14,
  },
  searchInputStyle: {
    color: 'pink',
    padding: 10,
  },
  iconClose: {
    fontSize: 30,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 8,
  },
})

export default styles;