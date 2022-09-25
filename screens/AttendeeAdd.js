import React, { useState, useEffect } from "react";
import {
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  View,
  Alert,
} from "react-native";
import PropTypes from "prop-types";
import firebase from "../database/firebaseDB";

const db = firebase.firestore().collection("attendees");

export default function AttendeeAdd({ navigation }) {
  const [nameText, setNameText] = useState("");
  const [classText, setClassText] = useState("");
  const [attendeeInfo, setAttendeeInfo] = useState("");

  // This is to connect the firebase
  useEffect(() => {
    const unsubscribe = db.onSnapshot((collection) => {
      const updatedInfo = collection.docs.map((doc) => {
        const noteObject = {
          ...doc.data(),
          id: doc.id,
        };
        // console.log(noteObject);
        return noteObject;
      });
      setAttendeeInfo(updatedInfo);
    });
    return () => unsubscribe();
  }, []);

  function saveName() {
    if (nameText && classText) {
      const checks = attendeeInfo.find(
        (item) => item.name == nameText && item.class == classText
      );
      if (!checks) {
        const newNote = {
          name: nameText,
          class: classText,
        };
        db.add(newNote);
        setNameText("");
        setClassText("");
        Alert.alert("Data saved");
        navigation.navigate("Home");
      } else {
        Alert.alert("There is already a copy");
      }
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.rowName}>
        <Text style={{ fontSize: 18 }}>Name:</Text>
        <TextInput
          style={styles.textInput}
          value={nameText}
          onChangeText={(input) => setNameText(input)}
        />
      </View>
      <View style={styles.rowName}>
        <Text style={{ fontSize: 18 }}>Class:</Text>
        <TextInput
          style={styles.textInput}
          value={classText}
          onChangeText={(input) => setClassText(input)}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={saveName}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

AttendeeAdd.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#D9D9D9",
  },
  rowName: {
    flexDirection: "row",
    alignItems: "center",
  },
  textInput: {
    borderColor: "white",
    backgroundColor: "black",
    color: "white",
    fontSize: 22,
    borderWidth: 1,
    width: "60%",
    padding: 10,
    margin: 10,
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
