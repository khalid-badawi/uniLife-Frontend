import { View, Text, StyleSheet } from "react-native";
import React from "react";

const ScheduleItem = () => {
  return (
    <View style={styles.root}>
      <Text>ScheduleItem</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
  },
});
export default ScheduleItem;
