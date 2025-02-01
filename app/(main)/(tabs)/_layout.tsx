import React from "react";
import { Tabs } from "expo-router";
import {
  Image,
  ImageSourcePropType,
  Pressable,
  Text,
  useColorScheme,
  View,
} from "react-native";
import Colors, { PRIMARY_COLOR, SECONDARY_COLOR } from "@/constants/Colors";
import { MAIN_APP_TABS } from "../../../constants/nav";
import { cn } from "@/lib/utils";
import * as Svg from "react-native-svg";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  icon: ImageSourcePropType;
  title: string;
  color: string;
  focused: boolean;
}) {
  return (
    <View className="flex-1 mt-3 flex flex-col items-center gap-1">
      <Image
        className="size-6"
        source={props.icon}
        resizeMode="contain"
        tintColor={props.focused ? PRIMARY_COLOR : SECONDARY_COLOR}
      />

      <Text
        className={cn(
          "font-rubik-medium font-semibold text-[12px] w-full ",
          props.focused ? `text-primary-300` : `text-black-200`
        )}
      >
        {props.title}
      </Text>
    </View>
  );
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "white",
          minHeight: 82,
          borderWidth: 2,
          borderTopWidth: 1,
          borderTopColor: "#0061FF1A",
          position: "absolute",
        },
      }}
    >
      {MAIN_APP_TABS.map((tab, index) => (
        <Tabs.Screen
          key={index}
          name={tab.title}
          options={{
            title: tab.title, // check link
            tabBarShowLabel: false,
            // tabBarLabel : "", // anthor way to hide title
            tabBarLabelStyle: { display: "none" },
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                title={tab.title}
                icon={focused ? tab.activeIcon : tab.icon}
                color={color}
                focused={focused}
              />
            ),
            headerShown: false,
          }}
        />
      ))}
    </Tabs>
  );
}
