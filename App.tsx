import React from 'react';
import './global.css';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Navigation from './src/stacks/Navigation';
import { enableScreens } from 'react-native-screens';
enableScreens();
import { useEffect } from 'react';
import { useMMKVString } from 'react-native-mmkv';
import { useTranslation } from 'react-i18next';
import "./src/locales/index"

const App = () => {

  const[selectedLanguage,setSelectedLanguage]=useMMKVString('selectedLanguage');
  
  const {i18n}=useTranslation();
  useEffect(()=>{
    if(selectedLanguage){
      i18n.changeLanguage(selectedLanguage);
    }
  },[selectedLanguage]);
  
  
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <Navigation />
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default App