import React, { useEffect, useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import {
  Entypo,
  Ionicons,
  Feather,
  FontAwesome,
  AntDesign,
} from "@expo/vector-icons";
import axios from "axios";
import {
  Modal,
  BottomModal,
  ModalTitle,
  SlideAnimation,
  ModalContent,
} from "react-native-modals";

import Habit from "../../api/models/habit";
import DeleteConfirmation from "./deleteConfirmationModal";

const HabitsNotCompleted = () => {
  const [habits, setHabits] = useState([]);

  //modal states
  const [selectedHabit, setSelectedHabit] = useState();
  const [isModalVisible, setModalVisible] = useState(false);

  const updateModalVisibility = (currentVisibility) => {
    setModalVisible(!currentVisibility);
  };

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

  const filteredHabits = habits?.filter((habit) => {
    return !habit.completed || !habit.completed[currentDay];
  });

  function handleLongPress(habitId) {
    const selectedHabit = habits?.find((habit) => habit._id == habitId);
    setSelectedHabit(selectedHabit);
    setModalVisible(true);
  }

  const handleCompletion = async () => {
    try {
      const habitId = selectedHabit?._id;
      const updatedCompletion = {
        ...selectedHabit?.completed,
        [currentDay]: true,
      };

      await axios.put(`http://localhost:3000/habits/${habitId}/completed`, {
        completed: updatedCompletion,
      });
      await fetchHabits();

      setModalVisible(false);
    } catch (error) {
      console.log("error", error);
    }
  };

  const deleteHabit = async () => {
    try {
      const habitId = selectedHabit._id;
      const response = await axios.delete(
        `http://localhost:3000/habits/${habitId}`
      );

      await fetchHabits();
      setModalVisible(!isModalVisible);

      if (response.status == 200) {
        console.log(response.data);
      }
    } catch (error) {
      console.log("error", error);
    }
  };


  // Set up some additional local state
  const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState(null);

  // Handle the displaying of the modal based on type and id
  const showDeleteModal = () => {
    setDeleteMessage(`Are you sure you want to delete the habit '${selectedHabit?.name}'?`);
    console.log(selectedHabit.name);
    setDisplayConfirmationModal(true);
  };

  // Hide the modal
  const hideConfirmationModal = () => {
    setDisplayConfirmationModal(false);
  };

  // Handle the actual deletion of the item
  const submitDelete = () => {
    deleteHabit();
    setDisplayConfirmationModal(false);
  };


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
                backgroundColor: "#ADD8E6",
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

      <BottomModal
        onBackdropPress={() => setModalVisible(!isModalVisible)}
        onHardwareBackPress={() => updateModalVisibility(!isModalVisible)}
        swipeDirection={["up", "down"]}
        swipeThreshold={200}
        modalTitle={<ModalTitle title="Choose Option" />}
        modalAnimation={
          new SlideAnimation({
            slideFrom: "bottom",
          })
        }
        visible={isModalVisible}
        onTouchOutside={() => setModalVisible(!isModalVisible)}
      >
        <ModalContent style={{ width: "100%", height: 280 }}>
          <View style={{ marginVertical: 10 }}>
            <Text>Options</Text>
            <Pressable
              onPress={handleCompletion}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 12,
                marginTop: 10,
              }}
            >
              <Ionicons
                name="checkmark-circle-outline"
                size={24}
                color="black"
              />
              <Text>Completed</Text>
            </Pressable>

            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 12,
                marginTop: 10,
              }}
            >
              <Feather name="skip-forward" size={24} color="black" />

              <Text>Skip</Text>
            </Pressable>
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 12,
                marginTop: 10,
              }}
            >
              <AntDesign name="edit" size={24} color="black" />

              <Text>Edit</Text>
            </Pressable>
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 12,
                marginTop: 10,
              }}
            >
              <Feather name="archive" size={24} color="black" />

              <Text>Archive</Text>
            </Pressable>
            <Pressable
              onPress={showDeleteModal}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 12,
                marginTop: 10,
              }}
            >
              <AntDesign name="delete" size={24} color="black" />

              <Text>Delete</Text>
            </Pressable>
          </View>
        </ModalContent>
      </BottomModal>

      <DeleteConfirmation
        showModal={displayConfirmationModal}
        confirmModal={submitDelete}
        hideModal={hideConfirmationModal}
        message={deleteMessage}
      />
    </>
  );
};

export default HabitsNotCompleted;

const styles = StyleSheet.create({});
