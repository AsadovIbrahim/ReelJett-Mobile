import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import { useRoute } from '@react-navigation/native';
import { GetMovieEmbedLink } from '../../utils/fetchs';
import { useMMKVBoolean } from 'react-native-mmkv';


const fallbackLink ="https://streambucket.net/?play=SW1HV1NUZUcxTWdkNDd2QVRGb0tTaXFTVStiSXNRdkNNcXVqOWtRdGljYU5nQ1JNd21GbWdVeTN5anE2RG1rN2RMSVcvT09YSVo1V0pHbzZjNlhLN2F4MDNZaWhzN2hDUDhRV1dtMFRoUnl4d0YyNFJWQVRlOTAvLzBEay9ZODZwOFdFQnJYUTYvUWRGVjJNQ0ZqbndURzY5QT09";

const MoviePlayer = () => {
  const route = useRoute();
  const { movie } = route.params;

  const [loading, setLoading] = useState(true);
  const [currentOption, setCurrentOption] = useState("TR Dublaj");
  const [dublaj, setDublaj] = useState(null);
  const [altyazi, setAltyazi] = useState(null);
  const [multiple, setMultiple] = useState(null);
  const [isDarkMode] = useMMKVBoolean("darkMode");

  const [embedLink, setEmbedLink] = useState(null);

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

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-black">
        <ActivityIndicator size="large" color="white" />
        <Text className="text-white mt-4 text-base">Loading...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-black" style={{backgroundColor:isDarkMode?"black":"white"}}>

        <WebView 
          style={{width:'100%', backgroundColor:"black" }}
          source={{ uri: embedLink }}
          allowsFullscreenVideo
          javaScriptEnabled
          domStorageEnabled
          className="flex-1"
        />
      <View className="flex-row justify-between items-center px-4 py-3">
        <View>
          <Text style={{color:isDarkMode?"white":"black"}} className="text-white text-3xl font-bold">{movie.original_title}</Text>
          <Text className="text-gray-400 text-2sm">{movie.release_date?.substring(0, 4)}</Text>
        </View>
        <View className="items-end">
          <Text className="text-yellow-400 font-semibold text-sm">IMDB</Text>
          <Text style={{color:isDarkMode?"white":"black"}} className="text-white text-base font-bold">{movie.vote_average}</Text>
        </View>
      </View>
     <View className="flex-row justify-center space-x-3 py-2 gap-5">
      {["TR Dublaj", "TR Altyazi", "Multiple"].map((option) => {
        const isSelected = currentOption === option;
        const backgroundColor = isSelected ? "#3A3CB3" : "transparent";
        const textColor = isDarkMode
          ? isSelected ? "white" : "white"
          : isSelected ? "white" : "black";
        const borderColor = "#3A3CB3";

        return (
          <TouchableOpacity
            key={option}
            onPress={() => setCurrentOption(option)}
            style={{
              backgroundColor,
              borderColor,
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


    </View>
  );
};

export default MoviePlayer;
