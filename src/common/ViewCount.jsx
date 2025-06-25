import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useMMKVBoolean } from "react-native-mmkv";
import { SetViewCount } from "../utils/fetchs";

const ViewCount = ({ movieId, initialCount }) => {
  const [viewCount, setViewCount] = useState(initialCount || 0);
  const [isDarkMode] = useMMKVBoolean("darkMode");

  useEffect(() => {
    const fetchViewCount = async () => {
      try {
        const result = await SetViewCount(movieId);
        if (result?.data) {
          setViewCount(result.data);
        } else if (typeof result === "number") {
          setViewCount(result);
        }
      } catch (error) {
        console.error("View count fetch error:", error);
      }
    };

    if (movieId) {
      fetchViewCount();
    }
  }, [movieId]);

  return (
    <View className="flex-row items-center gap-1">
      <FontAwesomeIcon icon={faEye} size={20} color={isDarkMode ? "white" : "gray"} />
      <Text style={{ color: isDarkMode ? "white" : "black" }}>{viewCount}</Text>
    </View>
  );
};

export default ViewCount;
