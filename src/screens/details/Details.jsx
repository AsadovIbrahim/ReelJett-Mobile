import React from 'react';
import { useState,useEffect,useCallback } from 'react';
import { useRoute } from '@react-navigation/native';
import { Alert,Text,View, ScrollView, TouchableOpacity } from "react-native";
import { useMMKVString } from 'react-native-mmkv';
import YoutubePlayer from "react-native-youtube-iframe";
import Similar from './components/Similar';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faClock } from '@fortawesome/free-solid-svg-icons/faClock'
import { faPlay } from '@fortawesome/free-solid-svg-icons/faPlay'
import { GetMovieDetails } from '../../utils/fetchs';
import { GetTrailer } from '../../utils/fetchs';
import { AddToFavourites } from '../../utils/fetchs';


const Details = () => {
    const [viewMore,setViewMore]=useState(false);
    const [playing,setPlaying]=useState(false);
    const {token,setToken}=useMMKVString("accessToken");
    const [data,setData]=useState({});
    const [trailerKey,setTrailerKey]=useState("");
    const route=useRoute();
    const {id,type,item}=route.params
    const { t }=useTranslation()
    const [selectedLanguage, setSelectedLanguage] = useMMKVString("selectedLanguage");


    const onStateChange = useCallback((state) => {
        if (state === "ended") {
          setPlaying(false);
          Alert.alert("video has finished playing!");
        }
    }, []);
    
      

    const getDataById=async()=>{
      const data=await GetMovieDetails(id,item.title,selectedLanguage)
      setData(data);
    }

    const handleAddFavourites = async() => {
      const data=await AddToFavourites(id)
      if(data==200) Alert.alert(t("favourites-add-ok"))
      else if(data == 409) Alert.alert(t('favourites-add-fail'));
      else if(data==401) Alert.alert(t('must-be-logged-in-text'))  
    };
    
    const getTrailersById=async()=>{
      const data=await GetTrailer(id,selectedLanguage)
      setTrailerKey(data.split("/embed/")[1]);       
    }

    useEffect(() => {
        getDataById()
        getTrailersById()
      return () => {
      }
    }, [id,type])
    
  return (
    <ScrollView style={{paddingBottom:40}} className='bg-[black]'>
      <YoutubePlayer
        height={240}
        play={playing}
        videoId={trailerKey}
        onChangeState={onStateChange}
      />
      <View className='px-3'>
        <Text className='text-white text-3xl font-extrabold mb-2 mt-3'>{type==="tv"?data.name:item.title}</Text>
        <View className='flex-row gap-5'>
          <Text className='text-white mb-2 mt-3'>{data.categories}</Text>
          
          <View className='flex-row gap-2 items-center'>
            <FontAwesomeIcon icon={faClock} color='white' size={14}></FontAwesomeIcon>
            <Text className='text-white mb-2 mt-3'>{data.runtime} {t("min")}</Text>
          </View>
        
        </View>
        <TouchableOpacity className="rounded-[4px] my-3 flex-row justify-center bg-[#3A3CB3] py-4 items-center gap-2" /*onPress={togglePlaying}*/>
            <FontAwesomeIcon icon={faPlay} color='white' size={16}></FontAwesomeIcon>
            <Text className=' text-white font-extrabold text-lg'>{t("play")}</Text>
        </TouchableOpacity>
        <TouchableOpacity className="rounded-[4px] my-3 flex-row justify-center bg-[#2E2B2F] py-4 items-center gap-2" onPress={handleAddFavourites}>
            <Text className=' text-white font-extrabold text-lg'>{t("mylist")}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>{
            setViewMore(prevState=>!prevState)
        }}>
            <Text className='text-white text-lg'>{!viewMore?item.overview?.substring(0,150): item.overview}<Text className='font-bold text-zinc-500'>{!viewMore ?`...${t("more")}`:""}</Text></Text>
        </TouchableOpacity>
        <Similar id={id} type={type}/>
      </View>
    </ScrollView>
    )
}

export default Details

