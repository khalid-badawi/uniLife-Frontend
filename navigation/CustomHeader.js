import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, View, TextInput, Text } from "react-native";
import { Header } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icon3 from "react-native-vector-icons/MaterialIcons";
import SearchIcon from "react-native-vector-icons/AntDesign";
import Icon4 from "react-native-vector-icons/Ionicons";
import { useSearch } from "../Contexts/SearchContext";

const CustomHeader = ({
  close,
  title,
  search = false,
  type = "stack",
  searchPlaceHolder = "Search...",
  children,
}) => {
  const navigation = useNavigation();
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const { searchQuery, setSearchQuery } = useSearch();
  const renderLeftComponent = () => {
    if (type === "drawer") {
      return (
        <TouchableOpacity
          style={{ paddingVertical: 5 }}
          onPress={() => navigation.openDrawer()}
        >
          <Icon name="menu" size={25} color="#fff" />
        </TouchableOpacity>
      );
    } else if (type === "stack") {
      return (
        <TouchableOpacity
          style={{ paddingVertical: 5 }}
          onPress={close ? close : () => navigation.goBack()}
        >
          <Icon4 name="chevron-back" size={25} color="#fff" />
        </TouchableOpacity>
      );
    }
    return null;
  };
  return (
    <Header
      placement="center"
      centerComponent={
        <View style={{ flex: 1, flexDirection: "row" }}>
          {isSearchVisible ? (
            <View
              style={{
                paddingVertical: 5,
                borderRadius: 25,
                paddingHorizontal: 5,
                backgroundColor: "#AC43FF",

                flex: 1,
              }}
            >
              <TextInput
                style={{
                  color: "white",
                  fontSize: 16,
                  fontWeight: "700",
                  paddingHorizontal: 5,
                }}
                placeholder={searchPlaceHolder}
                value={searchQuery}
                placeholderTextColor="white"
                onChangeText={(text) => setSearchQuery(text)}
              />
            </View>
          ) : (
            <Text
              style={{
                color: "#fff",
                fontSize: 20,
                paddingVertical: 5,
                alignSelf: "flex-start",
                flex: 1,
              }}
            >
              {title}
            </Text>
          )}
        </View>
      }
      leftComponent={renderLeftComponent}
      backgroundColor="#A100FF"
      rightComponent={() => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 5,
          }}
        >
          {isSearchVisible && (
            <TouchableOpacity
              onPress={() => {
                setIsSearchVisible(false);
              }}
            >
              <Icon3 name="cancel" size={25} color="white" />
            </TouchableOpacity>
          )}
          {!isSearchVisible && search && (
            <TouchableOpacity
              style={{ marginRight: 10 }}
              onPress={() => setIsSearchVisible(!isSearchVisible)}
            >
              <SearchIcon name="search1" size={25} color="white" />
            </TouchableOpacity>
          )}
          {!search && children}
        </View>
      )}
    />
  );
};
export default CustomHeader;
