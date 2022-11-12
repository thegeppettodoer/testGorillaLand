import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
type Props = {
  children: JSX.Element,
  onPress:VoidFunction
};
const IconMenu = ({ children,onPress }: Props) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      {children}
    </Pressable>
  );
};

export default IconMenu;

const styles = StyleSheet.create({
  container: {
    marginTop: 2,
    marginBottom: 2,
    marginLeft: 10,
    marginRight: 10,
  },
});
