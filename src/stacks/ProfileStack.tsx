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


const Stack = createNativeStackNavigator()

const ProfileStack = () => {

    return (
        <Stack.Navigator>
            <Stack.Screen options={{header: () => <ProfileHeader pagename={storage.getString('username')||"Profile Main"}/>}} name="ProfileMain" component={ProfileMain} />
            <Stack.Screen options={{header: () => <ProfileHeader pagename="History"/>}} name="History" component={History} />
            <Stack.Screen options={{header: () => <ProfileHeader pagename="My Videos"/>}} name="MyVideos" component={MyVideos} />
            <Stack.Screen options={{header: () => <ProfileHeader pagename="Edit Profile"/>}} name="EditProfile" component={EditProfile} />
            <Stack.Screen options={{header: () => <ProfileHeader pagename="Settings"/>}} name="Settings" component={Settings} />
            <Stack.Screen options={{header: () => <ProfileHeader pagename="Help"/>}} name="Help" component={Help} />
            <Stack.Screen options={{header: () => <ProfileHeader pagename="Video Player"/>}} name="PersonalMoviePlayer" component={PersonalMoviePlayer} />
        </Stack.Navigator>
    )
}

export default ProfileStack