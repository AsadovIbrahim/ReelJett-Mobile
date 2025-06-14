import { useState, useCallback } from 'react';
import { Text, View, FlatList, ActivityIndicator } from 'react-native';
import ContentCard from './ContentCard';
import { useTranslation } from 'react-i18next';
import { useMMKVString, useMMKVBoolean } from "react-native-mmkv";
import {
  GetFavouriteProfessionalMovies,
  GetNewReleaseMovies,
  GetSearchedMovies,
  GetUpcomingMovies,
  GetTopRatedMovies
} from '../utils/fetchs';
import { useFocusEffect } from '@react-navigation/native';

const ContentList = ({ searchTerm, searchQuery, type }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFavourite, setIsFavourite] = useState(false);
  const { t } = useTranslation();
  const [selectedLanguage] = useMMKVString("selectedLanguage");
  const [isDarkMode] = useMMKVBoolean("darkMode");

  const getData = async () => {
    setLoading(true);
    try {
      const page = 1;
      const moviesPerPage = 20;

      if (searchQuery !== "" && searchTerm == null) {
        const data = await GetSearchedMovies(searchQuery, page, moviesPerPage, selectedLanguage);
        setData(data.movies);
      } else if (searchQuery == null) {
        if (searchTerm === "Upcoming") {
          const data = await GetUpcomingMovies(selectedLanguage);
          setData(data.movies);
        } else if (searchTerm === "New Release") {
          const data = await GetNewReleaseMovies(page, moviesPerPage, selectedLanguage);
          setData(data.movies);
        } else if (searchTerm === "Your Favourite") {
          const data = await GetFavouriteProfessionalMovies();
          setData(data);
          setIsFavourite(true);
        } else if (searchTerm === "Top Rated") {
          const data = await GetTopRatedMovies(selectedLanguage);
          setData(data.movies);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const NoItems = () => (
    <View className='w-full h-full items-center justify-center'>
      <Text style={{ color: isDarkMode ? '#fff' : '#000' }}>
        {t("noitemsfound")}
      </Text>
    </View>
  );

  useFocusEffect(
    useCallback(() => {
      getData();
    }, [searchTerm, searchQuery, type])
  );

  if (loading) {
    return (
      <View className="w-full h-[200px] justify-center items-center">
        <ActivityIndicator size="large" color={isDarkMode ? 'white' : 'black'} />
        <Text style={{ color: isDarkMode ? 'white' : 'black', marginTop: 12 }}>
          {t("loading")}...
        </Text>
      </View>
    );
  }

  return (
    <View className='mt-6'>
      <Text
        className='font-manropeBold text-white font-extrabold text-3xl ml-8 mb-5'
        style={{ color: isDarkMode ? '#fff' : '#000' }}
      >
        {(searchTerm ? searchTerm : "Searched") + ` ${type === "tv" ? t("tvshows") : t("movies")}`}
      </Text>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={NoItems}
        contentContainerStyle={{ gap: 8, paddingHorizontal: 22 }}
        data={data}
        renderItem={({ item }) => (
          <ContentCard refreshParent={getData} isFavourite={isFavourite} item={item} type={type} />
        )}
      />
    </View>
  );
};

export default ContentList;