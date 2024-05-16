import React from "react";
import {View, Pressable, Text, TouchableOpacity} from 'react-native';
import {
  Modal,
  BottomModal,
  ModalTitle,
  SlideAnimation,
  ModalContent,
} from "react-native-modals";

const DeleteConfirmation = ({
  showModal,
  hideModal,
  confirmModal,
  message,
}) => {
    console.log("message:",message);
  return (
    <Modal
      visible={showModal}
      transparent={true}
      animationType="fade"
      onRequestClose={hideModal}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <View
          style={{ backgroundColor: "white", padding: 20, borderRadius: 10 }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
            Delete Confirmation
          </Text>
          <Text style={{ color: "red", marginBottom: 20 }}>{message}</Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <TouchableOpacity
              onPress={hideModal}
              style={{ backgroundColor: "gray", padding: 10, borderRadius: 5 }}
            >
              <Text style={{ color: "white" }}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => confirmModal()}
              style={{ backgroundColor: "red", padding: 10, borderRadius: 5 }}
            >
              <Text style={{ color: "white" }}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteConfirmation;
