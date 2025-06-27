import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, TouchableOpacity, Text, Image, Animated, Pressable, Modal } from "react-native";
import { useMMKVBoolean } from "react-native-mmkv";
import { DeleteFromFavourites, DeletePersonalMovie } from "../../../utils/fetchs";
import { useTranslation } from "react-i18next";

const PersonalContentCard = ({ refreshParent, item, myContent, type }) => {
  const [isDarkMode] = useMMKVBoolean("darkMode");
  const navigation = useNavigation();
  const [showInfoBar, setShowInfoBar] = useState(false);
  const slideAnim = useState(new Animated.Value(200))[0];
  const { t } = useTranslation();

  const handleLongPress = () => {
    if (!myContent && type !== "videofav") return;
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
    await DeletePersonalMovie(item.id);
    hideInfoBar();
    refreshParent?.();
  };

  const handleDeleteFromFavourites = async () => {
    await DeleteFromFavourites(item.id);
    hideInfoBar();
    refreshParent?.();
  };

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("PersonalMoviePlayer", { movie: item, myContent })}
      onLongPress={handleLongPress}
      delayLongPress={300}
      className="mb-5 mx-3 rounded-2xl overflow-hidden shadow-md"
      style={{
        backgroundColor: isDarkMode ? "#1c1c1e" : "#ffffff",
        shadowColor: isDarkMode ? "#fff" : "#000",
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 3,
      }}
    >
      {item.poster && (
        <Image
          source={{ uri: item.poster }}
          className="w-full h-48"
          resizeMode="cover"
          style={{ borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
        />
      )}

      <View className="p-4">
        <View className="flex-row items-center mb-3">
          {item.publisherPhoto && (
            <Image source={{ uri: item.publisherPhoto }} className="w-10 h-10 rounded-full mr-3" />
          )}
          <Text className="text-sm font-medium" style={{ color: isDarkMode ? "#f0f0f0" : "#222" }}>
            {item.publisherName}
          </Text>
        </View>

        <Text
          className="text-lg font-bold mb-2"
          style={{ color: isDarkMode ? "#ffffff" : "#111111" }}
          numberOfLines={2}
        >
          {item.title}
        </Text>

        <View className="flex-row justify-between items-center mt-2">
          <Text className="text-xs" style={{ color: isDarkMode ? "#ccc" : "#444" }}>
            {item.viewCount} {t("views")}
          </Text>
          <Text className="text-xs" style={{ color: isDarkMode ? "#ccc" : "#444" }}>
            {item.publishDate}
          </Text>
        </View>
      </View>

      {(type === "videofav" || myContent) && (
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
                backgroundColor: isDarkMode ? "#252631" : "white",
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
                  color: isDarkMode ? "#ffffff" : "black",
                  marginBottom: 16,
                }}
              >
                {myContent
                  ? t("deleteMyContentQuestion")
                  : t("deleteFromFavouritesQuestion")}
              </Text>

              <TouchableOpacity
                onPress={myContent ? handleDelete : handleDeleteFromFavourites}
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
                  {t("delete")}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={hideInfoBar}>
                <Text
                  style={{
                    color: isDarkMode ? "#ffffff" : "black",
                    fontSize: 14,
                    textAlign: "center",
                    paddingVertical: 8,
                  }}
                >
                  {t("cancel")}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </Pressable>
        </Modal>
      )}
    </TouchableOpacity>
  );
};

export default PersonalContentCard;
