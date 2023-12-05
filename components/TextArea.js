import { View, Text, StyleSheet, TextInput } from "react-native";
import React from "react";

const TextArea = ({ text, setText, numLines = 10, placeholder }) => {
  return (
    <View style={styles.root}>
      <TextInput
        style={{ textAlignVertical: "top", fontSize: 15 }}
        multiline={true}
        numberOfLines={numLines}
        onChangeText={(text) => setText(text)}
        value={text}
        placeholder={placeholder}
        keyboardType="default"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    marginHorizontal: 5,
    borderRadius: 5,
    padding: 10,
    borderWidth: 0.2,

    borderColor: "gray",
  },
});
export default TextArea;
