import { Text, View, TextInput, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { RegisterFetch } from '../../utils/fetchs'
import Toast from 'react-native-toast-message'


const Register = () => {
  const navigation = useNavigation()
  const [formData, setFormData] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const { t } = useTranslation()

  const handleInputChange = (name, text) => {
      setFormData(prevState => ({
          ...prevState, [name]: text
      }))
  }
  const register = async () => {
    
    const data=await RegisterFetch(formData)
    if(data) {
      Toast.show({
        type: 'success',
        text1: 'Register Success',
        text2: 'Confirm your email to complete your registration',
        position: 'top',
        visibilityTime: 3000,
        topOffset: 50,
      })
      setTimeout(() => {
        navigation.navigate("Login")
      }, 2000)

    }
    else {
      Toast.show({
        type: 'error',
        text1: 'Register Failed',
        text2: data.message || 'Something went wrong',
        position: 'top',
        visibilityTime: 3000,
        topOffset: 50,
      })
    }
    
  }
   return (
    <KeyboardAwareScrollView keyboardShouldPersistTaps="handled" contentContainerClassName='flex-1 justify-center' className='bg-[#252631]'>
      <View className='p-6 gap-8 relative'>
        <TextInput onChangeText={text => handleInputChange("firstname", text)} placeholder={t("firstname-text")} placeholderTextColor="#BCBCBC" className='border h-[57px] bg-[transparent] pl-3 border-r-white rounded-[5px] text-[14px]' style={{ color: "white" }} />

        <TextInput onChangeText={text => handleInputChange("lastname", text)} placeholder={t("lastname-text")} placeholderTextColor="#BCBCBC" className='border h-[57px] bg-[transparent] pl-3 border-r-white rounded-[5px] text-[14px]' style={{ color: "white" }} />

        <TextInput onChangeText={text => handleInputChange("username", text)} placeholder={t("usernameInput")} placeholderTextColor="#BCBCBC" className='border h-[57px] bg-[transparent] pl-3 border-r-white rounded-[5px] text-[14px]' style={{ color: "white" }} />

        <TextInput onChangeText={text => handleInputChange("email", text)} placeholder={t("emailInput")} placeholderTextColor="#BCBCBC" className='border h-[57px] bg-[transparent] pl-3 border-r-white rounded-[5px] text-[14px]' style={{ color: "white" }} />

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

        <View className='relative'>
          <TextInput
            onChangeText={text => handleInputChange("confirmPassword", text)}
            placeholder={t("confirm-password-text")}
            placeholderTextColor="#BCBCBC"
            secureTextEntry={!showConfirmPassword}
            className='border h-[57px] bg-[transparent] pl-3 pr-12 border-r-white rounded-[5px] text-[14px]'
            style={{ color: "white" }}
          />
          <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} className='absolute right-4 top-[20px]'>
            <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} color='white' />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={register} className='bg-[#3A3CB3] h-[64] py-5 rounded-lg'>
          <Text className='text-white text-center font-bold text-xl'>{t("signup")}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { navigation.navigate("Login") }}>
          <Text className='text-gray-400 text-center mt-4'>{t("alreadyhas")}</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  )
}

export default Register