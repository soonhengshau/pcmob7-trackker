import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import AttendanceAdd from "./screens/AttendanceAdd";
import AttendeeAdd from "./screens/AttendeeAdd";
import ViewAttendance from "./screens/ViewAttendance";
import ViewAttendee from "./screens/ViewAttendee";
import EditAttendee from "./screens/EditAttendee";
import { TouchableOpacity, Text, StyleSheet, SafeAreaView } from "react-native";

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Add Attendee")}
        style={[styles.button, { backgroundColor: "#D9D9D9" }]}
      >
        <Text style={[styles.buttonText, { color: "black" }]}>
          Add Attendee
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("View Attendee")}
        style={[styles.button, { backgroundColor: "#D9D9D9" }]}
      >
        <Text style={[styles.buttonText, { color: "black" }]}>
          View Attendee
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Add Attendance")}
        style={[styles.button, { backgroundColor: "#3F2020" }]}
      >
        <Text style={[styles.buttonText, { color: "white" }]}>
          Add Attendance
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("View Attendance")}
        style={[styles.button, { backgroundColor: "#3F2020" }]}
      >
        <Text style={[styles.buttonText, { color: "white" }]}>
          View Attendance
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Edit" component={EditAttendee} />
        <Stack.Screen name="Add Attendee" component={AttendeeAdd} />
        <Stack.Screen name="View Attendee" component={ViewAttendee} />
        <Stack.Screen name="Add Attendance" component={AttendanceAdd} />
        <Stack.Screen name="View Attendance" component={ViewAttendance} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F6805A",
  },
  button: {
    marginTop: 10,
    padding: 10,
    width: "50%",
    borderRadius: 10,
  },
  buttonText: {
    textAlign: "center",
  },
});
