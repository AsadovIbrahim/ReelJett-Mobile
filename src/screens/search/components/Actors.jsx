import { View, Text } from 'react-native'
import React from 'react'
import { useState,useEffect } from 'react'
import { useMMKVString } from 'react-native-mmkv'
import ActorItem from './ActorItem'
import { FlatList } from 'react-native'
import { useTranslation } from 'react-i18next'
import { GetSearchedPerson } from '../../../utils/fetchs'

const Actors = ({searchQuery}) => {
    const [actorData,setActorData]=useState([]);
    const { t }=useTranslation()
    const [selectedLanguage, setSelectedLanguage] = useMMKVString("selectedLanguage");
    
    const getActorData=async()=>{
        const page = 1;
        const personPerPage = 5;
        const data=await GetSearchedPerson(searchQuery,page,personPerPage,selectedLanguage)
        setActorData(data.people);
    }

    const NoItems = () => <View className='w-full h-full items-center justify-center'>
    <Text>{t("noitemsfound")}</Text>
    </View>


    useEffect(() => {
      searchQuery&& getActorData()
    }, [searchQuery])
    

    return (
        <View className='mt-6 ms-4'>
        
              <Text className='font-manropeBold text-white text-2xl ml-4 mb-4'>{t("actors")}</Text>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                ListEmptyComponent={NoItems}
                contentContainerStyle={{ gap: 8,paddingHorizontal:8}}
                data={actorData}
                renderItem={({ item }) => <ActorItem item={item}/>} />
            </View>
    )
}

export default Actors