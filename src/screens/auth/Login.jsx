import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { storage } from '../../utils/MMKVStore'
import { useNavigation } from '@react-navigation/native'
import { Text, View, TextInput, TouchableOpacity, Alert } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { LoginFetch } from '../../utils/fetchs'
import ForgotPassword from './ForgotPassword'

const Login = () => {
  const navigation = useNavigation()
  const [formData, setFormData] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const { t }=useTranslation();

  const handleInputChange = (name, text) => {
    setFormData(prevState => ({
      ...prevState, [name]: text
    }))
  }

  const login = async () => {

    const data=await LoginFetch(formData);
    if(data) {
      storage.set("accessToken", data.accessToken.token)
      storage.set("username",formData.username)
    }
    
  }

  return (
    <KeyboardAwareScrollView keyboardShouldPersistTaps="handled" contentContainerClassName='flex-1' className='bg-[#252631] pt-[200px]'>
      <View className='p-6 gap-8 relative'>
        <TextInput onChangeText={text=>{
          handleInputChange("username",text)
        }} placeholder={t("usernameInput")} placeholderTextColor="#BCBCBC" className='border h-[57px] bg-[transparent] pl-3 border-r-white rounded-[5px] text-[14px]' style={{color:"white"}}>
        </TextInput>

        <View className='relative'>
          <TextInput
            onChangeText={text => handleInputChange("password", text)}
            placeholder={t("passwordInput")}
            placeholderTextColor="#BCBCBC"
            secureTextEntry={!showPassword}
            className='border h-[57px] bg-[transparent] pl-3 pr-12 border-r-white rounded-[5px] text-[14px]'
            style={{ color: "white" }}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} className='absolute right-4 top-[20px]'>
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} color='white' />
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity onPress={()=>{navigation.navigate("ForgotPassword")}}>
            <Text className='text-right color-[#BCBCBC]'>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity onPress={login} className='bg-[#3A3CB3] h-[64] py-5 rounded-lg'><Text className='text-white text-center font-bold text-xl'>{t("signin")}</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => {navigation.navigate("Register")}}><Text className='text-gray-400 text-center'>{t("donthaveaccount")}</Text></TouchableOpacity>

      </View>

    </KeyboardAwareScrollView>
  )
}

export default Login