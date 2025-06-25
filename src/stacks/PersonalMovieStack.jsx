import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeHeader from './components/HomeHeader';
import PersonalMovie from '../screens/personalmovie/PersonalMovie';
import PersonalMoviePlayer from '../screens/personalmovieplayer/PersonalMoviePlayer';
import MyVideos from '../screens/profile/MyVideos';

const Stack = createNativeStackNavigator()

const PersonalMovieStack = () => {
    return (
        <Stack.Navigator screenOptions={{header:()=><HomeHeader/>}}>
            <Stack.Screen name="PersonalMovieScreen" component={PersonalMovie} />
            <Stack.Screen name="PersonalMoviePlayer" component={PersonalMoviePlayer} />
        </Stack.Navigator>
    )
}

export default PersonalMovieStack