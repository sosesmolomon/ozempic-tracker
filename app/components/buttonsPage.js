import React from "react";
import { View, Pressable, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const ButtonsPage = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.button}
        onPress={() => router.push("/(tabs)/create/habit")}
      >
        <Ionicons name="create" size={24} color="white" />
        <Text style={styles.buttonText}>Create Habit</Text>
      </Pressable>

      <Pressable
        style={styles.button}
        onPress={() => router.push("/(tabs)/create/tag")}
      >
        <Ionicons name="pricetag" size={24} color="white" />
        <Text style={styles.buttonText}>Create Tag</Text>
      </Pressable>

      <Pressable
        style={styles.button}
        onPress={() => router.push("/(tabs)/create/popup")}
      >
        <Ionicons name="notifications" size={24} color="white" />
        <Text style={styles.buttonText}>Create Popup</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#2196F3",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginVertical: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
});

export default ButtonsPage;
