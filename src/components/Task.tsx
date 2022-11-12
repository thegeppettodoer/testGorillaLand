import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import { listState, taskModel } from "../interfaces/enums";

type Props = {
  // status: listState;
  // text: string;
  item: taskModel;
  onPress: (...args: any[]) => any;
};
const Task = ({ item, onPress }: Props) => {
  const [selected, setSelected] = useState(listState.CREATE);
  return (
    <View style={styles.item}>
      <View style={{ flexDirection: "row", marginBottom: 20 }}>
        <Pressable
          onPress={() => {
            let statusNew =
              selected == listState.CREATE
                ? listState.COMPLETED
                : listState.CREATE ;
            setSelected(statusNew);
            onPress({
              title: item.title,
              deadLine: item.deadLine,
              startTime: item.startTime,
              endTime: item.endTime,
              remind: item.remind,
              repeat: item.repeat,
              id: item.id,
              status: statusNew,
            });
          }}
        >
          {item.status == listState.COMPLETED && (
            <FontAwesome
              name="check-square"
              size={24}
              color="red"
              style={{ marginRight: 15 }}
            />
          )}
          {item.status == listState.PENDING && (
            <FontAwesome
              name="square-o"
              size={25}
              color="#04D4F0"
              style={{ marginRight: 15 }}
            />
          )}
          {item.status == listState.CREATE && (
            <FontAwesome
              name="square-o"
              size={25}
              color="#F8D210"
              style={{ marginRight: 15 }}
            />
          )}
        </Pressable>

        <Text style={styles.text}>{item.title}</Text>
      </View>
    </View>
  );
};

export default Task;

const styles = StyleSheet.create({
  item: {
    flexDirection: "column",
    marginBottom: 10,
    marginTop: 10,
  },
  text: {
    fontSize: 18,
  },
});
