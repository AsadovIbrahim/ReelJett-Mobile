import { useState } from "react"
import { Alert, Dimensions, TouchableOpacity } from "react-native"
import { useEffect } from "react"
import { View } from "react-native"
import FastImage from "react-native-fast-image"
import { Text } from "react-native"
import { useTranslation } from "react-i18next"
import { useNavigation } from "@react-navigation/native"
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons/faPlay'
import { useMMKVBoolean, useMMKVString } from "react-native-mmkv";
import { AddToFavourites, GetUpcomingMovies } from "../../../utils/fetchs"
import Toast from "react-native-toast-message"
import { GetMovieDetails } from "../../../utils/fetchs"
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from "react"


const Poster = () => {
  const [visibleShow,setVisibleShow]=useState({})
  const { t }=useTranslation()
  const navigation=useNavigation()
  const [selectedLanguage, setSelectedLanguage] = useMMKVString("selectedLanguage");
  const [isDarkMode] = useMMKVBoolean("darkMode");

  const getShowData = async() =>{
    const data=await GetUpcomingMovies(selectedLanguage)
    setVisibleShow(data.movies[0])
  }
  
  const handleAddFavourites = async() => {
        const data=await AddToFavourites(visibleShow.id)
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


  useFocusEffect(
    useCallback(() => {
      getShowData();
    }, [])
  )

  return (
    
    <View className="w-screen pt-4 px-[27px] relative mb-5 ">
      <FastImage style={{width:"auto",height:500,backgroundColor:isDarkMode?"#15121E":"gray",borderRadius:8}} source={{
        uri:`https://image.tmdb.org/t/p/original${visibleShow.poster_path}`,
        priority:FastImage.priority.high
      }}
      resizeMode={FastImage.resizeMode.cover}
      >
      </FastImage>

      <View className="w-full absolute bottom-0 left-[27px] flex-row justify-between items-center p-[14px]">
        <TouchableOpacity
          className="bg-[#3A3CB3] w-[48%] py-[10px] rounded-[6px] items-center flex-row justify-center gap-1"
          onPress={async () => {
            const details=await GetMovieDetails(visibleShow.id,visibleShow.title,selectedLanguage)
            const movieToSend = {
              id:visibleShow.id,
              title:visibleShow.title,
              original_title:visibleShow.original_title,
              release_date:visibleShow.release_date || "2025",
              vote_average: visibleShow.vote_average,
              likeCount:details.likeCount,
              dislikeCount:details.dislikeCount
            };  
            navigation.navigate("MoviePlayer", { movie: movieToSend })
          }}
        >
          <FontAwesomeIcon icon={faPlay} color="white" size={16} />
          <Text className="text-[white] text-xl font-extrabold">{t("play")}</Text>
        </TouchableOpacity>

        <TouchableOpacity className="bg-[#2E2B2F] w-[48%] py-[10px] rounded-[6px]" onPress={handleAddFavourites}>
          <Text className="text-white text-xl font-extrabold text-center">{t("mylist")}</Text>
        </TouchableOpacity>
      </View>

    </View>


  )

}
  
export default Poster