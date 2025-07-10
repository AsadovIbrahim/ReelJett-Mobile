import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { useMMKVBoolean } from 'react-native-mmkv';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

const helpItems = [
  {
    title: 'How to change my personal info?',
    description: 'Go to Profile → Edit Profile page to change your personal info.',
  },
  {
    title: 'How to watch a movie?',
    description: 'Press the play button in the movie details page.',
  },
  {
    title: 'How to see my own uploaded movies?',
    description: 'Go to Profile → My Videos and explore your uploads.',
  },
  {
    title: 'How to change the app’s language?',
    description: 'Go to Profile → Settings and choose your preferred language.',
  },
  {
    title: 'How to log out?',
    description: 'Go to Profile → Settings and tap on Log Out.',
  },
];

const Help = () => {
  const [isDarkMode] = useMMKVBoolean('darkMode');
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleLinkPress = () => {
    Linking.openURL('https://reeljett.com');
  };

  const colors = {
    background: isDarkMode ? '#252631' : '#ffffff',
    text: isDarkMode ? '#ffffff' : '#000000',
    subText: isDarkMode ? '#aaa' : '#555',
    card: isDarkMode ? '#333' : '#f2f2f2',
    cardContent: isDarkMode ? '#2a2a2a' : '#eaeaea',
    borderText: isDarkMode ? '#ccc' : '#333',
  };

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      style={{ flex: 1, backgroundColor: colors.background }}
    >
      <View style={{ padding: 20 }}>
        <Text style={{ color: colors.text, fontSize: 20, fontWeight: 'bold' }}>
          {t('Help & Frequently Asked Questions')}
        </Text>
        <Text style={{ color: colors.subText, marginTop: 10, lineHeight: 20 }}>
          {t("Below you'll find answers to common questions about using ReelJett.")}
        </Text>
      </View>

      <View style={{ paddingHorizontal: 20 }}>
        {helpItems.map((item, index) => (
          <View key={index} style={{ marginBottom: 10 }}>
            <TouchableOpacity
              onPress={() => toggleAccordion(index)}
              style={{
                padding: 15,
                backgroundColor: colors.card,
                borderRadius: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: '600', color: colors.text }}>
                {t(item.title)}
              </Text>
              <FontAwesomeIcon
                icon={openIndex === index ? faChevronUp : faChevronDown}
                color={colors.text}
                size={16}
              />
            </TouchableOpacity>

            {openIndex === index && (
              <View
                style={{
                  backgroundColor: colors.cardContent,
                  padding: 15,
                  borderBottomLeftRadius: 10,
                  borderBottomRightRadius: 10,
                }}
              >
                <Text style={{ color: colors.borderText }}>{t(item.description)}</Text>
              </View>
            )}
          </View>
        ))}

        <View className='flex-row pt-5 ps-1'>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: colors.text }}>
                {t('Check out our website')}:{' '}
            </Text>
            <TouchableOpacity onPress={handleLinkPress}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#3A3CB3', textDecorationLine: 'underline' }}>
                    https://reeljett.com
                </Text>
            </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Help;
