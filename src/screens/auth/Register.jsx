import { Text, View, TextInput, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { storage } from '../../utils/MMKVStore'
import { useTranslation } from 'react-i18next'
import NetflixIcon from "../../../assets/icons/netflix.svg"


const Register = () => {
    const navigation = useNavigation()
    const [formData, setFormData] = useState({})
    const { t } = useTranslation()

    const handleInputChange = (name, text) => {
        setFormData(prevState => ({
            ...prevState, [name]: text
        }))
    }

    const register = async () => {
        const response = await fetch("http://192.168.100.8:5001/api/v1/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(formData)
        })

        const data = await response.json()
        console.log(data)
        storage.set("username", data.user.username);
        navigation.navigate("Login")
    }

    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps="handled" contentContainerClassName='flex-1 justify-center' className='bg-[#141115]'>
      <View className='items-center'><NetflixIcon></NetflixIcon></View>
      <View className='p-6 gap-4 bg-[#141115] relative'>
        <TextInput onChangeText={text=>{
          handleInputChange("username",text)
        }} placeholder={t("usernameInput")} placeholderTextColor="#767676" className='border h-[52] bg-[#353236] pl-3' style={{color:"white"}}>
        </TextInput>


        <TextInput onChangeText={text=>{
          handleInputChange("email",text)
        }} placeholder={t("emailInput")} placeholderTextColor="#767676" className='border h-[52] bg-[#353236] pl-3' style={{color:"white"}}>
        </TextInput>

        <TextInput onChangeText={text=>{
          handleInputChange("password",text)
        }} placeholder={t("passwordInput")} placeholderTextColor="#767676" className='border h-[52] bg-[#353236] pl-3' style={{color:"white"}}>
        </TextInput>
        
        <TouchableOpacity onPress={register} className='bg-[#E50A14] py-5 rounded-lg'><Text className='text-white text-center font-bold text-xl'>{t("signup")}</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => {navigation.navigate("Login")}}><Text className='text-gray-400 text-center mt-4'>{t("alreadyhas")}</Text></TouchableOpacity>

      </View>

    </KeyboardAwareScrollView>

    )
}

export default Register