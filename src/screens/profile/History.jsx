import ContentList from '../../common/ContentList';
import { useMMKVBoolean } from 'react-native-mmkv';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
 
 
const History = () => {
   
    const [isDarkMode] = useMMKVBoolean("darkMode");
    const { t }= useTranslation()

 
    return (
        <View style={{paddingBottom:40,flex: 1, backgroundColor: isDarkMode ? '#252631' : '#ffffff'}} className='bg-[black]'>
            <ContentList searchTerm={t('history')} type="movie" />
        </View>
    );
}
 
export default History