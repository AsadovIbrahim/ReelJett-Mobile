import { Text, View, TextInput, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { RegisterFetch } from '../../utils/fetchs'
import { useMMKVBoolean } from 'react-native-mmkv'
import Toast from 'react-native-toast-message'

const Register = () => {
  const navigation = useNavigation()
  const [formData, setFormData] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isDarkMode] = useMMKVBoolean("darkMode")
  const { t } = useTranslation()

  const handleInputChange = (name, text) => {
    setFormData(prev => ({ ...prev, [name]: text }))
  }

  const register = async () => {
  const requiredFields = ['firstname', 'lastname', 'username', 'email', 'password', 'confirmPassword'];
  for (let field of requiredFields) {
    if (!formData[field] || formData[field].trim() === '') {
      Toast.show({
        type: 'error',
        text1: t('registerFailedTitle'),
        text2: t('registerValidationError', { field: t(`${field}-text`) || field }),
        position: 'top',
        visibilityTime: 3000,
        topOffset: 50,
      });
      return;
    }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    Toast.show({
      type: 'error',
      text1: t('registerInvalidEmailTitle'),
      text2: t('registerInvalidEmailText'),
      position: 'top',
      visibilityTime: 3000,
      topOffset: 50,
    });
    return;
  }

  if (formData.password !== formData.confirmPassword) {
    Toast.show({
      type: 'error',
      text1: t('registerPasswordMismatchTitle'),
      text2: t('registerPasswordMismatchText'),
      position: 'top',
      visibilityTime: 3000,
      topOffset: 50,
    });
    return;
  }

  const data = await RegisterFetch(formData);

  if (data.success) {
    Toast.show({
      type: 'success',
      text1: t('registerSuccessTitle'),
      text2: data.message || t('registerSuccessText'),
      position: 'top',
      visibilityTime: 3000,
      topOffset: 50,
    });
    setTimeout(() => {
      navigation.navigate("Login");
    }, 2000);
  } else {
    Toast.show({
      type: 'error',
      text1: t('registerFailedTitle'),
      text2: data.message || t('registerFailedText'),
      position: 'top',
      visibilityTime: 3000,
      topOffset: 50,
    });
  }
};



  const textColor = isDarkMode ? '#FFFFFF' : '#000000'
  const borderColor = isDarkMode ? '#FFFFFF' : '#000000'

  return (
    <KeyboardAwareScrollView style={{ backgroundColor: isDarkMode ? '#252631' : '#ffffff' }} keyboardShouldPersistTaps="handled" contentContainerClassName='flex-1 justify-center'>
      <View className='p-6 gap-8'>
        <TextInput onChangeText={text => handleInputChange("firstname", text)} placeholderTextColor="#BCBCBC" placeholder={t("firstname-text")} className='border h-[57px] bg-transparent pl-3 rounded-[5px] text-[14px]' style={{ borderColor, color: textColor }} />

        <TextInput onChangeText={text => handleInputChange("lastname", text)} placeholder={t("lastname-text")} placeholderTextColor="#BCBCBC" className='border h-[57px] bg-transparent pl-3 rounded-[5px] text-[14px]' style={{ borderColor, color: textColor }} />

        <TextInput onChangeText={text => handleInputChange("username", text)} placeholder={t("usernameInput")} placeholderTextColor="#BCBCBC" className='border h-[57px] bg-transparent pl-3 rounded-[5px] text-[14px]' style={{ borderColor, color: textColor }} />

        <TextInput onChangeText={text => handleInputChange("email", text)} placeholder={t("emailInput")} placeholderTextColor="#BCBCBC" className='border h-[57px] bg-transparent pl-3 rounded-[5px] text-[14px]' style={{ borderColor, color: textColor }} />

        <View className='relative'>
          <TextInput
            onChangeText={text => handleInputChange("password", text)}
            placeholder={t("passwordInput")}
            placeholderTextColor="#BCBCBC"
            secureTextEntry={!showPassword}
            className='border h-[57px] bg-transparent pl-3 pr-12 rounded-[5px] text-[14px]'
            style={{ borderColor, color: textColor }}
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
            className='border h-[57px] bg-transparent pl-3 pr-12 rounded-[5px] text-[14px]'
            style={{ borderColor, color: textColor }}
          />
          <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} className='absolute right-4 top-[20px]'>
            <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} color='white' />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={register} className='bg-[#3A3CB3] h-[64px] py-5 rounded-lg'>
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
