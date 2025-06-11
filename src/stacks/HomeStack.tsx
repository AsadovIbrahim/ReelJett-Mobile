import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Homepage from '../screens/homepage/Homepage';
import HomeHeader from './components/HomeHeader';
import Details from '../screens/details/Details';
import MoviePlayer from '../screens/movieplayer/MoviePlayer';

const Stack = createNativeStackNavigator()

const HomeStack = () => {
    return (
        <Stack.Navigator screenOptions={{header:()=><HomeHeader/>}}>
            <Stack.Screen name="HomeScreen" component={Homepage} />
            <Stack.Screen name="Details" component={Details} />
            <Stack.Screen name="MoviePlayer" component={MoviePlayer} />
        </Stack.Navigator>
    )
}

export default HomeStack