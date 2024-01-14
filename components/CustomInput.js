import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
const CustomInput = ({
  value,
  setValue,
  placeholder,
  iconName,
  secureTextEntry,
  errors,
  onBlur,
  keyboardType,
  editable = true,
}) => {
  return (
    <View>
      <View style={styles.container}>
        {/* <Text style={styles.text}>{label}</Text> */}
        <Icon name={iconName} style={styles.icon} size={22} />
        <TextInput
          autoCapitalize="none"
          style={styles.input}
          placeholder={placeholder}
          value={value}
          onChangeText={setValue}
          secureTextEntry={secureTextEntry}
          onBlur={onBlur}
          keyboardType={keyboardType}
          editable={editable}
          
        />
      </View>
      {errors && <Text style={styles.errorText}>{errors}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "white",
    width: "100%",
    borderColor: "#8F00FF",
    borderRadius: 15,
    borderWidth: 1,
    padding: 10,
    marginTop: 5,
  },
  input: {
    fontSize: 15,
    marginBottom: 2,
  },
  icon: {
    marginRight: 8,
    marginTop: 2,
  },
  text: {
    padding: 5,
  },
  errorText: {
    color: "red",
    marginBottom: 2,
    marginLeft: 4,
    fontSize: 15,
  },
});

export default CustomInput;
