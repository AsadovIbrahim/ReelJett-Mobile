import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { storage } from '../../utils/MMKVStore'
import { useNavigation } from '@react-navigation/native'
import { Text, View, TextInput, TouchableOpacity } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { LoginFetch } from '../../utils/fetchs'
import { useMMKVBoolean } from 'react-native-mmkv';
import Toast from 'react-native-toast-message'

const Login = () => {
  const navigation = useNavigation()
  const [formData, setFormData] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [isDarkMode] = useMMKVBoolean("darkMode");
  const { t } = useTranslation();

  const handleInputChange = (name, text) => {
    setFormData(prevState => ({
      ...prevState, [name]: text
    }))
  }

  const login = async () => {
  const requiredFields = ['username', 'password'];
  for (let field of requiredFields) {
    if (!formData[field] || formData[field].trim() === '') {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: `Please enter your ${field}.`,
        position: 'top',
        visibilityTime: 3000,
        topOffset: 50,
      });
      return;
    }
  }

  const data = await LoginFetch(formData);

  if (data.success) {
    storage.set("accessToken", data.accessToken.token);
    storage.set("username", formData.username);
    storage.set("profilePhoto", data.profilePhoto);

    Toast.show({
      type: 'success',
      text1: 'Login Success',
      text2: 'Welcome back!',
      position: 'top',
      visibilityTime: 2000,
      topOffset: 50,
    });
  } else {
    let message = data.message || 'Login failed';
    if (message.toLowerCase().includes("invalid")) {
      message = "Invalid username or password.";
    }
    Toast.show({
      type: 'error',
      text1: 'Login Failed',
      text2: message,
      position: 'top',
      visibilityTime: 3000,
      topOffset: 50,
    });
  }
};

  const textColor = isDarkMode ? '#FFFFFF' : '#000000';
  const borderColor = isDarkMode ? '#FFFFFF' : '#000000';

  return (
    <KeyboardAwareScrollView
      style={{ backgroundColor: isDarkMode ? '#252631' : '#ffffff' }}
      keyboardShouldPersistTaps="handled"
      contentContainerClassName='flex-1'
      className='pt-[200px]'
    >
      <View className='p-6 gap-8' style={{ backgroundColor: isDarkMode ? '#252631' : '#ffffff' }}>
        
        <TextInput
          onChangeText={text => handleInputChange("username", text)}
          placeholder={t("usernameInput")}
          placeholderTextColor="#BCBCBC"
          style={{
            borderColor: borderColor,
            color: textColor,
          }}
          className='border h-[57px] bg-transparent pl-3 rounded-[5px] text-[14px]'
        />

        <View className='relative'>
          <TextInput
            onChangeText={text => handleInputChange("password", text)}
            placeholder={t("passwordInput")}
            placeholderTextColor="#BCBCBC"
            secureTextEntry={!showPassword}
            style={{
              borderColor: borderColor,
              color: textColor,
            }}
            className='border h-[57px] bg-transparent pl-3 pr-12 rounded-[5px] text-[14px]'
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            className='absolute right-4 top-[20px]'
          >
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              color={textColor}
            />
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity onPress={() => { navigation.navigate("ForgotPassword") }}>
            <Text className='text-right text-[#BCBCBC]'>
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={login} className='bg-[#3A3CB3] h-[64px] py-5 rounded-lg'>
          <Text className='text-white text-center font-bold text-xl'>
            {t("signin")}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => { navigation.navigate("Register") }}>
          <Text className='text-center' style={{ color: isDarkMode ? '#BCBCBC' : '#666' }}>
            {t("donthaveaccount")}
          </Text>
        </TouchableOpacity>

      </View>
    </KeyboardAwareScrollView>
  )
}

export default Login
