import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'


const ProfileHeader = ({pagename}) => {
  return (
    <View className='w-full flex-row justify-center items-center p-2 py-5 bg-[#252631]'>
      <Text style={{ fontSize: 30,fontWeight:700,marginTop:20 }} className='text-white'>{pagename}</Text>
    </View>
  )
}

export default ProfileHeader