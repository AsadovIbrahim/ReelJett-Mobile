import React, { useRef, useState } from "react";
import {
  FlatList,
  ImageBackground,
  TouchableOpacity,
  View,
  Text,
  Modal,
  Pressable,
  StyleSheet,
  Image
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useMMKVString, useMMKVBoolean } from "react-native-mmkv";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons/faChevronDown";

const LANGUAGES = [
  { label: "English", value: "en", displayLabel: "EN" },
  { label: "Русский", value: "ru", displayLabel: "RU" },
  { label: "Türkçe", value: "tr", displayLabel: "TR" },
  { label: "Azərbaycan", value: "az", displayLabel: "AZ" },
];

const Onboarding = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [fail, setFail] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isDarkMode] = useMMKVBoolean("darkMode");
  const [selectedLanguage, setSelectedLanguage] = useMMKVString("selectedLanguage");
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();

  const onboardingItems = [
    {
      image: require("../../../assets/images/onboarding1.png"),
      title: t("watchAnyDevice"),
      desc: t("streamAnywhere"),
    },
    {
      image: require("../../../assets/images/onboarding2.png"),
      title: t("findfavourites"),
      desc: t("personalizedmovie"),
    },
    {
      image: require("../../../assets/images/onboarding3.png"),
      title: t("upload"),
      desc: t("abilityposting"),
    },
    {
      image: require("../../../assets/images/onboarding4.png"),
      title: t("howDoIWatch"),
      desc: t("membersSubscribe"),
    },
  ];

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index ?? 0);
    }
  });

  const onLanguageChange = (lang) => {
    setSelectedLanguage(lang);
    i18n.changeLanguage(lang);
    setModalVisible(false);
  };

  const selectedDisplayLabel = LANGUAGES.find(l => l.value === selectedLanguage)?.displayLabel || "EN";

  const OnboardItem = ({ item }) => (
    <View style={{ backgroundColor: isDarkMode ? "#252631" : "#ffffff" }} className="items-center w-screen px-[40px] justify-center">
      <Image source={item.image} resizeMode="contain" className="h-[300px] w-[287px]" />
      <Text style={{ color: isDarkMode ? "#ffffff" : "#000000" }} className="text-[24px] font-bold text-center mt-[18px]">
        {item.title}
      </Text>
      <Text style={{ color: isDarkMode ? "#CCCCCC" : "#555555" }} className="text-[20px] text-center mt-5">
        {item.desc}
      </Text>
    </View>
  );

  const Dot = ({ index }) => {
    const dotColor = activeIndex === index ? (isDarkMode ? "#ffffff" : "#000000") : (isDarkMode ? "#444" : "#ccc");
    return <View style={{ backgroundColor: dotColor, width: 10, height: 10, borderRadius: 5 }} />;
  };

  return (
    <ImageBackground style={{ backgroundColor: isDarkMode ? "#252631" : "#ffffff" }} className="flex-1">
      {/* Language Selector */}
      <View style={{
        paddingHorizontal: 20,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        marginBottom: 20,
      }}>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "transparent",
            paddingVertical: 6,
            paddingHorizontal: 12,
            borderRadius: 8,
          }}
        >
          <Text style={{ color: isDarkMode ? "#fff" : "#000", fontWeight: "600", fontSize: 16, marginRight: 6 }}>
            {selectedDisplayLabel}
          </Text>
          <FontAwesomeIcon icon={faChevronDown} size={16} color={isDarkMode ? "#fff" : "#000"} />
        </TouchableOpacity>
      </View>

      {/* FlatList with dot control */}
      <FlatList
        data={onboardingItems}
        renderItem={({ item }) => <OnboardItem item={item} />}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={viewableItemsChanged.current}
        viewabilityConfig={viewabilityConfig}
        onScrollToIndexFailed={() => setFail(true)}
        {...(!fail ? { initialScrollIndex: 0 } : {})}
      />

      {/* Dot Indicators */}
      <View className="w-full justify-center flex-row gap-5 mb-6 mt-4">
        {onboardingItems.map((_, index) => (
          <Dot key={index} index={index} />
        ))}
      </View>

      {/* Get Started Button */}
      <TouchableOpacity className="bg-[#3A3CB3] rounded-md py-4 mx-5 mt-10 mb-12" onPress={() => navigation.navigate("Login")}>
        <Text className="text-center text-white font-bold text-xl">{t("getStarted")}</Text>
      </TouchableOpacity>

      <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
      <Pressable style={{ flex: 1 }} onPress={() => setModalVisible(false)}>
        <View
          style={[
            styles.modalDropdownTopRight,
            { backgroundColor: isDarkMode ? "#252631" : "#fff" }
          ]}
        >
          {LANGUAGES.map(lang => {
            const isSelected = selectedLanguage === lang.value;
            return (
              <TouchableOpacity
                key={lang.value}
                onPress={() => onLanguageChange(lang.value)}
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 16,
                  backgroundColor: isSelected
                    ? isDarkMode
                      ? "rgba(58, 60, 179, 0.3)"
                      : "rgba(0, 0, 0, 0.05)"
                    : "transparent",
                  borderRadius: 8,
                }}
              >
                <Text style={{ color: isDarkMode ? "#fff" : "#000", fontSize: 16 }}>
                  {lang.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </Pressable>
      </Modal>

    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: 200,
    borderRadius: 12,
    paddingVertical: 10,
    elevation: 5,
  },
  langOption: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  modalDropdownTopRight: {
  position: "absolute",
  top: 130,
  right: 20,
  width: 180,
  borderRadius: 12,
  paddingVertical: 8,
  elevation: 6,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 4,
},

});

export default Onboarding;
