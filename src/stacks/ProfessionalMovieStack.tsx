import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfessionalMovie from '../screens/professionalmovie/ProfessionalMovie';
import HomeHeader from './components/HomeHeader';

const Stack = createNativeStackNavigator()

const ProfessionalMovieStack = () => {
    return (
        <Stack.Navigator screenOptions={{header:()=><HomeHeader/>}}>
            <Stack.Screen name="ProfessionalMovieScreen" component={ProfessionalMovie} />
        </Stack.Navigator>
    )
}

export default ProfessionalMovieStack