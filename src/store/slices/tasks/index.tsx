import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { taskModel } from "../../../interfaces/enums";

export const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    list: [],
    task: {},
  },
  reducers: {
    setTaskList: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const { setTaskList } = taskSlice.actions;

export default taskSlice.reducer;

export const getAllTasks = () => async (dispatch: any) => {
  const stringList = await AsyncStorage.getItem("@tasks");
  const jsonList = stringList != null ? JSON.parse(stringList) : [];
  console.log("[getAllTasks]", jsonList);
  dispatch(setTaskList(jsonList));
};
export const updateTask = (task: TaskModel) => async (dispatch: any) => {
  console.log("[updateTask]", task);
  var stringList = await AsyncStorage.getItem("@tasks");
  var jsonList = [];
  jsonList = stringList != null ? JSON.parse(stringList) : [];
  if (!stringList) return;

  let newArrayList = jsonList.map((obj: taskModel) => {
    if (obj.id == task.id) {
      obj.status = task.status;
      return { ...obj };
    } else {
      return { ...obj };
    }
  });

  await AsyncStorage.setItem("@tasks", JSON.stringify(newArrayList));
  dispatch(setTaskList(newArrayList));
};

export const saveTask = (task: TaskModel) => async (dispatch: any) => {
  console.log("[saveTask]", task);
  var stringList = await AsyncStorage.getItem("@tasks");
  var jsonList = [];
  jsonList = stringList != null ? JSON.parse(stringList) : [];
  let taskEdited = task;
  taskEdited.id = !jsonList.length ? 1 : jsonList.length + 1;
  jsonList.push(taskEdited);
  await AsyncStorage.setItem("@tasks", JSON.stringify(jsonList));
  dispatch(setTaskList(jsonList));
};
