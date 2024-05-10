import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { ModalPortal } from "react-native-modals";

const StackLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <ModalPortal />
    </>
  );
};

export default StackLayout;

const styles = StyleSheet.create({});
