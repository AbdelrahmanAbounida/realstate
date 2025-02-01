import React from "react";
import { Stack } from "expo-router";

export default function Layout() {
  return (
    // <Stack>
    //   <Stack.Screen name="main"  options={{ headerShown: false }} />
    //   <Stack.Screen name="login" options={{ headerShown: false }} />
    //   <Stack.Screen name="register" options={{ headerShown: false }} />
    // </Stack>
    <Stack screenOptions={{ headerShown: false }} />
  );
}
