import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import axios from "axios";

const TagBubbles = ({ onSelectTag /*selectedTags */ }) => {
  //console.log("in tag bubbles");
  const [allTags, setAllTags] = useState([]);

  useEffect(() => {
    fetchTags();
  }, []);
  async function fetchTags() {
    console.log("fetching tags from tagBubble");
    try {
      const response = await axios.get("http://localhost:3000/tagslist");
      setAllTags(response.data);
    } catch (error) {
      console.log("error fetching tags", error);
    }
  }

  const [selectedTagIds, setSelectedTagIds] = useState([]); //(selectedTags.map(tag =>tag._id)) // we may have already selected tags (probably for EDIT, not CREATE)
  // const selectedTagIds = [];

  const handleTagPress = (tag) => {
    const tagId = tag._id;
    setSelectedTagIds((prevSelectedTagIds) => {
      const updatedTagIds = prevSelectedTagIds.includes(tagId)
        ? prevSelectedTagIds.filter((tId) => tId !== tagId)
        : [...prevSelectedTagIds, tagId];
      return updatedTagIds;
    });

    onSelectTag(tagId);

    // selectedTagIds = onSelectTag(tagId); -- react is one-direction data flow so this can't work
    console.log(selectedTagIds);
  };
  return (
    <View style={styles.container}>
      {allTags.map((tag) => (
        <TouchableOpacity
          key={tag._id}
          style={[
            styles.bubble,
            selectedTagIds.includes(tag._id)
              ? styles.selectedBubble
              : styles.badBubble,
          ]}
          onPress={() => handleTagPress(tag)}
        >
          <Text
            style={[
              styles.tagText,
              selectedTagIds.includes(tag) && styles.selectedTagText,
            ]}
          >
            {tag.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginVertical: 10,
  },
  bubble: {
    backgroundColor: "#87CEFA",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  selectedBubble: {
    backgroundColor: "#6495ED", // Change the background color for selected bubbles
  },
  badBubble: {
    backgroundColor: "#000000",
  },
  tagText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  selectedTagText: {
    color: "#FFFFFF", // You can change the text color for selected tags if desired
  },
});

export default TagBubbles;
