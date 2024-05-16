import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Button,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons, AntDesign, FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import TagBubbles from "../../components/tagBubbles";

import axios from "axios";

const create = () => {
  //console.log("in create.js");
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  const [allTags, setAllTags] = useState([]);

  //const [habitTags, setHabitTags] = useState([]);
  let habitTags = [];
  const [selectedTagIds, setSelectedTagIds] = useState([]);

  const colors = [
    "#FF5733", // Red
    "#FFD700", // Gold
    "#5D76A9",
    "#1877F2", // Medium Purple
    "#32CD32", // Lime Green
    "#CCCCFF", // Tomato
    "#4169E1", // Royal Blue
  ];

  useEffect(() => {
    fetchTags();
  }, []);

  async function fetchTags() {
    console.log("fetching tags from create.js");
    try {
      const response = await axios.get("http://localhost:3000/tagslist");
      setAllTags(response.data);
    } catch (error) {
      console.log("error fetching tags", error);
    }
  }

  async function addHabit() {
    try {
      // HERES a question, should I store the string tag names? the tag objects themselves? or just the tag ids to reference later?
      console.log("adding habit");
      console.log("selected Habit tags", selectedTagIds);

      habitTags = allTags.filter((tag) => selectedTagIds.includes(tag._id));
      console.log("Habit tag objects", habitTags);

      const habitDetails = {
        title: title,
        color: selectedColor,
        reminder: true,
        tags: habitTags,
      };
      console.log("Habit details object: ", habitDetails);
      console.log(
        "Habit tag names",
        habitDetails.tags.map((tag) => tag.name)
      );

      const response = axios.post("http://localhost:3000/habits", habitDetails);
      if (response.status === 200) {
        setTitle("");
        Alert.alert("Habit added successfully", "Enjoy");
      }
      console.log("habit added, ", response);
    } catch (error) {
      console.log("error adding habit", error);
    }
  }

  const handleSelectTag = (tagId) => {
    //setSelectedTagIds([...selectedTagIds, tagId]);

    setSelectedTagIds((prevSelectedTagIds) => {
      const updatedTagIds = prevSelectedTagIds.includes(tagId)
        ? prevSelectedTagIds.filter((tId) => tId !== tagId)
        : [...prevSelectedTagIds, tagId];
      return updatedTagIds;
    });

    console.log(selectedTagIds);
  };

  const handleSaveHabit = () => {
    // Save the habit with the selected tags
    addHabit();
  };

  // if im in /create/habit. this page, and I click the Today tab, then click back to /create/, this page will already be open... this is because router.back() is never called...
  return (
    <View style={{ padding: 10 }}>
      <Ionicons
        onPress={() => router.back()}
        name="arrow-back"
        size={24}
        color="black"
      />

      <Text style={{ fontSize: 20, marginTop: 10 }}>
        Create <Text style={{ fontSize: 20, fontWeight: "500" }}>Habit</Text>
      </Text>
      <TextInput
        value={title}
        onChangeText={(text) => setTitle(text)}
        style={{
          width: "95%",
          marginTop: 15,
          padding: 15,
          borderRadius: 10,
          backgroundColor: "#E1EBEE",
        }}
        placeholder="Title"
      />

      <View style={{ marginVertical: 10 }}>
        <Text style={{ fontSize: 18, fontWeight: "500" }}>Color</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            marginTop: 10,
          }}
        >
          {colors?.map((item, index) => (
            <TouchableOpacity
              onPress={() => setSelectedColor(item)}
              key={index}
              activeOpacity={0.8}
            >
              {selectedColor === item ? (
                <AntDesign name="plussquare" size={30} color={item} />
              ) : (
                <FontAwesome name="square" size={30} color={item} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* set tags */}
      <Text style={{ fontSize: 20, marginTop: 10 }}>
        Set <Text style={{ fontSize: 20, fontWeight: "500" }}>Tags</Text>
      </Text>

      <TagBubbles onSelectTag={handleSelectTag} />

      <Button title="Save Habit" onPress={handleSaveHabit} />
    </View>
  );
};

export default create;

const styles = StyleSheet.create({});
