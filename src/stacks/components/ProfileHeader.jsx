import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useMMKVBoolean } from 'react-native-mmkv';


const ProfileHeader = ({pagename}) => {
  const [isDarkMode] = useMMKVBoolean("darkMode");
  
  return (
    <View style={{ backgroundColor: isDarkMode ? '#252631' : '#ffffff' }} className='w-full flex-row justify-center items-center p-2 py-5 bg-[#252631]'>
      <Text style={{ fontSize: 30,fontWeight:700,marginTop:20,color:isDarkMode?"#ffffff":"#000000" }} className={isDarkMode?'white':'black'}>{pagename}</Text>
    </View>
  )
}

export default ProfileHeader