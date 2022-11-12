import { StyleSheet, Text, View, TextInput } from "react-native";
import React, { useState, useEffect } from "react";
import { SelectList } from "react-native-dropdown-select-list";

 type Props = {
  title: string;
  value: string;
  list:[{any:any}];
  onChangeValue: (...args: any[]) => any;
};

const InputSelector = ({ title, onChangeValue, value ,list}: Props) => {
  const [textValue, onChangeText] = React.useState("");
  const [selected, setSelected] = React.useState("");
 
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <SelectList
        setSelected={(val:any) => {setSelected(val);
        onChangeValue(val);}}
        data={list}
        save="value"
        boxStyles={styles.frame}
      />
    </View>
  );
};

export default InputSelector;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    width: "100%",
    marginTop: 0,
    marginBottom: 30,
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
  },
  frame: {
    fontSize: 15,
    borderColor: "#EEEDE7",
    borderRadius: 5,
    backgroundColor: "#EEEDE7",
    marginTop: 10,
    height: 45,
    borderWidth: 1,
    padding: 5,
  },
});
