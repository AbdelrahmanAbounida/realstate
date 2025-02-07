import { Link, useLocalSearchParams } from "expo-router";
import { View, Text, StyleSheet } from "react-native";

export default function AppartmentScreen() {
  const { appartmentId } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text>Home</Text>

      <Text className="text-primary-400">AppartmentId: {appartmentId}</Text>
      <Link href={"/"}>Home</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
