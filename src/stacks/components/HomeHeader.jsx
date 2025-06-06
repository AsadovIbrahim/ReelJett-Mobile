import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useMMKVString,useMMKVBoolean } from 'react-native-mmkv'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import ReelJettLogo from "../../../assets/icons/reeljettlogo.svg"
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch'

const HomeHeader = () => {

  const [username]=useMMKVString("username");
  const navigation=useNavigation();
  const { t }=useTranslation();
  const [isDarkMode] = useMMKVBoolean("darkMode");


  return (

    // <View className='w-full flex-row justify-between items-center p-2 py-2 bg-black'>
    //   <Text className='text-white font-extrabold text-3xl'>{t("welcome")} {username}</Text>

    //   <View className='flex-row items-center gap-4'>

      
    //   <TouchableOpacity onPress={()=>{
    //     navigation.navigate("Search",{screen:"Screen"})}}>
    //     <Search/>
    //   </TouchableOpacity>
    //   </View>
    // </View>
  
  
    <View style={{backgroundColor: isDarkMode ? '#252631' : '#ffffff',}} className='w-full flex-row justify-between items-center pt-7 p-5 bg-[#252631]'>
      <View className='items-center flex-row gap-4'>
        <ReelJettLogo/>
        <Text style={{color: isDarkMode ? '#fff' : '#000',}} className='text-white font-extrabold text-4xl'>ReelJett</Text>
      </View>
      

      <View className='flex-row items-center gap-4'>

      
      <TouchableOpacity onPress={()=>{
        navigation.navigate("Search",{screen:"Screen"})}}>
        <FontAwesomeIcon icon={faSearch} color={isDarkMode?"white":"black"} size={24}></FontAwesomeIcon>
      </TouchableOpacity>
      </View>
    </View>

  
  
  )
}

export default HomeHeader