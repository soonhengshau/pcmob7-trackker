import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from "react-native";
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
  const [loading, setLoading] = useState(false);
  const [isPresent, setIsPresent] = useState("absent");
  let classOptions = [...attendeeInfo];
  const [date, setDate] = useState(null);
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
        };
        return noteObject;
      });
      setAttendeeInfo(updatedInfo);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    let list = [];
    for (let x = 0; x < attendeeInfo.length; x++) {
      list = [...list, attendeeInfo[x].class];
    }
    const unique = [...new Set(list)];

    for (let x in unique) {
      setItems((items) => [...items, { label: unique[x], value: unique[x] }]);
    }
  }, [attendeeInfo]);

  function statusCheck(id) {
    console.log(id);
    loading ? setLoading(false) : setLoading(true);
    loading ? setIsPresent("absent") : setIsPresent("present");
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
          width: "80%",
        }}
      >
        <Text style={styles.item}>{item.name}</Text>
        <TouchableOpacity onPress={() => statusCheck(item.id)}>
          <Text style={styles.item}>{loading ? "Present" : "Absent"}</Text>
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
          status: isPresent,
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3F2020",
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
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
    textAlign: "center",
  },
});
