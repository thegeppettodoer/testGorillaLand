import * as React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, HeaderTitle } from "@react-navigation/stack";
import TodoScreen from "../screens/TodoScreen";
import AddTaskScreen from "../screens/AddTaskScreen";
import IconMenu from "../components/IconMenu";
import { Feather, Octicons, Ionicons } from "@expo/vector-icons";
import { Provider } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import store from "../store";

const Stack = createStackNavigator();

function Stacks() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="TodoScreen"
            component={TodoScreen}
            options={({ navigation, route }) => ({
              headerTitleAlign: "left",
              title: "To-Do App",
              headerStyle: { height: 100 },
              headerTitleStyle: {
                fontWeight: "bold",
                fontSize: 20,
                paddingLeft: 20,
              },
              headerRight: () => (
                <View style={{ flexDirection: "row", paddingRight: 20 }}>
                  <IconMenu
                    onPress={async () => {
                      await AsyncStorage.removeItem("@tasks");
                    }}
                  >
                    <Feather name="search" size={24} color="black" />
                  </IconMenu>
                  <IconMenu onPress={() => {}}>
                    <Feather name="bell" size={24} color="black" />
                  </IconMenu>
                  <IconMenu onPress={() => {}}>
                    <Octicons name="three-bars" size={24} color="black" />
                  </IconMenu>
                </View>
              ),
            })}
          />
          <Stack.Screen
            name="AddTaskScreen"
            component={AddTaskScreen}
            options={({ navigation, route }) => ({
              headerTitleAlign: "left",
              title: "Add task",
              headerStyle: { height: 100 },
              headerTitleStyle: {
                fontWeight: "bold",
                fontSize: 20,
                paddingLeft: 0,
              },
              headerLeft: () => (
                <View style={{ flexDirection: "row", paddingRight: 10 }} />
              ),
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default Stacks;
