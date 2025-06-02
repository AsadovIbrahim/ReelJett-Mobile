import { useState,useCallback } from 'react'
import { Text, View, FlatList, Alert } from 'react-native'
import ContentCard from './ContentCard'
import { useTranslation } from 'react-i18next'
import { useMMKVString } from "react-native-mmkv";
import { GetFavouriteProfessionalMovies, GetNewReleaseMovies, GetSearchedMovies, GetUpcomingMovies , GetTopRatedMovies} from '../utils/fetchs';
import { useFocusEffect } from '@react-navigation/native';

const ContentList = ({searchTerm,searchQuery,type}) => {

  const [data, setData] = useState([])
  const [isFavourite, setIsFavourite] = useState(false)
  const { t } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useMMKVString("selectedLanguage");

  const getData = async () => {
    
    try {
      
      const page = 1;
      const moviesPerPage = 20;
      //const response = await fetch(searchTerm ? `http://192.168.100.8:5001/api/v1/search/${type}/${searchTerm}`:`http://192.168.100.8:5001/api/v1/${type}/trending`)
      
      if(searchQuery!=="" && searchTerm==null) {
        const data=await GetSearchedMovies(searchQuery,page,moviesPerPage,selectedLanguage)
        setData(data.movies);
      }
      else if(searchQuery==null) {

        if(searchTerm==="Upcoming") {
          const data=await GetUpcomingMovies(selectedLanguage)
          setData(data.movies);
        }
        else if(searchTerm==="New Release") {
          const data=await GetNewReleaseMovies(page,moviesPerPage,selectedLanguage)
          setData(data.movies);
        }
        else if(searchTerm==="Your Favourite") {
          const data=await GetFavouriteProfessionalMovies()
          setData(data)
          setIsFavourite(true)
          // id stringler return olunur for-un icine salib her birini getById ile fetch elemek lazimdi
        }
        else if(searchTerm==="Top Rated") {
          const data=await GetTopRatedMovies(selectedLanguage)
          setData(data.movies);
        }
        
      }
      
    } catch (error) {
      console.log(error)
    }
  }

  const NoItems = () => <View className='w-full h-full items-center justify-center'>
    <Text>{t("noitemsfound")}</Text>
  </View>

  useFocusEffect(
    useCallback(() => {
      getData();
  }, [searchTerm, searchQuery, type])
);


  return (
    <>
    <View className='mt-6'>

      <Text className='font-manropeBold text-white font-extrabold text-3xl ml-8 mb-5'>
        {(searchTerm?searchTerm:"Searched") +` ${type==="tv"?t("tvshows"):t("movies")}`}</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={NoItems}
        contentContainerStyle={{ gap: 8,paddingHorizontal:22}}
        data={data}
        renderItem={({ item }) => <ContentCard isFavourite={isFavourite} item={item} type={type} />} />
    
    </View>
    </>

  )
}

export default ContentList  