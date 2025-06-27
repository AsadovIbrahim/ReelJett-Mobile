import { ScrollView, Text, View, Switch, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useMMKVString, useMMKVBoolean } from 'react-native-mmkv';
import { useTranslation } from 'react-i18next';
import { storage } from '../../utils/MMKVStore';


const Settings = () => {
  const [selectedLanguage, setSelectedLanguage] = useMMKVString("selectedLanguage");
  const [isDarkMode, setIsDarkMode] = useMMKVBoolean("darkMode");
  const { t, i18n } = useTranslation();

  const backgroundColor = isDarkMode ? '#252631' : '#ffffff';
  const containerColor = isDarkMode ? '#2f303c' : '#f2f2f2';
  const textColor = isDarkMode ? '#ffffff' : '#000000';
  const borderColor = isDarkMode ? '#3b3c47' : '#e0e0e0';
  const buttonColor = isDarkMode ? '#3A3CB3' : '#4f46e5';
  const buttonTextColor = '#ffffff';

  const handleLanguage = (lang) => {
    setSelectedLanguage(lang);
    i18n.changeLanguage(lang);
  };

  const handleLogout = async () => {
    storage.delete("accessToken");
    storage.set("firstTimeUser", false);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  return (
    <ScrollView style={{ backgroundColor }} contentContainerStyle={{ paddingBottom: 20, flexGrow: 1 }}>
      <View style={{paddingHorizontal: 20, paddingTop: 80 }}>
        <Text style={{ color: textColor, fontSize: 18, marginBottom: 8 }}>
          {t("languageSettings")}
        </Text>
        <View style={{ backgroundColor: containerColor, borderRadius: 8 }}>
          <Picker
            selectedValue={selectedLanguage || 'en'}
            onValueChange={handleLanguage}
            dropdownIconColor={textColor}
            style={{ color: textColor }}
          >
            <Picker.Item label="English" value="en" />
            <Picker.Item label="Русский" value="ru" />
            <Picker.Item label="Azərbaycan" value="az" />
            <Picker.Item label="Türkçe" value="tr" />
          </Picker>
        </View>
      </View>

      <View style={{ borderTopWidth: 1, marginHorizontal: 20, marginTop: 20, borderColor }} />

      <View style={{ paddingHorizontal: 20, paddingTop: 16 }}>
        <Text style={{ color: textColor, fontSize: 18, marginBottom: 8 }}>
          {t("switchAppearence")}
        </Text>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: containerColor,
          borderRadius: 8,
          paddingVertical: 12,
          paddingHorizontal: 16,
        }}>
          <Text style={{ color: textColor, fontSize: 16 }}>{t("darkMode")}</Text>
          <Switch
            value={!!isDarkMode}
            onValueChange={toggleDarkMode}
            thumbColor={isDarkMode ? "#fff" : "#ccc"}
            trackColor={{ false: "#888", true: "#4f46e5" }}
          />
        </View>
      </View>

      <View style={{ margin: 20 }}>
        <TouchableOpacity
          onPress={handleLogout}
          style={{
            backgroundColor: buttonColor,
            paddingVertical: 16,
            borderRadius: 8,
          }}
        >
          <Text style={{
            color: buttonTextColor,
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 18,
          }}>
            {t("logout")}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Settings;
