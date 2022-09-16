import React from "react";
import { View, Text } from "react-native";
import { useState, useEffect } from "react";
import DropDownPicker from "react-native-dropdown-picker";

export default function AttendanceAdd() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(null);

  const arrays = ["1A", "1B", "1C", "1D", "1D", "1D", "2A", "2B", "2B"];
  const unique = [...new Set(arrays)];
  console.log(value);

  useEffect(() => {
    for (let x in unique) {
      console.log(unique[x]);
      setItems((items) => [...items, { label: unique[x], value: unique[x] }]);
    }
  }, []);

  return (
    <View>
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
          console.log(item);
        }}
      />
      <Text>The value selected is {selected}</Text>
    </View>
  );
}
