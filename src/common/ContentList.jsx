import ContentCard from './ContentCard';
import SkeletonCard from './SkeletonCard';
import { useState, useCallback } from 'react';
import Toast from 'react-native-toast-message'
import { useTranslation } from 'react-i18next';
import { Text, View, FlatList,ActivityIndicator} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useMMKVString, useMMKVBoolean } from "react-native-mmkv";
import PersonalContentCard from '../screens/personalmovie/components/PersonalContentCard';
import {GetFavouriteProfessionalMovies,GetNewReleaseMovies,GetSearchedMovies,GetUpcomingMovies,GetAllPersonalMovies,GetTopRatedMovies,GetMyMovies, GetFavouritePersonalMovies} from '../utils/fetchs';
  
const ContentList = ({ 
  searchTerm, 
  searchQuery, 
  type,
  myContent=false,
  ListHeaderComponent = null,
  showLoading = true,  
  loadingType = "skeleton"}) => {

    
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
          if (searchTerm === t("Upcoming")) {
            const data = await GetUpcomingMovies(selectedLanguage);
            setData(data.movies);
          } else if (searchTerm === t("New Release")) {
            const data = await GetNewReleaseMovies(page, moviesPerPage, selectedLanguage);
            setData(data.movies);
          } else if (searchTerm === t("Your Favourite")) {
            const data = await GetFavouriteProfessionalMovies();
            setData(data);
            setIsFavourite(true);
          } else if (searchTerm === t("Top Rated")) {
            const data = await GetTopRatedMovies(selectedLanguage);
            setData(data.movies);
          }
        }
      }
      else if(type==="video") {
        const data = myContent?await GetMyMovies():await GetAllPersonalMovies()
        setData(data);
      }
      else if(type==="videofav") {
        const data = await GetFavouritePersonalMovies()
        setData(data);
        console.log(data)
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

  return (
  <View className='mt-6'>
    {type === "movie" && (
      <Text
        className='font-manropeBold text-white font-extrabold text-3xl ml-8 mb-5'
        style={{ color: isDarkMode ? '#fff' : '#000' }}
      >
        {(searchTerm ? searchTerm : "Searched") + " " + t("movies")}
      </Text>
    )}

    {loading && showLoading ? (
  loadingType === "basic" ? (
    <View className="w-full h-[200px] justify-center items-center">
      <ActivityIndicator size="large" color={isDarkMode ? 'white' : 'black'} />
      <Text style={{ color: isDarkMode ? 'white' : 'black', marginTop: 12 }}>
        {t("loading")}...
      </Text>
    </View>
  ) : (
    <View className="w-full h-[200px] justify-center">
      <FlatList
        horizontal={type === "movie"}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 22, gap: 8 }}
        data={Array(8).fill(0)}
        keyExtractor={(item, index) => index.toString()}
        renderItem={() => (
          <SkeletonCard isDarkMode={isDarkMode} />
        )}
      />
    </View>
  ) 
) : (
  <FlatList
    horizontal={type === "movie"}
    showsHorizontalScrollIndicator={false}
    ListHeaderComponent={ListHeaderComponent}
    ListEmptyComponent={NoItems}
    contentContainerStyle={{ gap: 8, paddingHorizontal: 22 }}
    data={data}
    renderItem={({ item }) => (
      type === "movie"
        ? <ContentCard refreshParent={getData} isFavourite={isFavourite} item={item} type={type} />
        : <PersonalContentCard refreshParent={getData} item={item} myContent={myContent} type={type} />
    )}
  />
)}

  </View>
);

};

export default ContentList;