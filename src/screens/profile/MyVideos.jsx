import { View, Text, Image, ScrollView } from "react-native";
import { useMMKVBoolean } from 'react-native-mmkv';
import ContentList from '../../common/ContentList';
import { storage } from "../../utils/MMKVStore";
import { useState, useEffect } from "react";

const MyVideos = () => {
  const [isDarkMode] = useMMKVBoolean("darkMode");
  const [imageUri, setImageUri] = useState();
  const [username, setUsername] = useState();

  useEffect(() => {
    setImageUri(storage.getString("profilePhoto"));
    setUsername(storage.getString("username"));
  }, []);

  const profileHeader = (
  <View
    style={{
      alignItems: 'center',
      paddingVertical: 30,
      paddingHorizontal: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#292737',
      backgroundColor: '#252631',
    }}
  >
    {imageUri && (
      <Image
        source={{ uri: imageUri }}
        style={{
          width: 150,
          height: 150,
          borderRadius: 80,
          marginBottom: 12,
          borderWidth: 2,
          borderColor: '#666',
        }}
      />
    )}
    <Text
      style={{
        fontSize: 20,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 4,
      }}
    >
      {username}
    </Text>
    <Text
      style={{
        fontSize: 16,
        color: '#aaa',
      }}
    >
      My Videos
    </Text>
  </View>
);

  return (
    <View contentContainerStyle={{ paddingBottom: 2 }} className="flex-1 bg-[#15121E]"
              style={{ flex: 1, backgroundColor: isDarkMode ? '#252631' : '#ffffff' }}
        >
      <ContentList type="video" myContent={true} ListHeaderComponent={profileHeader} />
    </View>
  );
};

export default MyVideos;
