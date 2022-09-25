import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Alert,
  TouchableOpacity,
} from "react-native";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";

import DropDownPicker from "react-native-dropdown-picker";

import firebase from "../database/firebaseDB";

const db = firebase.firestore().collection("attendees").orderBy("name", "asc");

export default function AttendanceAdd({ navigation }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(null);
  const [attendeeInfo, setAttendeeInfo] = useState("");
  let classOptions = [...attendeeInfo];
  const [date, setDate] = useState(null);
  const [btnData, setBtnData] = useState([]);
  let counter = 0;

  useEffect(() => {
    let today = new Date();
    let date =
      today.getDate() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getFullYear();
    setDate(date);
  }, []);

  // This is to connect the firebase
  useEffect(() => {
    const unsubscribe = db.onSnapshot((collection) => {
      const updatedInfo = collection.docs.map((doc) => {
        const noteObject = {
          ...doc.data(),
          id: doc.id,
          status: "absent",
        };
        return noteObject;
      });
      setAttendeeInfo(updatedInfo);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const u = classOptions.map((arr) => arr.class);
    const y = [...new Set(u)];
    y.forEach((arr) =>
      setItems((prev) => [...prev, { label: arr, value: arr }])
    );
  }, [attendeeInfo]);

  function addMe(id) {
    const newInfo = [...btnData];
    if (btnData[id - 1] == "absent") {
      newInfo[id - 1] = "present";
      Object.assign(funnel[id - 1], { status: "present" });
    } else {
      newInfo[id - 1] = "absent";
    }
    setBtnData(newInfo);
  }

  // The function to render each row in our FlatList
  function renderItem({ item }) {
    counter++;
    let btnId = counter;
    console.log(item);
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
          width: "80%",
        }}
      >
        <Text style={styles.item}>{item.name}</Text>
        <TouchableOpacity onPress={() => addMe(btnId)} style={styles.button}>
          <Text style={styles.buttonText}>{btnData[btnId - 1]}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const funnel = classOptions.filter((item) => {
    return item.class == selected;
  });

  function saveAttendance() {
    if (funnel.length !== 0) {
      funnel.forEach((item) => {
        const newNote = {
          status: item.status,
          attendeeID: item.name,
          timestamp: date,
        };

        firebase.firestore().collection("attendance").add(newNote);
      });
      Alert.alert("Data saved");
      navigation.navigate("Home");
    } else {
      Alert.alert("There is nothing to add.");
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <DropDownPicker
        placeholder="Choose a Class"
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        onSelectItem={(item) => {
          setSelected(item.value);
        }}
      />

      <FlatList
        data={funnel}
        renderItem={renderItem}
        style={styles.flatList}
        keyExtractor={(item) => item.id.toString()}
      />

      <View>
        <TouchableOpacity onPress={saveAttendance} style={styles.button}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

AttendanceAdd.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3F2020",
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    marginRight: 10,
    fontSize: 22,
    color: "white",
  },
  button: {
    backgroundColor: "#704040",
    borderRadius: 10,
    width: "80%",
    padding: 10,
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
  },
});
