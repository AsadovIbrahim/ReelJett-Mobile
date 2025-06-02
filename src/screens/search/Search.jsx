import { useState } from "react";
import {TextInput,ScrollView } from "react-native";
import Actors from "./components/Actors";
import ContentList from "../../common/ContentList";
import { useTranslation } from "react-i18next";

const Search=()=>{

    const[searchQuery,setSearchQuery]=useState("");
    const { t }=useTranslation();

    return(
        <ScrollView contentContainerStyle={{backgroundColor:"black",flex:1}}>
            <TextInput placeholderTextColor="#827F83" placeholder={t("searchquery")} style={{borderBottomWidth:1,borderBottomColor:'white',color:'white'}} className=" mx-7 mt-8 rounded-[5px] px-3 py-4 text-white text-lg" onChangeText={(text)=>{
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