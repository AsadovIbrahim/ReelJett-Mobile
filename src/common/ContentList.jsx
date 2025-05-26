import { useState, useEffect } from 'react'
import { Text, View, FlatList, Alert } from 'react-native'
import ContentCard from './ContentCard'
import { useTranslation } from 'react-i18next'
import { useMMKVString } from "react-native-mmkv";

const ContentList = ({searchTerm,searchQuery,type}) => {

  const [data, setData] = useState([])
  const { t } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useMMKVString("selectedLanguage");

  const getData = async () => {
    
    try {
      
      const page = 1;
      const moviesPerPage = 20;
      //const response = await fetch(searchTerm ? `http://192.168.100.8:5001/api/v1/search/${type}/${searchTerm}`:`http://192.168.100.8:5001/api/v1/${type}/trending`)
      
      if(searchQuery!=="" && searchTerm==null) {
        const response=await fetch(`http://10.0.2.2:5124/api/Movie/GetSearchedMovie?query=${searchQuery}&page=${page}&moviesPerPage=${moviesPerPage}&language=${selectedLanguage}`)
        const data = await response.json()
        setData(data.movies);
      }
      else if(searchQuery==null) {
        let response;
        if(searchTerm==="Upcoming"){
          response = await fetch(`http://10.0.2.2:5124/api/Movie/GetUpcomingMovies?language=${selectedLanguage}`)
          const data = await response.json()
          setData(data.movies);
        }
        else if(searchTerm==="New Release"){
          response=await fetch(`http://10.0.2.2:5124/api/Movie/GetNewReleaseMovies?page=${page}&moviesPerPage=${moviesPerPage}&language=${selectedLanguage}`)
          const data = await response.json()
          setData(data.movies);
        }
        else if(searchTerm==="Favourite"){
          response=await fetch("http://10.0.2.2:5124/api/Favourite/GetFavouriteProfessionalMovies");
          // id stringler return olunur for-un icine salib her birini getById ile fetch elemek lazimdi

        }
        
      }
      
      

    } catch (error) {
      console.log(error)
    }
  }

  const NoItems = () => <View className='w-full h-full items-center justify-center'>
    <Text>{t("noitemsfound")}</Text>
  </View>

  useEffect(() => {
    getData()
  }, [searchTerm,searchQuery,type])


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
        renderItem={({ item }) => <ContentCard item={item} type={type} />} />
    
    </View>
    </>

  )
}

export default ContentList  