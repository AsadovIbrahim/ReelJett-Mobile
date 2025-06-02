import { View, Text } from 'react-native'
import React from 'react'
import ReelJettLogo from "../../../assets/icons/reeljettlogo.svg"

const AuthHeader = () => {

  return (
    <View className='w-full items-center justify-center flex-row gap-4 pt-9 p-5 bg-[#252631]'>
      <ReelJettLogo/>
      <Text style={{ fontSize: 36,fontWeight:700 }} className='text-white'>ReelJett</Text>
    </View>
  )
}

export default AuthHeader