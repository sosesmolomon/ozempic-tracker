import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import CreateHabit from "../../components/createHabit";
import ButtonsPage from "../../components/buttonsPage";

import {
    Entypo,
    Ionicons,
    Feather,
    FontAwesome,
    AntDesign,
  } from "@expo/vector-icons";

const index = () => {
    const router = useRouter();
  return (
    <View>
      <Text>home page for creating things</Text>
      <CreateHabit />
      <ButtonsPage></ButtonsPage>


    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
