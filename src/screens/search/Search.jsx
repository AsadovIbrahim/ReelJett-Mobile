import { useState } from "react";
import {TextInput,ScrollView } from "react-native";
import Actors from "./components/Actors";
import {useMMKVBoolean } from 'react-native-mmkv';
import ContentList from "../../common/ContentList";
import { useTranslation } from "react-i18next";

const Search=()=>{

    const[searchQuery,setSearchQuery]=useState("");
    const [isDarkMode] = useMMKVBoolean("darkMode");
    const { t }=useTranslation();

    return(
        <ScrollView style={{ flex: 1, backgroundColor: isDarkMode ? '#000' : '#ffffff' }}>
            <TextInput placeholderTextColor="#827F83" placeholder={t("searchquery")} style={{borderColor: isDarkMode ? 'white' : 'black', borderBottomWidth:1,borderBottomColor:'white',color:'white'}} className=" mx-7 mt-8 rounded-[5px] px-3 py-4 text-white text-lg" onChangeText={(text)=>{
                setSearchQuery(text);
            }}/>
            {
                searchQuery&&
                <>
                    <ContentList searchQuery={searchQuery} type="movie"/>
                    <Actors searchQuery={searchQuery}/>
                </>
            }
        </ScrollView>

    )
}
export default Search;