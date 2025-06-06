import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'
import { ForgotPasswordFetch } from "../../utils/fetchs"
import { Text, View, TextInput, TouchableOpacity } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Toast from 'react-native-toast-message'
import { useMMKVBoolean } from 'react-native-mmkv';


const ForgotPassword = () => {
  const navigation = useNavigation()
  const [formData, setFormData] = useState({})
  const [isDarkMode] = useMMKVBoolean("darkMode");
  const { t } = useTranslation()

  const handleInputChange = (name, text) => {
    setFormData(prevState => ({ ...prevState, [name]: text }))
  }

  const forgotPassword = async () => {
    const result = await ForgotPasswordFetch(formData)

    if (result.success) {
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: result.message || 'Reset link sent to your email.',
        position: 'top',
        visibilityTime: 3000,
        topOffset: 50,
      })
    } else {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: result.message || 'Something went wrong.',
        position: 'top',
        visibilityTime: 3000,
        topOffset: 50,
      })
    }
  }

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerClassName="flex-1"
      className="pt-[100px]"
      style={{ backgroundColor: isDarkMode ? '#252631' : '#ffffff' }}
    >
      <View className="px-6 gap-10">
        <View className="items-center mb-6">
          <Text style={{color:isDarkMode?"#ffffff":"#000000"}} className="text-white text-4xl font-extrabold mb-2">Forgot Password?</Text>
          <Text className="text-gray-400 text-base text-center px-2">
            Enter your email address below and we’ll send you a link to reset your password.
          </Text>
        </View>

        <View>
          <TextInput
            onChangeText={text => handleInputChange("email", text)}
            placeholder={t("emailInput") || "Email address"}
            placeholderTextColor="#A1A1AA"
            className="border border-[#4B4D5E] h-[55px] bg-transparent px-4 rounded-lg text-base"
            style={{ color: "white" }}
          />
        </View>

        <TouchableOpacity onPress={forgotPassword} className="bg-[#3A3CB3] h-[55px] rounded-lg justify-center">
          <Text className="text-white text-center font-semibold text-lg">Send Reset Link</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text className="text-center text-gray-400 text-base underline">Back to Login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  )
}

export default ForgotPassword
