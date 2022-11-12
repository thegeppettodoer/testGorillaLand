import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Platform,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import { EvilIcons } from "@expo/vector-icons";
// import DateTimePicker, {
//   DateTimePickerAndroid,
// } from "@react-native-community/datetimepicker";
import DateTimePickerModal from "react-native-modal-datetime-picker";

type Props = {
  title: string;
  value: string;
  onChangeValue: (...args: any[]) => any;
};

const InputHour = ({ title, onChangeValue, value }: Props) => {
  const [date, setDate] = useState(new Date(Date.now()));
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: any) => {
    console.log(
      "A date has been picked: ",
      new Date(date).toLocaleDateString("en-US")
    );
    setDate(date);
    onChangeValue(
      date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
    hideDatePicker();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.row}>
        <Text>
          {date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </Text>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="time"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
        <Pressable onPress={showDatePicker} style={styles.icon}>
          <EvilIcons name="chevron-down" size={36} color="black" />
        </Pressable>
      </View>
    </View>
  );
};

export default InputHour;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    width: "100%",
    marginTop: 0,
    marginBottom: 30,
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
  },
  frame: {
    flex: 1,
    display: "flex",
    width: "100%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "#EEEDE7",
    backgroundColor: "#EEEDE7",
    height: 40,
    borderRadius: 5,
    marginTop: 10,
    padding: 5,
  },
  icon: {
    alignItems: "center",
  },
});
