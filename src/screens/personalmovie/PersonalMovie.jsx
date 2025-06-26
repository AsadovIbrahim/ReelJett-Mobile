import { View } from 'react-native';
import ContentList from '../../common/ContentList';
import { useMMKVBoolean } from 'react-native-mmkv';

const PersonalMovie=()=>{
    const [isDarkMode] = useMMKVBoolean("darkMode");

    return(
        <View contentContainerStyle={{ paddingBottom: 20 }} className="flex-1 bg-[#15121E]"
              style={{ flex: 1, backgroundColor: isDarkMode ? '#252631' : '#ffffff' }}
        >
            <ContentList type="video" showLoading={true} loadingType='basic'/>
        </View>
    )
}

export default PersonalMovie;