import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import { useMMKVBoolean } from 'react-native-mmkv';
import LikeButton from '../../common/LikeButton';
import Comments from '../../common/Comments';
import ViewCount from '../../common/ViewCount';
import { useTranslation } from 'react-i18next';
import { GetMovieEmbedLink} from '../../utils/fetchs';
import {View,Text,TouchableOpacity,ActivityIndicator,Dimensions} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const fallbackLink ='https://streambucket.net/?play=SW1HV1NUZUcxTWdkNDd2QVRGb0tTaXFTVStiSXNRdkNNcXVqOWtRdGljYU5nQ1JNd21GbWdVeTN5anE2RG1rN2RMSVcvT09YSVo1V0pHbzZjNlhLN2F4MDNZaWhzN2hDUDhRV1dtMFRoUnl4d0YyNFJWQVRlOTAvLzBEay9ZODZwOFdFQnJYUTYvUWRGVjJNQ0ZqbndURzY5QT09';

const MoviePlayer = () => {
  const route = useRoute();
  const { movie } = route.params;
  const [loading, setLoading] = useState(true);
  const [currentOption, setCurrentOption] = useState('TR Dublaj');
  const [embedLink, setEmbedLink] = useState(null);
  const [dublaj, setDublaj] = useState(null);
  const [altyazi, setAltyazi] = useState(null);
  const [multiple, setMultiple] = useState(null);
  const [viewCount, setViewCount] = useState(1);
  const [isDarkMode] = useMMKVBoolean('darkMode');
  const {t}= useTranslation();

  useEffect(() => {
    const fetchEmbedLink = async () => {
      try {
        if (!movie?.id || !movie?.original_title) {
          setEmbedLink(fallbackLink);
          return;
        }

        const year = movie.release_date?.substring(0, 4);
        const res = await GetMovieEmbedLink(movie.id, movie.original_title, year);

        setDublaj(res?.dublaj === 'Not Found' ? fallbackLink : res?.dublaj);
        setAltyazi(res?.altyazi === 'Not Found' ? fallbackLink : res?.altyazi);
        setMultiple(res?.multiple === 'Not Found' ? fallbackLink : res?.multiple);
        setEmbedLink(res?.dublaj === 'Not Found' ? fallbackLink : res?.dublaj);
      } catch (err) {
        console.error('Link fetch error', err);
        setEmbedLink(fallbackLink);
      } finally {
        setLoading(false);
      }
    };

    fetchEmbedLink();
  }, []);

  useEffect(() => {
    if (currentOption === 'TR Dublaj') setEmbedLink(dublaj || fallbackLink);
    else if (currentOption === 'TR Altyazi') setEmbedLink(altyazi || fallbackLink);
    else if (currentOption === 'Multiple') setEmbedLink(multiple || fallbackLink);
  }, [currentOption, dublaj, altyazi, multiple]);


  if (loading) {
    return (
      <View className="flex-1 justify-center items-center" style={{ backgroundColor: isDarkMode ? 'black' : 'white' }}>
        <ActivityIndicator size="large" color={isDarkMode ? 'white' : 'black'} />
        <Text className="mt-4 text-base text-center" style={{ color: isDarkMode ? 'white' : 'black' }}>
          {t("loading")}
        </Text>
      </View>
    );
  }

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1, backgroundColor: isDarkMode ? 'black' : 'white' }}
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      <View style={{ height: Dimensions.get('window').height * 0.3 }}>
        <WebView
          source={{ uri: embedLink }}
          allowsFullscreenVideo
          javaScriptEnabled
          domStorageEnabled
          style={{ flex: 1, backgroundColor: 'black' }}
        />
      </View>

      <View className="flex-row justify-between items-center px-4 py-3">
        <View>
          <Text style={{ color: isDarkMode ? 'white' : 'black' }} className="text-2xl font-bold">
            {movie.title}
          </Text>
          <Text className="text-gray-400 text-sm">{movie.release_date?.substring(0, 4)}</Text>
        </View>
        <View className="items-end">
          <Text className="text-yellow-400 font-semibold text-sm">IMDB</Text>
          <Text style={{ color: isDarkMode ? 'white' : 'black' }} className="text-base font-bold">
            {movie.vote_average}
          </Text>
        </View>
      </View>

      <View className="flex-row justify-start ms-4 space-x-3 py-2 gap-5">
        {['TR Dublaj', 'TR Altyazi', 'Multiple'].map((option) => {
          const isSelected = currentOption === option;
          const backgroundColor = isSelected ? '#3A3CB3' : 'transparent';
          const textColor = isDarkMode ? 'white' : isSelected ? 'white' : 'black';
          
          return (
            <TouchableOpacity
              key={option}
              onPress={() => setCurrentOption(option)}
              style={{
                backgroundColor,
                borderColor: '#3A3CB3',
                borderWidth: 1,
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 8,
              }}
            >
              <Text style={{ color: textColor, fontWeight: '600', fontSize: 14 }}>
                {option}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View className="flex-row items-center justify-start py-2 px-4 space-x-4">
        <LikeButton movieId={movie.id} initialLike={movie.likeCount} initialDislike={movie.dislikeCount} />
        <ViewCount movieId={movie.id} initialCount={viewCount} />
      </View>

      <Comments movieId={movie.id} />
    </KeyboardAwareScrollView>
  );
};

export default MoviePlayer;
