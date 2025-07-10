import React, { useState } from "react";
import {  TouchableOpacity,  Text,  Animated,  Pressable,  Modal } from "react-native";
import FastImage from "react-native-fast-image";
import { useNavigation } from "@react-navigation/native";
import { useMMKVBoolean } from 'react-native-mmkv';
import { DeleteFromFavourites } from "../utils/fetchs";
import { useTranslation } from "react-i18next";

const ContentCard = ({ refreshParent,isFavourite, isHistory , item  }) => {

  const navigation = useNavigation();
  const [isDarkMode] = useMMKVBoolean("darkMode");
  const [showInfoBar, setShowInfoBar] = useState(false);
  const slideAnim = useState(new Animated.Value(200))[0];
  const { t }=useTranslation()

  const handleLongPress = () => {
    if (!isFavourite) return;
    setShowInfoBar(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  const hideInfoBar = () => {
    Animated.timing(slideAnim, {
      toValue: 200,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setShowInfoBar(false);
    });
  };

  const handleDelete = async () => {
    await DeleteFromFavourites(item.id)
    hideInfoBar();
    refreshParent?.();
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          if (!isHistory) {
            navigation.navigate("Home", {
              screen: "Details",
              params: { id: item.id, item },
            });
          } else {
            const movieToSend = {
              id: item.id,
              title: item.original_title,
              original_title: item.original_title,
              release_date: item.release_date || "2025",
              vote_average: item.rating,
              likeCount: item.likeCount,
              dislikeCount: item.dislikeCount,
            };
            navigation.navigate("Home", {
              screen: "MoviePlayer",
              params: { movie: movieToSend },
            });
          }
        }}

        onLongPress={handleLongPress}
        delayLongPress={300}
      >
        <FastImage
          style={{
            width: 125,
            height: 175,
            borderRadius: 12,
          }}
          source={{
            uri: (isHistory ? `https://image.tmdb.org/t/p/original${item.poster}` : `https://image.tmdb.org/t/p/original${item.poster_path}` ),
            priority: FastImage.priority.high,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
      </TouchableOpacity>

      {isFavourite && (
        <Modal transparent visible={showInfoBar} animationType="none">
          <Pressable
            onPress={hideInfoBar}
            style={{
              flex: 1,
              backgroundColor: "rgba(0,0,0,0.4)",
              justifyContent: "flex-end",
            }}
          >
            <Animated.View
              style={{
                backgroundColor: isDarkMode?"#252631":"white",
                padding: 20,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                transform: [{ translateY: slideAnim }],
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "500",
                  textAlign: "center",
                  color:isDarkMode?"#ffffff":"black",
                  marginBottom: 16,
                }}
              >
                {t("doyouwanttodelete")}
              </Text>

              <TouchableOpacity
                onPress={handleDelete}
                style={{
                  backgroundColor: "#3A3CB3",
                  paddingVertical: 12,
                  borderRadius: 10,
                  marginBottom: 10,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 14,
                    textAlign: "center",
                    fontWeight: "600",
                  }}
                >
                  {t("delete")}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={hideInfoBar}>
                <Text
                  style={{
                    color:isDarkMode?"#ffffff":"black",
                    fontSize: 14,
                    textAlign: "center",
                    paddingVertical: 8,
                  }}
                >
                  {t("cancel")}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </Pressable>
        </Modal>
      )}
    </>
  );
};

export default ContentCard;
