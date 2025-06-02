import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/auth/Login';
import Register from '../screens/auth/Register';
import { useMMKVBoolean } from 'react-native-mmkv';
import { useEffect } from 'react';
import Onboarding from '../screens/onboarding/Onboarding';
import AuthHeader from './components/AuthHeader';
import ForgotPassword from '../screens/auth/ForgotPassword';
const Stack = createNativeStackNavigator()

const AuthStack = () => {

    const [firstTimeUser, setFirstTimeUser] = useMMKVBoolean("firstTimeUser")
    useEffect(() => {
        setFirstTimeUser(true);
    }, [1])


    return (
        <Stack.Navigator screenOptions={{header:()=><AuthHeader/>}}>
            {firstTimeUser&&<Stack.Screen name='Onboarding' component={Onboarding}></Stack.Screen>}
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword}/>
        </Stack.Navigator>
    )
}

export default AuthStack