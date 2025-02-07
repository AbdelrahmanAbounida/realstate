import Toast from "react-native-root-toast";

const success = (msg: string) =>
  Toast.show(msg, {
    duration: Toast.durations.LONG,
    animation: true,
    delay: 100,
    textColor: "green",
  });
const error = (msg: string) =>
  Toast.show(msg, {
    duration: Toast.durations.LONG,
    animation: true,
    delay: 100,
    textColor: "red",
  });

export const toast = {
  success,
  error,
};
