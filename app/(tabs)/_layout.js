import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";

const StackLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen name="today"   />
      <Tabs.Screen name="weekly"  />
      <Tabs.Screen name="create"  />
    </Tabs>
  );
};

export default StackLayout;

const styles = StyleSheet.create({});
