import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { useMMKVBoolean } from 'react-native-mmkv';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import LikeButton from '../../common/LikeButton';
import Comments from '../../common/Comments';
import { GetMovieEmbedLink, SetViewCount } from '../../utils/fetchs';

const fallbackLink = "https://streambucket.net/?play=...";

const MoviePlayer = () => {
  const route = useRoute();
  const { movie } = route.params;

  const [loading, setLoading] = useState(true);
  const [currentOption, setCurrentOption] = useState("TR Dublaj");
  const [embedLink, setEmbedLink] = useState(null);
  const [dublaj, setDublaj] = useState(null);
  const [altyazi, setAltyazi] = useState(null);
  const [multiple, setMultiple] = useState(null);

  const [isDarkMode] = useMMKVBoolean("darkMode");

  useEffect(() => {
    const fetchEmbedLink = async () => {
      try {
        if (!movie?.id || !movie?.original_title) {
          setEmbedLink(fallbackLink);
          return;
        }

        const year = movie.release_date?.substring(0, 4);
        const res = await GetMovieEmbedLink(movie.id, movie.original_title, year);

        const dub = res?.dublaj === "Not Found" ? fallbackLink : res?.dublaj;
        const alt = res?.altyazi === "Not Found" ? fallbackLink : res?.altyazi;
        const mul = res?.multiple === "Not Found" ? fallbackLink : res?.multiple;

        setDublaj(dub);
        setAltyazi(alt);
        setMultiple(mul);
        setEmbedLink(dub);
      } catch (err) {
        console.error("Link fetch error", err);
        setEmbedLink(fallbackLink);
      } finally {
        setLoading(false);
      }
    };

    fetchEmbedLink();
  }, []);

  useEffect(() => {
    if (currentOption === "TR Dublaj") setEmbedLink(dublaj || fallbackLink);
    else if (currentOption === "TR Altyazi") setEmbedLink(altyazi || fallbackLink);
    else if (currentOption === "Multiple") setEmbedLink(multiple || fallbackLink);
  }, [currentOption, dublaj, altyazi, multiple]);

  useEffect(() => {
    if (movie?.id) {
      SetViewCount(movie.id);
    }
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-cente" style={{backgroundColor:isDarkMode?"black":"white"}}>
        <ActivityIndicator size="large" color={isDarkMode ? "white" : "black"} />
        <Text className="text-white mt-4 text-base text-center" style={{color:isDarkMode?"white":"black"}}>Loading...</Text>
      </View>
    );
  }

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1, backgroundColor: isDarkMode ? "black" : "white" }}
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      {/* WebView (Video Player) */}
      <View style={{ height: Dimensions.get('window').height * 0.3 }}>
        <WebView
          source={{ uri: embedLink }}
          allowsFullscreenVideo
          javaScriptEnabled
          domStorageEnabled
          style={{ flex: 1, backgroundColor: "black" }}
        />
      </View>

      {/* Movie Info */}
      <View className="flex-row justify-between items-center px-4 py-3">
        <View>
          <Text style={{ color: isDarkMode ? "white" : "black" }} className="text-2xl font-bold">
            {movie.title}
          </Text>
          <Text className="text-gray-400 text-sm">{movie.release_date?.substring(0, 4)}</Text>
        </View>
        <View className="items-end">
          <Text className="text-yellow-400 font-semibold text-sm">IMDB</Text>
          <Text style={{ color: isDarkMode ? "white" : "black" }} className="text-base font-bold">
            {movie.vote_average}
          </Text>
        </View>
      </View>

      {/* Language Options */}
      <View className="flex-row justify-start ms-4 space-x-3 py-2 gap-5">
        {["TR Dublaj", "TR Altyazi", "Multiple"].map((option) => {
          const isSelected = currentOption === option;
          const backgroundColor = isSelected ? "#3A3CB3" : "transparent";
          const textColor = isDarkMode
            ? isSelected ? "white" : "white"
            : isSelected ? "white" : "black";

          return (
            <TouchableOpacity
              key={option}
              onPress={() => setCurrentOption(option)}
              style={{
                backgroundColor,
                borderColor: "#3A3CB3",
                borderWidth: 1,
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 8,
              }}
            >
              <Text style={{ color: textColor, fontWeight: "600", fontSize: 14 }}>
                {option}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View className="flex-row items-center justify-start px-4 py-2">
        <LikeButton movieId={movie.id} initialLike={movie.likeCount} initialDislike={movie.dislikeCount} />
        <View className="flex-row items-center space-x-1 gap-1 ml-4">
          <FontAwesomeIcon icon={faEye} size={20} color="gray" />
          <Text style={{ color: isDarkMode ? "white" : "black" }}>{movie.viewCount || 1}</Text>
        </View>
      </View>

      {/* Comments */}
      <Comments movieId={movie.id} />
    </KeyboardAwareScrollView>
  );
};

export default MoviePlayer;
