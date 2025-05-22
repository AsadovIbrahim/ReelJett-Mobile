import { NavigationContainer } from '@react-navigation/native';
import { useMMKVString,useMMKVBoolean } from 'react-native-mmkv';
import AuthStack from './AuthStack';
import TabStack from './TabStack';

const Navigation = () => {
    const [accessToken, setAccessToken] = useMMKVString('accessToken')
    
    
    

    return (


        <NavigationContainer>
            <TabStack></TabStack>
            {/* {accessToken?<TabStack></TabStack>:<AuthStack></AuthStack>} */}
            {/* <AuthStack></AuthStack> */}
        </NavigationContainer>
    )

};
  
export default Navigation;

