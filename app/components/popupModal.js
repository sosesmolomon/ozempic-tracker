import React from "react";
import {
  StyleSheet,
  View,
  Pressable,
  Text,
  TouchableOpacity,
} from "react-native";
import {
  Modal,
  BottomModal,
  ModalTitle,
  SlideAnimation,
  ModalContent,
} from "react-native-modals";

import { Ionicons } from "@expo/vector-icons"; // Assuming you are using Expo for icons
import { MaterialCommunityIcons } from "@expo/vector-icons";

const PopupModal = ({ showModal, hideModal, selectedHabitTags }) => {
  console.log(selectedHabitTags);
  console.log(showModal);
  return (
    <>
      <Modal
        visible={showModal}
        animationType="fade"
        transparent={true}
        onRequestClose={hideModal}
      >
        <Pressable onPress={hideModal}>
          <View style={styles.modalOverlay} />
        </Pressable>
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={hideModal} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="black" />
          </TouchableOpacity>
          <View style={styles.lightbulb}>
            <MaterialCommunityIcons
              name="lightbulb-on-outline"
              size={32}
              color="yellow"
            />
          </View>
          <View style={styles.contentContainer}>
            <Text>Did You Know??</Text>
            <Text>JSDFLKASDJFKLDSJKLGJADLKB;Jfdjlfkjdasklfjdkslfjdsakl;</Text>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    backgroundColor: "white",
    padding: 20,        
    borderRadius: 10,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  contentContainer: {
    alignItems: "center",
    paddingTop: 20,
  },
  lightbulb: {
    alighItems: "left",
    paddingTop: 10,
  },
});

export default PopupModal;
