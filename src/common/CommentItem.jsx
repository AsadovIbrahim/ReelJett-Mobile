import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faThumbsUp, faTrash } from "@fortawesome/free-solid-svg-icons";
import { LikeComment, DeleteComment } from "../utils/fetchs";
import { useTranslation } from "react-i18next";
import { useMMKVString, useMMKVBoolean } from "react-native-mmkv";
import { storage } from "../utils/MMKVStore";

const CommentItem = ({ comment, refreshParent }) => {
  const { id, profilePhoto, username, content, sendingDate, likeCount } = comment;
  const [likeCounter, setLikeCounter] = useState(likeCount);

  const accessToken = useMMKVString("accessToken");
  const currentUser = storage.getString("username");
  const [isDarkMode] = useMMKVBoolean("darkMode");
  const { t } = useTranslation();

  const handleLike = async () => {
    if (accessToken) {
      try {
        const result = await LikeComment(id);
        setLikeCounter(result);
      } catch (err) {
        console.log("Like error:", err);
      }
    } else {
      Alert.alert(t("must-be-logged-in-text"));
    }
  };

  const handleDelete = async () => {
    try {
      await DeleteComment(id);
      refreshParent?.();
    } catch (err) {
      console.log("Delete error:", err);
    }
  };

  const backgroundColor = isDarkMode ? "#2C2C36" : "#F0F0F0";
  const primaryText = isDarkMode ? "text-white" : "text-black";
  const secondaryText = isDarkMode ? "text-gray-400" : "text-gray-700";
  const dateText = isDarkMode ? "text-gray-400" : "text-gray-600";

  return (
    <View style={{ backgroundColor }} className="flex-row p-4 rounded-xl mb-3">
      <Image
        source={{ uri: profilePhoto }}
        className="w-10 h-10 rounded-full mr-3"
      />
      <View className="flex-1">
        <View className="flex-row justify-between items-center">
          <Text className={`font-semibold text-[15px] ${primaryText}`}>{username}</Text>
          <Text className={`text-[12px] ${dateText}`}>{sendingDate}</Text>
        </View>
        <Text className={`text-[14px] mt-1 ${secondaryText}`}>{content}</Text>
        <View className="flex-row mt-2 justify-between">
          <TouchableOpacity
            onPress={handleLike}
            className="flex-row items-center"
          >
            <FontAwesomeIcon icon={faThumbsUp} size={16} color={isDarkMode ? "white" : "#3A3CB3"} />
            <Text className={`ml-1 ${primaryText}`}>{likeCounter}</Text>
          </TouchableOpacity>
          {currentUser === username && (
            <TouchableOpacity
              onPress={handleDelete}
              className="flex-row items-center ml-4"
            >
              <FontAwesomeIcon icon={faTrash} size={16} color={isDarkMode ? "white" : "#333"} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default CommentItem;
