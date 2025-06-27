import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { ForgotPasswordFetch } from '../../utils/fetchs';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-toast-message';
import { useMMKVBoolean } from 'react-native-mmkv';

const ForgotPassword = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({});
  const [isDarkMode] = useMMKVBoolean('darkMode');
  const { t } = useTranslation();

  const handleInputChange = (name, text) => {
    setFormData(prevState => ({ ...prevState, [name]: text }));
  };

  const forgotPassword = async () => {
    if (!formData.email || formData.email.trim() === '') {
      Toast.show({
        type: 'error',
        text1: t('forgotPasswordErrorTitle'),
        text2: t('forgotPasswordEmptyEmail'),
        position: 'top',
        visibilityTime: 3000,
        topOffset: 50,
      });
      return;
    }

    const result = await ForgotPasswordFetch(formData);

    if (result.success) {
  Toast.show({
    type: 'success',
    text1: t('forgotPasswordSuccessTitle'),
    text2: t(result.messageKey), // Tərcümə burada olur
    position: 'top',
    visibilityTime: 3000,
    topOffset: 50,
  });
} else {
  Toast.show({
    type: 'error',
    text1: t('forgotPasswordErrorTitle'),
    text2: t(result.messageKey), // Tərcümə burada olur
    position: 'top',
    visibilityTime: 3000,
    topOffset: 50,
  });
}

  };

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerClassName="flex-1"
      className="pt-[100px]"
      style={{ backgroundColor: isDarkMode ? '#252631' : '#ffffff' }}
    >
      <View className="px-6 gap-10">
        <View className="items-center mb-6">
          <Text
            style={{ color: isDarkMode ? '#ffffff' : '#000000' }}
            className="text-4xl font-extrabold mb-2"
          >
            {t('forgotPasswordTitle')}
          </Text>
          <Text
            className="text-base text-center px-2"
            style={{ color: isDarkMode ? '#A1A1AA' : '#4B5563' }}
          >
            {t('forgotPasswordSubText')}
          </Text>
        </View>

        <TextInput
          onChangeText={text => handleInputChange('email', text)}
          placeholder={t('emailInput')}
          placeholderTextColor="#A1A1AA"
          className="border h-[55px] bg-transparent px-4 rounded-lg text-base"
          style={{
            color: isDarkMode ? 'white' : 'black',
            borderColor: isDarkMode ? '#4B4D5E' : '#E5E7EB',
          }}
        />

        <TouchableOpacity
          onPress={forgotPassword}
          className="bg-[#3A3CB3] h-[55px] rounded-lg justify-center"
        >
          <Text className="text-white text-center font-semibold text-lg">
            {t('sendResetLink')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text className="text-center text-base underline" style={{ color: isDarkMode ? '#BCBCBC' : '#6B7280' }}>
            {t('backToLogin')}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default ForgotPassword;
