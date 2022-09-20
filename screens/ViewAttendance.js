import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from "react-native";
import firebase from "../database/firebaseDB";

const db = firebase.firestore().collection("attendance");

export default function ViewAttendee() {
  const [table, setTable] = useState([]);

  // This is to connect the firebase
  useEffect(() => {
    const unsubscribe = db.onSnapshot((collection) => {
      const updatedInfo = collection.docs.map((doc) => {
        const noteObject = {
          ...doc.data(),
          id: doc.id,
        };

        return noteObject;
      });
      setTable(updatedInfo);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const nameObject = table.map((item) => {
    return {
      name: item.attendeeID,
      id: item.id,
      status: item.status,
      time: item.timestamp,
    };
  });

  function deleteTable() {
    if (table.length !== 0) {
      table.forEach((item) =>
        firebase.firestore().collection("attendance").doc(item.id).delete()
      );
      console.log("Table is deleted");
      Alert.alert("Table is deleted!");
    } else {
      console.log("There is nothing to delete!");
      Alert.alert("There is nothing to delete!");
    }
  }

  // The function to render each row in our FlatList
  function renderItem({ item }) {
    // console.log(nameObject);
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
        <Text style={styles.listText}>{item.name}</Text>
        <Text style={styles.listText}>{item.status}</Text>
        <Text style={styles.listTime}>{item.time}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={nameObject}
        renderItem={renderItem}
        style={{ width: "100%" }}
        keyExtractor={(item) => item.id.toString()}
      />
      <TouchableOpacity onPress={deleteTable} style={styles.button}>
        <Text style={styles.buttonText}>Delete Table</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3F2020",
    alignItems: "center",
    justifyContent: "center",
  },
  listText: {
    color: "white",
    fontSize: 18,
  },
  listTime: {
    color: "white",
  },
  button: {
    padding: 10,
    backgroundColor: "orange",
    borderRadius: 5,
    margin: 20,
    width: "80%",
  },
  buttonText: {
    fontSize: 22,
    textAlign: "center",
  },
});
