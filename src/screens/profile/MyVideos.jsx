import { View, Text, Image } from 'react-native';
import { useMMKVBoolean } from 'react-native-mmkv';
import { useState, useEffect } from 'react';
import ContentList from '../../common/ContentList';
import { storage } from '../../utils/MMKVStore';

const MyVideos = () => {
  const [isDarkMode] = useMMKVBoolean("darkMode");
  const [imageUri, setImageUri] = useState();
  const [username, setUsername] = useState();

  useEffect(() => {
    setImageUri(storage.getString("profilePhoto"));
    setUsername(storage.getString("username"));
  }, []);

  const profileHeader = (
    <View className={`items-center px-5 mb-6 py-2 ${isDarkMode ? 'bg-[#252631]' : 'bg-white'}`}>
      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          style={{width:140,height:140}}
          className="rounded-full mb-3 border-2 border-gray-500"
        />
      )}
      <Text className={`text-xl font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-black'}`}>
        {username}
      </Text>
      <Text className="text-base text-gray-400">My Videos</Text>
    </View>
  );

  return (
    <View className={`flex-1 ${isDarkMode ? 'bg-[#252631]' : 'bg-white'}`}>
      <ContentList
        type="video"
        showLoading={true}
        myContent={true}
        loadingType="basic"
        ListHeaderComponent={profileHeader}
      />
    </View>
  );
};

export default MyVideos;
