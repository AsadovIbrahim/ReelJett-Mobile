import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";
import { useMMKVBoolean } from 'react-native-mmkv';

const PersonalContentCard = ({ item }) => {
  const [isDarkMode] = useMMKVBoolean("darkMode");
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("PersonalMoviePlayer", { movie: item })}
      className="mb-5 mx-3 rounded-2xl overflow-hidden shadow-md"
      style={{
        backgroundColor: isDarkMode ? '#1c1c1e' : '#ffffff',
        shadowColor: isDarkMode ? '#fff' : '#000',
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 3
      }}
    >
      {item.poster && (
        <Image
          source={{ uri: item.poster }}
          className="w-full h-48"
          resizeMode="cover"
          style={{
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16
          }}
        />
      )}

      <View className="p-4">
        <View className="flex-row items-center mb-3">
          {item.publisherPhoto && (
            <Image
              source={{ uri: item.publisherPhoto }}
              className="w-10 h-10 rounded-full mr-3"
            />
          )}
          <Text
            className="text-sm font-medium"
            style={{ color: isDarkMode ? '#f0f0f0' : '#222' }}
          >
            {item.publisherName}
          </Text>
        </View>

        <Text
          className="text-lg font-bold mb-2"
          style={{ color: isDarkMode ? '#ffffff' : '#111111' }}
          numberOfLines={2}
        >
          {item.title}
        </Text>

        <View className="flex-row justify-between items-center mt-2">
          <Text
            className="text-xs"
            style={{ color: isDarkMode ? '#ccc' : '#444' }}
          >
            {item.viewCount} views
          </Text>
          <Text
            className="text-xs"
            style={{ color: isDarkMode ? '#ccc' : '#444' }}
          >
            {item.publishDate}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PersonalContentCard;
