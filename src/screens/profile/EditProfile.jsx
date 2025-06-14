
import { View , TextInput , Button } from "react-native"
import { useEffect, useState } from 'react';
import { useMMKVString,useMMKVBoolean } from 'react-native-mmkv';
import { useTranslation } from 'react-i18next';
import { Text } from "react-native";
import { TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faEdit, faEye,faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { GetAccountData, UpdateAccount } from "../../utils/fetchs";
import { Alert } from "react-native";
import { storage } from "../../utils/MMKVStore";
import { Image } from "react-native";
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native'
import RNFS from 'react-native-fs';

const EditProfile = () => {

    const [selectedLanguage, setSelectedLanguage] = useMMKVString("selectedLanguage");
    const { t } = useTranslation();
        
    const [showPassword, setShowPassword] = useState(false)
    
    const [accountData,setAccountData]=useState()
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();
    const [imageUri, setImageUri] = useState();
    const [binaryImages, setBinaryImages] = useState("");
    
    const [isDarkMode] = useMMKVBoolean("darkMode");

    useEffect(() => {
        handleGetAccountData()
    },[])

    useEffect(() => {
        if (accountData) {
            loadInputs();
        }
    }, [accountData]);


    const textColor = isDarkMode ? '#FFFFFF' : '#000000';
    const borderColor = isDarkMode ? '#FFFFFF' : '#000000';
    
    const handleGetAccountData = async() => {
        const data=await GetAccountData()
        if(data.error!=="") {
            Alert.alert(data.error)
        }
        else {
            setAccountData(data)
        }
    };


    const loadInputs = async () => {
        setFirstname(accountData.firstname)
        setLastname(accountData.lastname)
        setEmail(accountData.email)
        setUsername(accountData.username)
        setPassword(accountData.password)
        setImageUri(storage.getString("profilePhoto"))
    };



    const handleInputChange = (field, value) => {
        switch (field) {
            case 'firstname':
                setFirstname(value);
                break;
            case 'lastname':
                setLastname(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'password':
                setPassword(value);
                break;
            case 'username':
                setUsername(value);
                break;
            default:
                break;
        }
        setAccountData(prev => ({
            ...prev,
            [field]: value
        }));
    };


    const handleCancel = async() => {
        navigation.navigate("ProfileMain")
    }

    const handleUpdate = async() => {
        const data= await UpdateAccount(accountData);
        storage.set("username",accountData.username)
        storage.set("profilePhoto",imageUri)
        
    };
    
    const pickImage = async () => {
        launchImageLibrary({ mediaType: 'photo' }, async (response) => {
        if (response.didCancel || response.errorCode || !response.assets?.length) return;

        const asset = response.assets[0];
        const uri = asset.uri.startsWith('file://') ? asset.uri : `file://${asset.uri}`;
        setImageUri(uri);

        try {
            const base64Data = await RNFS.readFile(uri, 'base64');
            
            setBinaryImages(base64Data)
        } catch (err) {
            console.error('Error reading image file:', err);
        }
        });
    };



    return (
        <KeyboardAwareScrollView style={{backgroundColor:isDarkMode?"#252631":"white"}} keyboardShouldPersistTaps="handled" >
                
            <View className='p-6 gap-8'>

                <View className="relative items-center justify-center">
                    <View className="w-[140px] h-[140px] bg-gray-500 rounded-full overflow-hidden justify-center items-center">
                        <Image
                        source={{ uri: imageUri }}
                        className="w-full h-full"
                        resizeMode="cover"
                        />
                    </View>
                    <TouchableOpacity className="absolute bottom-0 right-32 rounded-full" onPress={pickImage}>
                        <FontAwesomeIcon icon={faEdit} color={isDarkMode?"white":"black"} size={30} />
                    </TouchableOpacity>
                </View>





                <TextInput value={firstname} onChangeText={text => handleInputChange("firstname", text)} placeholder={t("firstname-text")} placeholderTextColor="#BCBCBC" className='border h-[57px] bg-[transparent] pl-3 rounded-[5px] text-[14px]'
                    style={{
                      borderColor: borderColor,
                      color: textColor,
                    }} />
                <TextInput value={lastname} onChangeText={text => handleInputChange("lastname", text)} placeholder={t("lastname-text")} placeholderTextColor="#BCBCBC" className='border h-[57px] bg-[transparent] pl-3 rounded-[5px] text-[14px]'
                    style={{
                        borderColor: borderColor,
                        color: textColor,
                    }} />
                <TextInput value={email} onChangeText={text => handleInputChange("email", text)} placeholder={t("emailInput")} placeholderTextColor="#BCBCBC" className='border h-[57px] bg-[transparent] pl-3 rounded-[5px] text-[14px]'
                    style={{
                        borderColor: borderColor,
                        color: textColor,
                    }} />
                <View className='relative'>
                    <TextInput
                    onChangeText={text => handleInputChange("password", text)}
                    value={password}
                    editable={false}
                    placeholder={t("passwordInput")}
                    placeholderTextColor="#BCBCBC"
                    secureTextEntry={!showPassword}
                    className='border h-[57px] bg-[transparent] pl-3 pr-12 rounded-[5px] text-[14px]'
                    style={{
                        borderColor: borderColor,
                        color: textColor,
                    }}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)} className='absolute right-4 top-[20px]'>
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} color='white' />
                    </TouchableOpacity>
                </View>
                <TextInput value={username} onChangeText={text => handleInputChange("username", text)} placeholder={t("usernameInput")} placeholderTextColor="#BCBCBC" className='border h-[57px] bg-[transparent] pl-3 rounded-[5px] text-[14px]'
                    style={{
                        borderColor: borderColor,
                        color: textColor,
                    }}/>

                <View className="flex-row justify-between mt-3">
                    <TouchableOpacity onPress={handleUpdate} className='bg-[#3A3CB3] px-11 py-3 rounded-lg'>
                        <Text className='text-white text-center font-bold text-xl'>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className='bg-[#2E2B2F] px-11 py-3 rounded-lg' onPress={handleCancel}>
                        <Text className='text-white text-center font-bold text-xl'>Cancel</Text>
                    </TouchableOpacity>
                </View>
                

            </View>
        </KeyboardAwareScrollView>
    );
}

export default EditProfile
