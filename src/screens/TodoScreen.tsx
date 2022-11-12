import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useEffect } from "react";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import Task from "../components/Task";
import { listState, taskModel } from "../interfaces/enums";
import Button from "../components/Button";

import { getAllTasks, updateTask } from "../store/slices/tasks";
import { useCustomSelector, useCustomDispatch } from "../store/hooks";

const TodoScreen = ({ navigation, route }: { navigation: any; route: any }) => {
  const {
    tasks: { list },
  } = useCustomSelector((state) => state);
  const dispatch = useCustomDispatch();

  const doList = () => {
    dispatch(getAllTasks());
  };
  const onAdd = () => {
    navigation.navigate("AddTaskScreen");
  };
  const onChangeStatus = (e: taskModel) => {
    console.log("[TodoScree][onChangeStatus]", e);

    dispatch(updateTask(e));
  };
  useEffect(() => {
    // console.log("[TodoScreen]", route.params?.data);
    doList();
    console.log("[AddTaskScreen][list]", list);
  }, [route.params]);

  useEffect(() => {
    doList();
  }, []);
  return (
    <SafeAreaView style={styles.containerSafe}>
      <StatusBar
        // translucent
        animated={true}
        backgroundColor="#FFFFFF"
        showHideTransition={"fade"}
        hidden={true}
      />
      <ScrollView
        style={styles.container}
        scrollEventThrottle={800}
        onScroll={(e) => {
          let paddingToBottom = 50;
          paddingToBottom += e.nativeEvent.layoutMeasurement.height;
          if (
            e.nativeEvent.contentOffset.y >=
            e.nativeEvent.contentSize.height - paddingToBottom
          ) {
            dispatch(getAllTasks());
          }
        }}
      >
        <View>
          <Text style={styles.title}>Completed tasks</Text>
          <View style={{ flexDirection: "column" }}>
            {list &&
              list
                .filter((e) => e.status == listState.COMPLETED)
                .sort((e) => e.id)
                .reverse()
                .map((item, index) => (
                  <Task key={index + 99} item={item} onPress={onChangeStatus} />
                ))}
            {/* <Task
              key={1}
              state={listState.completed}
              text={"Design team meeting"}
            /> */}
          </View>
        </View>
        <View>
          <Text style={styles.title}>Pending tasks</Text>
          <View style={{ flexDirection: "column" }}>
            {list &&
              list
                .filter(
                  (e) =>
                    e.status == listState.CREATE ||
                    e.status == listState.PENDING
                )
                .sort((e) => e.id)
                .reverse()
                .map((item, index) => (
                  <Task key={index + 9} item={item} onPress={onChangeStatus} />
                ))}
            {/* <Task
              key={1}
              state={listState.pending}
              text={"1 Design team meeting"}
            />
            <Task
              key={2}
              state={listState.create}
              text={"2 Design team meeting"}
            />
            <Task
              key={3}
              state={listState.create}
              text={"2 Design team meeting"}
            /> */}
          </View>
        </View>
      </ScrollView>
      <View style={{ margin: 20 }}>
        <Button text={"Add a Task"} onPress={onAdd} />
      </View>
    </SafeAreaView>
  );
};

export default TodoScreen;

const styles = StyleSheet.create({
  containerSafe: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "space-between",
  },
  container: {
    flex: 0.9,
    backgroundColor: "#FFFFFF",
    padding: 30,
    flexDirection: "column",
  },
  statusBar: {
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#3C4048",
    marginBottom: 30,
  },
});
