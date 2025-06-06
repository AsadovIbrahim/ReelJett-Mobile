import { View, Text } from 'react-native'
import React from 'react'
import ReelJettLogo from "../../../assets/icons/reeljettlogo.svg"
import { useMMKVBoolean } from 'react-native-mmkv';

const AuthHeader = () => {
  const [isDarkMode] = useMMKVBoolean("darkMode");

  return (
    <View style={{backgroundColor:isDarkMode?"#252631":"#ffffff"}} className='w-full items-center justify-center flex-row gap-4 pt-9 p-5'>
      <ReelJettLogo/>
      <Text style={{ fontSize: 36,fontWeight:700 }} className={isDarkMode?"text-white":"text-black"}>ReelJett</Text>
    </View>
  )
}

export default AuthHeader