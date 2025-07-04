import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useMMKVBoolean } from "react-native-mmkv";
import { GetUserViews, SetViewCount } from "../utils/fetchs";
import { TouchableOpacity, Modal, Pressable, FlatList } from "react-native";
import { Image } from "react-native";
import { t } from "i18next";

const ViewCount = ({ movieId, initialCount,myContent }) => {
    const [viewCount, setViewCount] = useState(initialCount || 0);
    const [isDarkMode] = useMMKVBoolean("darkMode");
    const [modalVisible, setModalVisible] = useState(false);
    const [userViews, setUserViews] = useState();
    
    useEffect(() => {
        const fetchViewCount = async () => {
        try {
            const result = await SetViewCount(movieId);
            if (result?.data) {
            setViewCount(result.data);
            } else if (typeof result === "number") {
            setViewCount(result);
            }
        } catch (error) {
            console.error("View count fetch error:", error);
        }
        };

        if (movieId) {
        fetchViewCount();
        }
    }, [movieId]);

    const handleGetUserViews = async () => {
        const views = await GetUserViews(movieId);
        setUserViews(views);
        console.log(views[0])
        setModalVisible(true);
    };

    const renderUser = ({ item }) => (
        
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
            <Image
            source={{ uri: item.profilePhoto }}
            style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                marginRight: 10,
                backgroundColor: '#ccc', // fallback color
            }}
            />
            <Text style={{ color: isDarkMode ? "white" : "black", fontSize: 15 , marginRight:12}}>
            {item.username}
            </Text>
            <Text style={{ color: isDarkMode ? "white" : "black", fontSize: 12 }}>
            {item.operationTime}
            </Text>
        </View>
    );

  return (
    
    <View className="flex-row items-center gap-2">


        <FontAwesomeIcon icon={faEye} size={20} color={isDarkMode ? "white" : "gray"} />

        {myContent ? (
        <TouchableOpacity onPress={handleGetUserViews}>
            <Text style={{ color: isDarkMode ? "white" : "black" }}>{viewCount}</Text>
        </TouchableOpacity>
        ) : (
        <Text style={{ color: isDarkMode ? "white" : "black" }}>{viewCount}</Text>
        )}



        <Modal
            transparent={true}
            animationType="fade"
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
            >
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0,0,0,0.5)'
            }}>
                <View style={{
                backgroundColor: isDarkMode ? "#2C2C36" : "white",
                padding: 20,
                borderRadius: 10,
                width: 250,
                maxHeight: 300
                }}>
                <Text style={{
                    fontWeight: 'bold',
                    color: isDarkMode ? "white" : "black",
                    fontSize: 16,
                    marginBottom: 10
                }}>
                    {t("viewedby")}
                </Text>

                <FlatList
                    data={userViews}
                    renderItem={renderUser}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                />

                <Pressable onPress={() => setModalVisible(false)} style={{ marginTop: 10 }}>
                    <Text style={{ color:isDarkMode?"white":"black", textAlign: 'right' }}>{t("close")}</Text>
                </Pressable>
                </View>
            </View>
        </Modal>



    </View>
  );
};

export default ViewCount;