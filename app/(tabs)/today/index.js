import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  Alert,
  ScrollView,
  Image,
} from "react-native";
import React from "react";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import {
  Entypo,
  Ionicons,
  Feather,
  FontAwesome,
  AntDesign,
} from "@expo/vector-icons";

import CreateHabit from "../../components/createHabit";
import HabitsNotCompleted from "../../components/habitsNotCompleted";

const HomePage = () => {
  // const [tagName, setTagName] = useState("");
  // const [tags, setTags] = useState([]);
  // const [habits, setHabits] = useState([]);
  // const [option, setOption] = useState("Today");

  // useEffect(() => {
  //   fetchTags();
  // }, []);
  //both of these run everytime it RENDERS, so each type you type a letter, thats a render, and it refetches

  // useFocusEffect(
  //   useCallback(() => {
  //     fetchTags();
  //   }, [])
  // );

  // async function addTag() {
  //   console.log("add tag", tagName);
  //   try {
  //     const tag = {
  //       name: tagName,
  //     };
  //     const response = await axios.post("http://localhost:3000/tags", tag);
  //     if (response.status == 200) {
  //       setTagName("");
  //       Alert.alert("Tag added successfully");
  //     }
  //     console.log("Tag added", response);
  //   } catch (error) {
  //     console.log("error adding tag", error);
  //   }
  // }

  // useEffect(() => {
  //   fetchHabits();
  // }, []);

  // async function fetchHabits() {
  //   console.log("fetching habits");
  //   try {
  //     const response = await axios.get("http://localhost:3000/habitslist");
  //     setHabits(response.data);
  //   } catch (error) {
  //     console.log("error fetching habits", error);
  //   }
  // }
  // const filteredHabits = habits;
  // //   const filteredHabits = habits?.filter((habit) => {
  // //     return !habit.completed || !habit.completed[currentDay];
  // //   });

  return (
    <>
      <ScrollView style={{ flex: 1, backgroundColor: "white", padding: 10 }}>
        <Text
          style={{
            backgroundColor: "#0EFFFF",
            textAlign: "center",
            paddingHorizontal: 10,
            paddingVertical: 8,
            borderRadius: 25,
          }}
        >
          Habits for Today!
        </Text>
        <HabitsNotCompleted />
      </ScrollView>
    </>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#2196F3", // Change this to your desired color
    paddingVertical: 12, // Adjust the vertical padding
    paddingHorizontal: 24, // Adjust the horizontal padding
    borderRadius: 8, // Adjust the border radius
  },
  buttonText: {
    color: "#FFFFFF", // Change this to your desired text color
    fontWeight: "bold", // Adjust the font weight
    fontSize: 16, // Adjust the font size
  },
});
