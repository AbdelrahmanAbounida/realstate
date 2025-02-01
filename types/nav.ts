import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Href } from "expo-router";
import { ImageSourcePropType } from "react-native";

export interface ScreenTabProps {
  icon: ImageSourcePropType; // React.ComponentProps<typeof FontAwesome>["name"];
  activeIcon: ImageSourcePropType;
  title: string;
  link: Href;
}
