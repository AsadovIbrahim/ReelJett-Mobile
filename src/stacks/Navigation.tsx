import { NavigationContainer } from '@react-navigation/native';
import { useMMKVString,useMMKVBoolean } from 'react-native-mmkv';
import AuthStack from './AuthStack';
import TabStack from './TabStack';

const Navigation = () => {
    const [accessToken, setAccessToken] = useMMKVString('accessToken')
    
    
    

    return (

        <NavigationContainer>
            {accessToken?<TabStack></TabStack>:<AuthStack></AuthStack>}
        </NavigationContainer>
    )

};
  
export default Navigation;

