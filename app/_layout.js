import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const StackLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default StackLayout;

const styles = StyleSheet.create({});
