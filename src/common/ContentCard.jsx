import React, { useState } from "react";
import {  TouchableOpacity,  Text,  Animated,  Pressable,  Modal } from "react-native";
import FastImage from "react-native-fast-image";
import { useNavigation } from "@react-navigation/native";
import { useMMKVBoolean } from 'react-native-mmkv';
import { DeleteFromFavourites } from "../utils/fetchs";

const ContentCard = ({ refreshParent,isFavourite, item, type = "movie" }) => {

  const navigation = useNavigation();
  const [showInfoBar, setShowInfoBar] = useState(false);
  const [isDarkMode] = useMMKVBoolean("darkMode");
  const slideAnim = useState(new Animated.Value(200))[0];


  const handleLongPress = () => {
    if (!isFavourite) return;
    setShowInfoBar(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  const hideInfoBar = () => {
    Animated.timing(slideAnim, {
      toValue: 200,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setShowInfoBar(false);
    });
  };

  const handleDelete = async () => {
    await DeleteFromFavourites(item.id)
    hideInfoBar();
    refreshParent?.();
  };

  return (
    <>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Home", {
            screen: "Details",
            params: { id: item.id, type, item },
          })
        }
        onLongPress={handleLongPress}
        delayLongPress={300}
      >
        <FastImage
          style={{
            width: 125,
            height: 175,
            borderRadius: 12,
          }}
          source={{
            uri: `https://image.tmdb.org/t/p/original${item.poster_path}`,
            priority: FastImage.priority.high,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
      </TouchableOpacity>

      {isFavourite && (
        <Modal transparent visible={showInfoBar} animationType="none">
          <Pressable
            onPress={hideInfoBar}
            style={{
              flex: 1,
              backgroundColor: "rgba(0,0,0,0.4)",
              justifyContent: "flex-end",
            }}
          >
            <Animated.View
              style={{
                backgroundColor: isDarkMode?"#252631":"white",
                padding: 20,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                transform: [{ translateY: slideAnim }],
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "500",
                  textAlign: "center",
                  color:isDarkMode?"#ffffff":"black",
                  marginBottom: 16,
                }}
              >
                Do you want to delete this item from favourites?
              </Text>

              <TouchableOpacity
                onPress={handleDelete}
                style={{
                  backgroundColor: "#3A3CB3",
                  paddingVertical: 12,
                  borderRadius: 10,
                  marginBottom: 10,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 14,
                    textAlign: "center",
                    fontWeight: "600",
                  }}
                >
                  Delete
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={hideInfoBar}>
                <Text
                  style={{
                    color:isDarkMode?"#ffffff":"black",
                    fontSize: 14,
                    textAlign: "center",
                    paddingVertical: 8,
                  }}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </Pressable>
        </Modal>
      )}
    </>
  );
};

export default ContentCard;