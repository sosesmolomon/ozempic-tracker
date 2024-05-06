import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import {
  Entypo,
  Ionicons,
  Feather,
  FontAwesome,
  AntDesign,
} from "@expo/vector-icons";
import axios from "axios";

const TodayPage = () => {
  const [habits, setHabits] = useState([]);

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
      {filteredHabits?.length > 0 ? (
        <View>
          {filteredHabits?.map((item, index) => (
            <Pressable
              key={index}
              onLongPress={() => handleLongPress(item._id)}
              style={{
                marginVertical: 10,
                backgroundColor: '#ADD8E6',
                padding: 12,
                borderRadius: 24,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "500",
                  color: "white",
                }}
              >
                {item?.title}
              </Text>
            </Pressable>
          ))}
        </View>
      ) : (
        <View
          style={{
            marginTop: 150,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "auto",
          }}
        >
          <Image
            style={{ width: 60, height: 60, resizeMode: "cover" }}
            source={{
              uri: "https://cdn-icons-png.flaticon.com/128/10609/10609386.png",
            }}
          />
          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              fontWeight: "600",
              marginTop: 10,
            }}
          >
            No habits for today
          </Text>

          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              fontWeight: "600",
              marginTop: 10,
            }}
          >
            Create One?
          </Text>

          <Pressable
            onPress={() => router.push("/(tabs)/create/habit")}
            style={{
              backgroundColor: "#0071c5",
              marginTop: 20,
              paddingHorizontal: 20,
              paddingVertical: 10,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <Text>Create</Text>
          </Pressable>
        </View>
      )}
    </>
  );
};

export default TodayPage;

const styles = StyleSheet.create({});
