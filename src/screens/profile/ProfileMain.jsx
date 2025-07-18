import { Text, TouchableOpacity, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHistory } from '@fortawesome/free-solid-svg-icons/faHistory'
import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit'
import { faGear } from '@fortawesome/free-solid-svg-icons/faGear'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons/faCircleInfo'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons/faAngleRight'
import { faPhotoFilm } from '@fortawesome/free-solid-svg-icons/faPhotoFilm'
import { useMMKVBoolean } from 'react-native-mmkv';
import { useTranslation } from 'react-i18next';

const ProfileMain = ( {navigation} ) => {
  const [isDarkMode] = useMMKVBoolean("darkMode");
  const {t} = useTranslation();

    return (
      <View className='bg-[#252631] h-[100%]' style={{ backgroundColor: isDarkMode ? '#252631' : '#ffffff' }}>
        

        <TouchableOpacity className='flex-row  mt-24 p-5 items-center justify-between' onPress={() => navigation.navigate('History')}>
          <View className='flex-row gap-5 items-center'>
            <FontAwesomeIcon icon={faHistory} color={isDarkMode?"white":"black"} size={20}/>
            <Text style={{color:isDarkMode ? '#fff' : '#000'}} className='text-2xl text-white font-light'>{t("history")}</Text>
          </View>
          <FontAwesomeIcon icon={faAngleRight} color={isDarkMode?"white":"black"} size={20}/>
          
        </TouchableOpacity>

        <TouchableOpacity className='flex-row p-5 items-center justify-between' onPress={() => navigation.navigate('MyVideos')}>
          <View className='flex-row gap-5 items-center'>
            <FontAwesomeIcon icon={faPhotoFilm} color={isDarkMode?"white":"black"} size={20}/>
            <Text style={{color:isDarkMode ? '#fff' : '#000'}} className='text-2xl text-white font-light'>{t("my videos")}</Text>
          </View>
          <FontAwesomeIcon icon={faAngleRight} color={isDarkMode?"white":"black"} size={20}/>

        </TouchableOpacity>

        <TouchableOpacity className='flex-row p-5 items-center justify-between' onPress={() => navigation.navigate('EditProfile')}>
          <View className='flex-row gap-5 items-center'>
            <FontAwesomeIcon icon={faEdit} color={isDarkMode?"white":"black"} size={20}/>
            <Text style={{color:isDarkMode ? '#fff' : '#000'}} className='text-2xl text-white font-light'>{t("edit profile")}</Text>
          </View>
          <FontAwesomeIcon icon={faAngleRight} color={isDarkMode?"white":"black"} size={20}/>

        </TouchableOpacity>

        <TouchableOpacity className='flex-row p-5 items-center justify-between' onPress={() => navigation.navigate('Settings')}>
          <View className='flex-row gap-5 items-center'>
            <FontAwesomeIcon icon={faGear} color={isDarkMode?"white":"black"} size={20}/>
            <Text style={{color:isDarkMode ? '#fff' : '#000'}} className='text-2xl text-white font-light'>{t("settings")}</Text>
          </View>
          <FontAwesomeIcon icon={faAngleRight} color={isDarkMode?"white":"black"} size={20}/>

        </TouchableOpacity>

        <TouchableOpacity className='flex-row p-5 items-center justify-between' onPress={() => navigation.navigate('Help')}>
          <View className='flex-row gap-5 items-center'>
            <FontAwesomeIcon icon={faCircleInfo} color={isDarkMode?"white":"black"} size={20}/>
            <Text style={{color:isDarkMode ? '#fff' : '#000'}} className='text-2xl text-white font-light'>{t("help")}</Text>
          </View>
          <FontAwesomeIcon icon={faAngleRight} color={isDarkMode?"white":"black"} size={20}/>
        </TouchableOpacity>

      </View>
  );
};

export default ProfileMain;