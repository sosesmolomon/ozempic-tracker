import { StyleSheet, Text, View, Pressable, TextInput, Alert } from "react-native";
import React from "react";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";

import TagView from "../components/tagView";

const index = () => {
  const [tagName, setTagName] = useState("");
  const [tags, setTags] = useState([]);
  // useEffect(() => {
  //   fetchTags();
  // }, []); // need extra , [] on return to only do it once?
  
  useFocusEffect(
    useCallback(() => {
      fetchTags();
    }, [])
  );


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

  async function fetchTags() {
    try {
      const response = await axios.get("http://localhost:3000/tagslist");
      setTags(response.data);
    } catch(error) {
      console.log("error fetching tags", error)
    }    
  }
  console.log(tags);

  return (
    <View>
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
      <TagView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} tags={tags}/>
    </View>

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
