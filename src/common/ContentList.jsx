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
  GetAllPersonalMovies,
  GetTopRatedMovies,
  GetMyMovies
} from '../utils/fetchs';
import { useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-toast-message'
import PersonalContentCard from '../screens/personalmovie/components/PersonalContentCard';

  
const ContentList = ({ searchTerm, searchQuery, type,myContent=false,ListHeaderComponent = null }) => {
  const [data, setData] = useState([]);
  const [isFavourite, setIsFavourite] = useState(false);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  const [selectedLanguage] = useMMKVString("selectedLanguage");
  const [isDarkMode] = useMMKVBoolean("darkMode");

  const getData = async () => {
    setLoading(true);
    try {
      if(type==="movie") {
        const page = 1;
        const moviesPerPage = 20;
        if (searchQuery !== "" && searchTerm == null) {
          const data = await GetSearchedMovies(searchQuery, page, moviesPerPage, selectedLanguage);
          setData(data.movies);
        } 
        else if (searchQuery == null) {
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
      }
      else if(type==="video") {
        const data = myContent?await GetMyMovies():await GetAllPersonalMovies()
        setData(data);
      }
      
    } catch (error) {
        Toast.show({
            type: 'error',
            text1: 'Error',
            text2: error,
            position: 'top',
            visibilityTime: 3000,
            topOffset: 50,
        })
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
        {
        
        type=="movie"?
        (searchTerm ? searchTerm : "Searched") +" "+ t("movies")
        :
        ""
        
        }
      </Text>

      <FlatList
        horizontal={type === "movie"}
        showsHorizontalScrollIndicator={false}
        ListHeaderComponent={ListHeaderComponent}
        ListEmptyComponent={NoItems}
        contentContainerStyle={{ gap: 8, paddingHorizontal: 22 }}
        data={data}
        renderItem={({ item }) => (
        (
          type==="movie" ? <ContentCard refreshParent={getData} isFavourite={isFavourite} item={item} type={type} />:<PersonalContentCard item={item}></PersonalContentCard>
        )
        )}
      />
    </View>
  );
};

export default ContentList;