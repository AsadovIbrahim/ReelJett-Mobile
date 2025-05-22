import { View, Text } from 'react-native'
import React from 'react'


const AuthHeader = () => {

  return (
    <View className='w-full flex-row justify-center items-center p-2 py-5 bg-[#252631]'>
      <Text style={{ fontSize: 36,fontWeight:700 }} className='text-white'>ReelJett</Text>
    </View>
  )
}

export default AuthHeader