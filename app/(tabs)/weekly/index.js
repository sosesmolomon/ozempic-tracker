import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "expo-router";
import axios from "axios";
import {
  Entypo,
  Ionicons,
  Feather,
  FontAwesome,
  AntDesign,
} from "@expo/vector-icons";

const Weekly = () => {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    fetchHabits();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchHabits();
    }, [])
  );

  // const currentDay = new Date()
  //   .toLocaleDateString("en-us", { weekday: "short" })
  //   .slice(0, 3);

  const currentDay = "Mon";
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  async function fetchHabits() {
    console.log("fetching habits");
    try {
      const response = await axios.get("http://localhost:3000/habitslist");
      setHabits(response.data);
    } catch (error) {
      console.log("error fetching habits", error);
    }
  }

  return (
    <View>
      {habits?.map((habit, index) => (
        key={index},
        <Pressable
          style={{
            marginVertical: 10,
            backgroundColor: habit.color,
            padding: 15,
            borderRadius: 24,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 15, fontWeight: "500", color: "white" }}>
              {habit.title}
            </Text>
            <Text style={{ color: "white" }}>{habit.repeatMode}</Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
              marginVertical: 10,
            }}
          >
            {days?.map((day, item) => {
              const isCompleted = habit.completed && habit.completed[day];

              return (
                <Pressable>
                  <Text
                    style={{
                      color: day === currentDay ? "red" : "white",
                    }}
                  >
                    {day}
                  </Text>
                  {isCompleted ? (
                    <FontAwesome
                      name="circle"
                      size={24}
                      color="white"
                      style={{ marginTop: 12 }}
                    />
                  ) : (
                    <Feather
                      name="circle"
                      size={24}
                      color="white"
                      style={{ marginTop: 12 }}
                    />
                  )}
                </Pressable>
              );
            })}
          </View>
        </Pressable>
      ))}
    </View>
  );
};

export default Weekly;

const styles = StyleSheet.create({});
