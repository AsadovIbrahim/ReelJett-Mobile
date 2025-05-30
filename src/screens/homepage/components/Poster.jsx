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
import { useMMKVString } from "react-native-mmkv";


const Poster = () => {
  const [visibleShow,setVisibleShow]=useState({})
  const { t }=useTranslation()
  const navigation=useNavigation()
  const [selectedLanguage, setSelectedLanguage] = useMMKVString("selectedLanguage");
  

  const getShowData = async() =>{
    try {
      const response = await fetch(`http://10.0.2.2:5124/api/Movie/GetUpcomingMovies?language=${selectedLanguage}`)
      const data = await response.json()
      setVisibleShow(data.movies[0])
    } catch (error) {
      console.log(error)
    }
  }
  
  const handleAddFavourites = async() => {
    const response = await fetch(`http://10.0.2.2:5124/api/Favourite/AddToFavourites?movieId=${visibleShow.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
    });
    const data = await response.json()    
    if(data==200) Alert.alert(t("favourites-add-ok"))
    else if(data == 409) Alert.alert(t('favourites-add-fail'));
    else if(data==401) Alert.alert(t('must-be-logged-in-text'))  
  };



  useEffect(() => {
    getShowData()
  }, [])

  return (
    
    <View className="w-screen pt-4 px-[27px] relative mb-5 ">
      <FastImage style={{width:"auto",height:500,backgroundColor:"#15121E",borderRadius:8}} source={{
        uri:`https://image.tmdb.org/t/p/original${visibleShow.poster_path}`,
        priority:FastImage.priority.high
      }}
      resizeMode={FastImage.resizeMode.cover}
      >
      </FastImage>

      <View className="w-full absolute bottom-0 left-[27px] flex-row justify-between items-center p-[14px]">
        <TouchableOpacity className="bg-[#3A3CB3] w-[48%] py-[10px] rounded-[6px] items-center flex-row justify-center gap-1" onPress={()=>{navigation.navigate("Home",{screen:"Details",params:{id:visibleShow.id,type:'tv'}})}}>
          <FontAwesomeIcon icon={faPlay} color='white' size={16}></FontAwesomeIcon>
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