import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const StackLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="habit" options={{ headerShown: false }} />
      <Stack.Screen name="popup" options={{ headerShown: false }} />
      <Stack.Screen name="tag" options={{ headerShown: false }} />
    </Stack>
  );
};

export default StackLayout;

const styles = StyleSheet.create({});
