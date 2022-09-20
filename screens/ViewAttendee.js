import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import firebase from "../database/firebaseDB";

const db = firebase.firestore().collection("attendees");

export default function ViewAttendee({ navigation }) {
  const [attendeeInfo, setAttendeeInfo] = useState("");

  // This is to connect the firebase
  useEffect(() => {
    const unsubscribe = db.onSnapshot((collection) => {
      const updatedInfo = collection.docs.map((doc) => {
        const noteObject = {
          ...doc.data(),
          id: doc.id,
        };
        //console.log();
        return noteObject;
      });
      //console.log(updatedInfo);
      setAttendeeInfo(updatedInfo);
    });

    return () => unsubscribe();
  }, []);

  function deleteNote(id) {
    console.log("Deleting " + id);

    firebase.firestore().collection("attendees").doc(id).delete();
  }

  // The function to render each row in our FlatList
  function renderItem({ item }) {
    return (
      <View
        style={{
          padding: 10,
          paddingTop: 20,
          paddingBottom: 20,
          borderBottomColor: "#ccc",
          borderBottomWidth: 1,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text>{item.name}</Text>
        <Text>{item.class}</Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Edit", {
              id: item.id,
              name: item.name,
              className: item.class,
            })
          }
        >
          <Text>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteNote(item.id)}>
          <Ionicons name="trash" size={16} color="#944" />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={attendeeInfo}
        renderItem={renderItem}
        style={{ width: "100%" }}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D9D9D9",
    alignItems: "center",
    justifyContent: "center",
  },
});
