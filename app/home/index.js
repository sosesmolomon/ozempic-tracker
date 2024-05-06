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

import CreateHabit from "../components/createHabit";
import TodayPage from "../components/todayPage";

const index = () => {
  const [tagName, setTagName] = useState("");
  const [tags, setTags] = useState([]);
  const [habits, setHabits] = useState([]);
  const [option, setOption] = useState("Today");

  // useEffect(() => {
  //   fetchTags();
  // }, []);
  //both of these run everytime it RENDERS, so each type you type a letter, thats a render, and it refetches

  // useFocusEffect(
  //   useCallback(() => {
  //     fetchTags();
  //   }, [])
  // );

  async function addTag() {
    console.log("add tag", tagName);
    try {
      const tag = {
        name: tagName,
      };
      const response = await axios.post("http://localhost:3000/tags", tag);
      if (response.status == 200) {
        setTagName("");
        Alert.alert("Tag added successfully");
      }
      console.log("Tag added", response);
    } catch (error) {
      console.log("error adding tag", error);
    }
  }

  useEffect(() => {
    fetchHabits();
  }, []);

  async function fetchHabits() {
    console.log("fetching habits");
    try {
      const response = await axios.get("http://localhost:3000/habitslist");
      setHabits(response.data);
    } catch (error) {
      console.log("error fetching habits", error);
    }
  }
  const filteredHabits = habits;
  //   const filteredHabits = habits?.filter((habit) => {
  //     return !habit.completed || !habit.completed[currentDay];
  //   });


  return (
    <>
      <ScrollView style={{ flex: 1, backgroundColor: "white", padding: 10 }}>
        <CreateHabit />
        <Text>home</Text>

        {/* add tags */}

        <TextInput
          value={tagName}
          onChangeText={(text) => setTagName(text)}
          style={{
            width: "95%",
            marginTop: 15,
            padding: 15,
            borderRadius: 10,
            backgroundColor: "#E1EBEE",
          }}
          placeholder="Tag"
        />

        <Pressable
          onPress={addTag}
          style={{
            marginTop: 25,
            backgroundColor: "#00428c",
            padding: 10,
            borderRadius: 8,
          }}
        >
          <Text
            style={{ textAlign: "center", color: "white", fontWeight: "bold" }}
          >
            SAVE
          </Text>
        </Pressable>
        <TodayPage />
      </ScrollView>
    </>
  );
};

export default index;

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
