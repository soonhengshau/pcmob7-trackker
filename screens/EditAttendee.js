import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import PropTypes from "prop-types";
import firebase from "../database/firebaseDB";

const db = firebase.firestore().collection("attendees");

export default function EditAttendee({ route, navigation }) {
  const [editName, setEditName] = useState("");
  const [editClass, setEditClass] = useState("");
  const { id, name, className } = route.params;

  useEffect(() => {
    setEditName(name);
    setEditClass(className);
  }, []);

  function saveChange(id) {
    const newNote = {
      name: editName,
      class: editClass,
    };
    Alert.alert("Attendee has been edited!");
    db.doc(id).update(newNote);
    navigation.navigate("Home");
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputRow}>
        <Text>Name:</Text>
        <TextInput
          value={editName}
          style={styles.input}
          onChangeText={setEditName}
        />
      </View>
      <View style={styles.inputRow}>
        <Text>Class:</Text>
        <TextInput
          value={editClass}
          style={styles.input}
          onChangeText={setEditClass}
        />
      </View>
      <TouchableOpacity onPress={() => saveChange(id)} style={styles.button}>
        <Text style={styles.buttonText}>Save Edited</Text>
      </TouchableOpacity>
    </View>
  );
}

EditAttendee.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  inputRow: {
    margin: 10,
    width: "80%",
  },
  input: {
    borderColor: "black",
    borderWidth: 1,
    padding: 10,
  },
  button: {
    backgroundColor: "orange",
    borderRadius: 10,
    width: "80%",
    padding: 10,
  },
  buttonText: {
    textAlign: "center",
  },
});
