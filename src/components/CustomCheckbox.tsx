import React from "react";
import { StyleSheet, View } from "react-native";
import CheckBox from "@react-native-community/checkbox"; // Import CheckBox (Make sure to install this package if not already installed)
import { CustomCheckBoxProps } from "../types";

const CustomCheckBox = ({
  isItemSelected,
  toggleItem,
  testId,
}: CustomCheckBoxProps) => {
  return (
    <View style={styles.checkBoxWrapper}>
      <CheckBox
        value={isItemSelected}
        onValueChange={toggleItem}
        boxType="square"
        onFillColor="#ffffff"
        onTintColor="#000"
        lineWidth={1}
        tintColor="#000"
        onCheckColor="#000"
        testID={testId}
      />
    </View>
  );
};

export default CustomCheckBox;

const styles = StyleSheet.create({
  checkBoxWrapper: {
    backgroundColor: "#fff",
  },
});
