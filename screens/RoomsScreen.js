import { View, Text, StyleSheet, ScrollView, FlatList } from "react-native";
import React from "react";
import RoomsCard from "../components/RoomsCard";
import { useRoute } from "@react-navigation/native";

const RoomsScreen = () => {
  const route = useRoute();
  const { item } = route.params; // Accessing parameters passed through navigation
  console.log(item);
  return (
    <View style={styles.root}>
      <FlatList
        data={item}
        renderItem={({ item, index }) => (
          <RoomsCard item={item} index={index} />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  root: { backgroundColor: "white", flex: 1 },
});
export default React.memo(RoomsScreen);
RoomsScreen.MyPostsScreen = "RoomsScreen";
