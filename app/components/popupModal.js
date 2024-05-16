import React from "react";
import { StyleSheet, View, Pressable, Text, TouchableOpacity } from "react-native";
import {
  Modal,
  BottomModal,
  ModalTitle,
  SlideAnimation,
  ModalContent,
} from "react-native-modals";
const PopupModal = (showModal, hideModal, selectedHabitTags) => {
  console.log(selectedHabitTags);
  return (
    <>
      <Modal
        visible={showModal}
        onBackdropPress={hideModal}
        onSwipeComplete={hideModal}
        swipeDirection="down"
        style={styles.modal}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Habit Tip, {selectedHabitTags}</Text>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  container: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  tip: {
    fontSize: 16,
  },
});

export default PopupModal;
