import { useState } from "react";
import { FlatList, ImageBackground, TouchableOpacity } from "react-native";
import { Image } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useMMKVString, useMMKVBoolean } from "react-native-mmkv";
import { useTranslation } from "react-i18next";

const Onboarding = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [fail, setFail] = useState(false);
  const [isDarkMode] = useMMKVBoolean("darkMode");
  const navigation = useNavigation();
  const [selectedLanguage, setSelectedLanguage] = useMMKVString("selectedLanguage");
  const { t } = useTranslation();

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

  const OnboardItem = ({ item }) => {
    return (
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
  };

  const Dot = ({ index }) => {
    const dotColor = activeIndex === index
      ? (isDarkMode ? "#ffffff" : "#000000")
      : (isDarkMode ? "#444" : "#ccc");

    return (
      <View style={{ backgroundColor: dotColor }} className="size-[10px] rounded-full" />
    );
  };

  const findIndex = ({ viewableItems }) => {
    setActiveIndex(viewableItems[0].index);
  };

  const handleLanguage = () => {
    setSelectedLanguage((prevState) => (prevState === "en" ? "ru" : "en"));
  };

  return (
    <ImageBackground style={{ backgroundColor: isDarkMode ? "#252631" : "#ffffff" }} className="flex-1">
      <View className="w-full items-center relative mb-[20px]">
        <TouchableOpacity onPress={handleLanguage} className="absolute right-7">
          <Text style={{ color: isDarkMode ? "#ffffff" : "#000000" }}>{t("language")}</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        onViewableItemsChanged={findIndex}
        showsHorizontalScrollIndicator={false}
        onScrollToIndexFailed={() => {
          setFail(true);
        }}
        {...(!fail ? { initialScrollIndex: 3 } : {})}
        pagingEnabled
        horizontal
        data={onboardingItems}
        renderItem={({ item }) => <OnboardItem item={item} />}
      />

      <View className="w-full justify-center flex-row gap-5 mb-6">
        {onboardingItems.map((_, index) => (
          <Dot key={index} index={index} />
        ))}
      </View>

      <TouchableOpacity className="bg-[#3A3CB3] rounded-md py-4 mx-5 mt-10 mb-12" onPress={() => navigation.navigate("Login")}>
        <Text className="text-center text-white font-bold text-xl">{t("getStarted")}</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default Onboarding;
