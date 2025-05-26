import { Text, TouchableOpacity, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBookmark } from '@fortawesome/free-solid-svg-icons/faBookmark'
import { faHistory } from '@fortawesome/free-solid-svg-icons/faHistory'
import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit'
import { faGear } from '@fortawesome/free-solid-svg-icons/faGear'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons/faCircleInfo'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons/faAngleRight'
import { faPhotoFilm } from '@fortawesome/free-solid-svg-icons/faPhotoFilm'


const ProfileMain = ( {navigation} ) => {
    return (
      <View className='bg-[#252631] h-[100%]'>
        <TouchableOpacity className='flex-row p-5 mt-24 items-center justify-between' onPress={() => navigation.navigate('Watchlist')}>
          <View className='flex-row gap-5 items-center'>
            <FontAwesomeIcon icon={faBookmark}  color='white' size={20}/>
            <Text className='text-2xl text-white font-light'>Watchlist</Text>
          </View>
          <FontAwesomeIcon icon={faAngleRight} color='#cccccc' size={20}/>

        </TouchableOpacity>

        <TouchableOpacity className='flex-row p-5 items-center justify-between' onPress={() => navigation.navigate('History')}>
          <View className='flex-row gap-5 items-center'>
            <FontAwesomeIcon icon={faHistory} color='white' size={20}/>
            <Text className='text-2xl text-white font-light'>History</Text>
          </View>
          <FontAwesomeIcon icon={faAngleRight} color='#cccccc' size={20}/>
          
        </TouchableOpacity>

        <TouchableOpacity className='flex-row p-5 items-center justify-between' onPress={() => navigation.navigate('MyVideos')}>
          <View className='flex-row gap-5 items-center'>
            <FontAwesomeIcon icon={faPhotoFilm} color='white' size={20}/>
            <Text className='text-2xl text-white font-light'>My Videos</Text>
          </View>
          <FontAwesomeIcon icon={faAngleRight} color='#cccccc' size={20}/>

        </TouchableOpacity>

        <TouchableOpacity className='flex-row p-5 items-center justify-between' onPress={() => navigation.navigate('EditProfile')}>
          <View className='flex-row gap-5 items-center'>
            <FontAwesomeIcon icon={faEdit} color='white' size={20}/>
            <Text className='text-2xl text-white font-light'>Edit Profile</Text>
          </View>
          <FontAwesomeIcon icon={faAngleRight} color='#cccccc' size={20}/>

        </TouchableOpacity>

        <TouchableOpacity className='flex-row p-5 items-center justify-between' onPress={() => navigation.navigate('Settings')}>
          <View className='flex-row gap-5 items-center'>
            <FontAwesomeIcon icon={faGear} color='white' size={20}/>
            <Text className='text-2xl text-white font-light'>Settings</Text>
          </View>
          <FontAwesomeIcon icon={faAngleRight} color='#cccccc' size={20}/>

        </TouchableOpacity>

        <TouchableOpacity className='flex-row p-5 items-center justify-between' onPress={() => navigation.navigate('Help')}>
          <View className='flex-row gap-5 items-center'>
            <FontAwesomeIcon icon={faCircleInfo} color='white' size={20}/>
            <Text className='text-2xl text-white font-light'>Help</Text>
          </View>
          <FontAwesomeIcon icon={faAngleRight} color='#cccccc' size={20}/>
        </TouchableOpacity>

      </View>
  );
};

export default ProfileMain;