import React, { useState, useCallback, useEffect } from 'react';
import { Alert, ScrollView, Text, View, Image, TouchableOpacity } from "react-native";
import { useTranslation } from 'react-i18next';
import { useRoute } from '@react-navigation/native';
import YoutubePlayer from "react-native-youtube-iframe";
import { useMMKVBoolean } from 'react-native-mmkv';
import Comments from '../../common/Comments';
import LikeButton from '../../common/LikeButton';
import ViewCount from '../../common/ViewCount';
import { storage } from '../../utils/MMKVStore';
import { AddToFavourites } from '../../utils/fetchs';
import Toast from 'react-native-toast-message';

const PersonalMoviePlayer = () => {
  const route = useRoute();
  const { movie } = route.params;
  const { myContent } = route.params;
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

    const match = url.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : null;
  };


  const handleAddFavourites = async() => {
    const data=await AddToFavourites(movie.id)
    if(data==200){
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: t("favourites-add-ok"),
        position: 'top',
        visibilityTime: 3000,
        topOffset: 50,
      })
    }
    else if(data == 409) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: t('favourites-add-fail'),
        position: 'top',
        visibilityTime: 3000,
        topOffset: 50,
      })
    }
    else if(data==401) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: t('must-be-logged-in-text'),
        position: 'top',
        visibilityTime: 3000,
        topOffset: 50,
      })
    }
  };

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
        <View className='flex-row items-center justify-between'>
          <View className='flex-row items-center mb-2'>
            <LikeButton movieId={movie.id} initialLike={movie.likeCount} initialDislike={movie.dislikeCount} myContent={myContent}/>
            <ViewCount movieId={movie.id} initialCount={movie.viewCount} myContent={myContent}/>
          </View>
          <TouchableOpacity className="rounded-[8px] bg-[#2E2B2F] flex items-center mr-4 p-2" onPress={handleAddFavourites}>
            <Text className=' text-white font-extrabold text-lg'>{t("mylist")}</Text>
          </TouchableOpacity>
        </View>

        <View className='flex-row gap-5 items-center'>
          <Image
            style={{ width: 45, height: 45 }}
            className='rounded-full'
            source={{ uri: !myContent?movie.publisherPhoto:storage.getString("profilePhoto") }}
          />
          <Text style={{ color: isDarkMode ? '#fff' : '#000' }} className='text-xl font-bold mb-2 mt-3'>
            {!myContent?movie.publisherName:storage.getString("username")}
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

      <Comments myContent={myContent} movieId={movie.id} />
    </ScrollView>
  );
};

export default PersonalMoviePlayer;