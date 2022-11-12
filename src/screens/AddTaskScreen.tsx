import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import Task from "../components/Task";
import {
  listRemind,
  listRepeat,
  taskModel,
  listState,
} from "../interfaces/enums";
import Button from "../components/Button";
import IconMenu from "../components/IconMenu";
import { Ionicons } from "@expo/vector-icons";
import InputText from "../components/InputText";
import InputDate from "../components/InputDate";
import InputHour from "../components/InputHour";
import InputSelector from "../components/InputSelector";
import { saveTask } from "../store/slices/tasks";
import { useCustomSelector, useCustomDispatch } from "../store/hooks";

const AddTaskScreen = ({ navigation }: { navigation: any }) => {
  const {
    tasks: { list },
  } = useCustomSelector((state) => state);
  const dispatch = useCustomDispatch();

  React.useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View style={{ flexDirection: "row", paddingRight: 10 }}>
          <IconMenu onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color="black" />
          </IconMenu>
        </View>
      ),
    });
  }, [navigation]);

  const [title, setTitle] = useState("");
  const [deadLine, setDeadLine] = useState(new Date().toDateString());
  const [startTime, setStartTime] = useState(
    new Date(Date.now()).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
  );
  const [endTime, setEndTime] = useState(
    new Date(Date.now()).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
  );
  const [remind, setRemind] = useState("");
  const [repeat, setRepeat] = useState("");
  const [status, setStatus] = useState(listState.CREATE);
  const onAdd = () => {
    setStatus(listState.CREATE);
    const taskAdd: taskModel = {
      title,
      deadLine,
      startTime,
      endTime,
      remind,
      repeat,
      status,
    };

    dispatch(saveTask(taskAdd));

    navigation.navigate("TodoScreen", {
      data: { title, deadLine, startTime, endTime, remind, repeat },
    });
  };
  const onChangeTitle = (value: string) => {
    setTitle(value);
  };
  const onChangeDeadLine = (value: string) => {
    setDeadLine(value);
  };
  const onChangeStartTime = (value: string) => {
    setStartTime(value);
  };
  const onChangeEndTime = (value: string) => {
    setEndTime(value);
  };
  const onChangeRemind = (value: string) => {
    setRemind(value);
  };
  const onChangeRepeat = (value: string) => {
    setRepeat(value);
  };

  return (
    <SafeAreaView style={styles.containerSafe}>
      <StatusBar
        // translucent
        animated={true}
        backgroundColor="#FFFFFF"
        showHideTransition={"fade"}
        hidden={true}
      />
      <ScrollView style={styles.container}>
        <View>
          <View style={{ flexDirection: "column" }}>
            <InputText
              value={title}
              title={"Title"}
              onChangeValue={(e) => onChangeTitle(e)}
            />
            <InputDate
              value={deadLine}
              title={"Deadline"}
              onChangeValue={(e) => onChangeDeadLine(e)}
            />
            <View style={{ flexDirection: "row", width: "100%" }}>
              <View
                style={{ flexDirection: "row", width: "50%", paddingRight: 10 }}
              >
                <InputHour
                  value={startTime}
                  title={"Start time"}
                  onChangeValue={(e) => onChangeStartTime(e)}
                />
              </View>
              <View
                style={{ flexDirection: "row", width: "50%", paddingLeft: 10 }}
              >
                <InputHour
                  value={endTime}
                  title={"End time"}
                  onChangeValue={(e) => onChangeEndTime(e)}
                />
              </View>
            </View>
            <InputSelector
              value={remind}
              title={"Remind"}
              list={[
                { key: "1", value: listRemind.min10 },
                { key: "2", value: listRemind.min20 },
                { key: "3", value: listRemind.min30 },
              ]}
              onChangeValue={(e) => onChangeRemind(e)}
            />
            <InputSelector
              value={repeat}
              title={"Repeat"}
              list={[
                { key: "1", value: listRepeat.repeat1 },
                { key: "2", value: listRepeat.repeat2 },
                { key: "3", value: listRepeat.repeat3 },
                { key: "4", value: listRepeat.repeat4 },
              ]}
              onChangeValue={(e) => onChangeRepeat(e)}
            />
          </View>
        </View>
      </ScrollView>
      <View style={{ margin: 20 }}>
        <Button text={"Create a Task"} onPress={onAdd} />
      </View>
    </SafeAreaView>
  );
};

export default AddTaskScreen;

const styles = StyleSheet.create({
  containerSafe: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "space-between",
  },
  container: {
    flex: 0.3,
    backgroundColor: "#FFFFFF",
    padding: 30,
    flexDirection: "column",
  },
  statusBar: {
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#3C4048",
    marginBottom: 30,
  },
});
