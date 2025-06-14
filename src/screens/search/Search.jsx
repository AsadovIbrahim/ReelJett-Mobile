import { useState } from "react";
import {TextInput} from "react-native";
import Actors from "./components/Actors";
import {useMMKVBoolean } from 'react-native-mmkv';
import ContentList from "../../common/ContentList";
import { useTranslation } from "react-i18next";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const Search=()=>{

    const[searchQuery,setSearchQuery]=useState("");
    const [isDarkMode] = useMMKVBoolean("darkMode");
    const { t }=useTranslation();

    return(
        <KeyboardAwareScrollView style={{backgroundColor:isDarkMode?"black":"white"}} keyboardShouldPersistTaps="handled">
            <TextInput placeholderTextColor="#827F83"  placeholder={t("searchquery")} style={{borderColor: isDarkMode ? 'white' : 'black', borderBottomWidth:1,color:isDarkMode?"white":"black"}} className="mx-7 mt-8 rounded-[5px] px-3 py-4 text-lg" onChangeText={(text)=>{
                setSearchQuery(text);
            }}/>
            {
                searchQuery&&
                <>
                    <ContentList searchQuery={searchQuery} type="movie"/>
                    <Actors searchQuery={searchQuery}/>
                </>
            }
        </KeyboardAwareScrollView>

    )
}
export default Search;