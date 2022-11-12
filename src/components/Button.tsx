import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
type Props = {
  onPress: VoidFunction
  text: string;
};
const Button = ({ text, onPress }: Props) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#32CD30",
    justifyContent:"center",
    alignItems:"center",
    height:50,borderRadius:15
  },
  text: {
    fontSize: 18,
    color: "#FFFFFF",
  },
});
