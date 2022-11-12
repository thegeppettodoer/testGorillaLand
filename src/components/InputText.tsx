import { StyleSheet, Text, View, TextInput } from "react-native";
import React, { useState, useEffect } from "react";
type Props = {
  title: string;
  value: string;
  onChangeValue: (...args: any[]) => any;
};

const InputText = ({ title, onChangeValue, value }: Props) => {
  const [textValue, onChangeText] = React.useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TextInput
        value={textValue}
        onChangeText={(e) => {
          onChangeText(e);
          onChangeValue(e);
        }}
        style={styles.frame}
        placeholder={title}
      />
    </View>
  );
};

export default InputText;

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
    height: 40,
    borderWidth: 1,
    padding: 5,
  },
});
