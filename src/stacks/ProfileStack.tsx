import { createNativeStackNavigator } from '@react-navigation/native-stack';
import History from '../screens/profile/History';
import MyVideos from '../screens/profile/MyVideos';
import ProfileMain from '../screens/profile/ProfileMain';
import Settings from '../screens/profile/Settings';
import Help from '../screens/profile/Help';
import EditProfile from '../screens/profile/EditProfile';
import ProfileHeader from './components/ProfileHeader';
import PersonalMoviePlayer from '../screens/personalmovieplayer/PersonalMoviePlayer';
import { storage } from '../utils/MMKVStore';
import { useTranslation } from 'react-i18next';

const Stack = createNativeStackNavigator()

const ProfileStack = () => {
    const {t} =useTranslation();
    
    return (
        <Stack.Navigator>
            <Stack.Screen options={{header: () => <ProfileHeader pagename={storage.getString('username')||"Profile Main"}/>}} name="ProfileMain" component={ProfileMain} />
            <Stack.Screen options={{header: () => <ProfileHeader pagename={t("history")}/>}} name="History" component={History} />
            <Stack.Screen options={{header: () => <ProfileHeader pagename={t("my videos")}/>}} name="MyVideos" component={MyVideos} />
            <Stack.Screen options={{header: () => <ProfileHeader pagename={t("edit profile")}/>}} name="EditProfile" component={EditProfile} />
            <Stack.Screen options={{header: () => <ProfileHeader pagename={t("settings")}/>}} name="Settings" component={Settings} />
            <Stack.Screen options={{header: () => <ProfileHeader pagename={t("help")}/>}} name="Help" component={Help} />
            <Stack.Screen options={{header: () => <ProfileHeader pagename={t("video player")}/>}} name="PersonalMoviePlayer" component={PersonalMoviePlayer} />
        </Stack.Navigator>
    )
}

export default ProfileStack