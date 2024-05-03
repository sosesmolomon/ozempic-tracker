import React from "react";
import { Text, View, StyleSheet } from "react-native";

const TagView = ({ tags }) => {
  return (
    <View style={styles.container}>
      {tags?.map((tag, index) => (
        <View key={index} style={styles.bubble}>
          <Text style={styles.tagText}>{tag.name}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center', // Center the bubbles horizontally
      marginVertical: 10, // Add some vertical spacing
    },
    bubble: {
      backgroundColor: '#87CEFA', // Change the background color to a light blue
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 16, // Decrease the border radius for a better bubble shape
      marginRight: 8,
      marginBottom: 8,
      shadowColor: '#000', // Add a shadow for better visibility
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5, // Add elevation on Android
    },
    tagText: {
      color: '#FFFFFF', // Change the text color to white for better contrast
      fontSize: 14,
      fontWeight: 'bold', // Make the text bold for better visibility
    },
  });

export default TagView;