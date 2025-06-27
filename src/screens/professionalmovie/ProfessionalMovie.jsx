import { ScrollView } from 'react-native';
import ContentList from '../../common/ContentList';
import { useMMKVBoolean } from 'react-native-mmkv';
import { useTranslation } from 'react-i18next';


const ProfessionalMovie=()=>{
    const [isDarkMode] = useMMKVBoolean("darkMode");
    const { t } = useTranslation();

    return(
        <>
        <ScrollView contentContainerStyle={{ paddingBottom: 20 }} className="flex-1 bg-[#15121E]"
              style={{ flex: 1, backgroundColor: isDarkMode ? '#252631' : '#ffffff' }}
        >
            <ContentList searchTerm={t("New Release")} type="movie"/>
            <ContentList searchTerm={t("Top Rated")} type="movie"/>
            <ContentList searchTerm={t("Your Favourite")} type="movie"/>
        </ScrollView>
        </>
    )
}

export default ProfessionalMovie;