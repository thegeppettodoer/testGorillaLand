enum listState {
  COMPLETED = "completed",
  PENDING = "pending",
  CREATE = "create",
}
enum listRemind {
  min10 = "10 minutes early",
  min20 = "20 minutes early",
  min30 = "30 minutes early",
}
enum listRepeat {
  repeat1 = "Daily",
  repeat2 = "Weekly",
  repeat3 = "Monthly ",
  repeat4 = "Yearly",
}
interface taskModel {
  title: string;
  deadLine: string;
  startTime: string;
  endTime: string;
  remind: string;
  repeat: string;
  id: string;
  status: listState;
}
export { taskModel, listState, listRemind, listRepeat };
