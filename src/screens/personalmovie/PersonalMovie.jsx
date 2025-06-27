import { Text, View } from 'react-native';
import ContentList from '../../common/ContentList';
import { useMMKVBoolean } from 'react-native-mmkv';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Switch } from 'react-native';

const PersonalMovie=()=>{
    const [isDarkMode] = useMMKVBoolean("darkMode");
    const [isFavourite,setIsFavourite]=useState(false);
    const {t}=useTranslation();

    const toggleDarkMode = () => {
        setIsFavourite(!isFavourite);
    };

    return(
        <View contentContainerStyle={{ paddingBottom: 20 }} className="flex-1 bg-[#15121E]" style={{ flex: 1, backgroundColor: isDarkMode ? '#252631' : '#ffffff' }}>
            <View className='flex-row items-center justify-end mr-1 gap-4'>
                <Text style={{color:isDarkMode ? 'white' : 'black',fontWeight:700}}>{t("see only favourites")}</Text>
                <Switch value={!!isFavourite} onValueChange={toggleDarkMode} thumbColor={isDarkMode ? "#fff" : "#ccc"} trackColor={{ false: "#888", true: "#4f46e5" }}/>
            </View>
            <ContentList type={isFavourite?"videofav":"video"} showLoading={true} loadingType='basic'/>
        </View>
    )
}

export default PersonalMovie;