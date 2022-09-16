import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import AttendanceAdd from "./screens/AttendanceAdd";
import AttendeeAdd from "./screens/AttendeeAdd";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AttendanceAdd">
        <Stack.Screen name="Add Attendee" component={AttendanceAdd} />
        <Stack.Screen name="View Attendee" component={AttendeeAdd} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
