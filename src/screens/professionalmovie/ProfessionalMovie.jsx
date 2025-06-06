import { ScrollView } from 'react-native';
import ContentList from '../../common/ContentList';
import { useMMKVBoolean } from 'react-native-mmkv';


const ProfessionalMovie=()=>{
    const [isDarkMode] = useMMKVBoolean("darkMode");
    
    return(
        <>
        <ScrollView contentContainerStyle={{ paddingBottom: 20 }} className="flex-1 bg-[#15121E]"
              style={{ flex: 1, backgroundColor: isDarkMode ? '#252631' : '#ffffff' }}
        >
            <ContentList searchTerm="New Release" type="movie"/>
            <ContentList searchTerm="Top Rated" type="movie"/>
            <ContentList searchTerm="Your Favourite" type="movie"/>
        </ScrollView>
        </>
    )
}

export default ProfessionalMovie;