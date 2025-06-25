import React, { useState, useCallback, useEffect } from 'react';
import { Alert, ScrollView, Text, View, Image, TouchableOpacity } from "react-native";
import { useTranslation } from 'react-i18next';
import { useRoute } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faE, faEye } from '@fortawesome/free-solid-svg-icons';
import YoutubePlayer from "react-native-youtube-iframe";
import { useMMKVBoolean } from 'react-native-mmkv';
import Comments from '../../common/Comments';
import LikeButton from '../../common/LikeButton';

const PersonalMoviePlayer = () => {
  const route = useRoute();
  const { movie } = route.params;
  const [playing, setPlaying] = useState(false);
  const [viewMore, setViewMore] = useState(false);
  const [isDarkMode] = useMMKVBoolean("darkMode");
  const { t } = useTranslation();

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("Video has finished playing!");
    }
  }, []);

  const extractYouTubeVideoId = (url) => {
    if (!url) return null;
    if (url.includes("watch?v=")) {
      return url.split("watch?v=")[1].substring(0, 11);
    }
    if (url.includes("youtu.be/")) {
      return url.split("youtu.be/")[1].substring(0, 11);
    }
    return null;
  };

  useEffect(() => {
    console.log(movie);
  }, []);

  const videoId = extractYouTubeVideoId(movie.link);

  return (
    <ScrollView style={{ paddingBottom: 40, flex: 1, backgroundColor: isDarkMode ? 'black' : '#ffffff' }}>
      <YoutubePlayer
        height={240}
        play={playing}
        videoId={videoId}
        onChangeState={onStateChange}
      />

      <View className='px-3'>
        <Text style={{ color: isDarkMode ? '#fff' : '#000' }} className='text-3xl font-extrabold mb-2 mt-3'>
          {movie.title}
        </Text>
        <View className='flex-row items-center mb-2'>
          <LikeButton movieId={movie.id} initialLike={movie.likeCount} initialDislike={movie.dislikeCount} />
          <FontAwesomeIcon icon={faEye} size={20} color="gray" />
          <Text className='ms-1' style={{ color: isDarkMode ? "white" : "black" }}>{movie.viewCount || 1}</Text>
        </View>

        <View className='flex-row gap-5 items-center'>
          <Image
            style={{ width: 45, height: 45 }}
            className='rounded-full'
            source={{ uri: movie.publisherPhoto }}
          />
          <Text style={{ color: isDarkMode ? '#fff' : '#000' }} className='text-xl font-bold mb-2 mt-3'>
            {movie.publisherName}
          </Text>
        </View>

        <View
  style={{
    backgroundColor: isDarkMode ? '#15121E' : '#F0F0F0',
  }}
  className='mt-3 p-2 px-4 rounded-lg'
>
  <View className='flex-row gap-5 justify-between'>
   
    <Text
      style={{ color: isDarkMode ? '#fff' : '#000' }}
      className='mb-2 mt-3'
    >
      {movie.publishDate}
    </Text>
  </View>

  <TouchableOpacity onPress={() => setViewMore(prev => !prev)}>
    <Text
      style={{ color: isDarkMode ? '#fff' : '#000' }}
      className='mb-2 mt-3 text-base'
    >
      {
        !viewMore
          ? `${movie.description?.substring(0, 150)}`
          : movie.description
      }
      {
        movie.description?.length > 150 && !viewMore &&
        <Text className='font-bold' style={{ color: isDarkMode ? '#999' : '#555' }}>
          ...{t("more")}
        </Text>
      }
    </Text>
  </TouchableOpacity>
</View>

      </View>

      <Comments movieId={movie.id} />
    </ScrollView>
  );
};

export default PersonalMoviePlayer;
