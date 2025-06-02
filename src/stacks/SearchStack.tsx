import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Search from '../screens/search/Search';
import HomeHeader from './components/HomeHeader';

const Stack = createNativeStackNavigator()

const SearchStack = () => {
    return (
        <Stack.Navigator screenOptions={{header:()=><HomeHeader/>}}>
            <Stack.Screen name="SearchScreen" component={Search} />
        </Stack.Navigator>
    )
}

export default SearchStack