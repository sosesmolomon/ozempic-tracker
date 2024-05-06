import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

import {
  Entypo,
  Ionicons,
  Feather,
  FontAwesome,
  AntDesign,
} from "@expo/vector-icons";

const CreateHabit = () => {
  const router = useRouter();

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Entypo name="foursquare" size={27} color="black" />
      <AntDesign
        onPress={() => router.push("/(tabs)/create/habit")}
        name="pluscircle"
        size={24}
        color="black"
      />
    </View>
  );
};


const styles = StyleSheet.create({})

export default CreateHabit;