import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { useMMKVBoolean } from "react-native-mmkv";
import { storage } from "../utils/MMKVStore";
import { GetUserDislikes, GetUserLikes, SetLikeCount } from "../utils/fetchs";
import { View, TouchableOpacity, Text, Modal, Pressable, FlatList } from "react-native";
import { Image } from "react-native";

const LikeButton = ({ movieId, initialLike, initialDislike, myContent }) => {
    const { t } = useTranslation();
    const [likeCount, setLikeCount] = useState(initialLike);
    const [dislikeCount, setDislikeCount] = useState(initialDislike);
    const [userLikes, setUserLikes] = useState([]);
    const [userDislikes, setUserDislikes] = useState([]);
    const [isDarkMode] = useMMKVBoolean("darkMode");
    const [modalVisible, setModalVisible] = useState(false);
    const [modalType, setModalType] = useState("likes");

    const handleLikeClick = async () => {
        if (storage.getString("accessToken")) {
        const r = await SetLikeCount(movieId, true);
        setLikeCount(r.likeCount);
        setDislikeCount(r.dislikeCount);
        }
    };

    const handleDislikeClick = async () => {
        if (storage.getString("accessToken")) {
        const r = await SetLikeCount(movieId, false);
        setLikeCount(r.likeCount);
        setDislikeCount(r.dislikeCount);
        }
    };

    const handleGetUserLikes = async () => {
        const likes = await GetUserLikes(movieId);
        setUserLikes(likes);
        setModalType("likes");
        setModalVisible(true);
    };

    const handleGetUserDislikes = async () => {
        const dislikes = await GetUserDislikes(movieId);
        setUserDislikes(dislikes);
        setModalType("dislikes");
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
                backgroundColor: '#ccc',
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
    <View className="flex-row items-center justify-start ms-1 gap-2 px-4 py-2">
      <TouchableOpacity onPress={handleLikeClick} className="gap-1 flex-row items-center space-x-1">
        <FontAwesomeIcon icon={faThumbsUp} size={20} color={isDarkMode ? "white" : "#3A3CB3"} />
      </TouchableOpacity>

      {myContent ? (
        <TouchableOpacity onPress={handleGetUserLikes}>
          <Text style={{ color: isDarkMode ? "white" : "black" }}>{likeCount}</Text>
        </TouchableOpacity>
      ) : (
        <Text style={{ color: isDarkMode ? "white" : "black" }}>{likeCount}</Text>
      )}

      <TouchableOpacity onPress={handleDislikeClick} className="gap-1 flex-row items-center space-x-1">
        <FontAwesomeIcon icon={faThumbsDown} size={20} color={isDarkMode ? "white" : "#3A3CB3"} />
      </TouchableOpacity>

      {myContent ? (
        <TouchableOpacity onPress={handleGetUserDislikes}>
          <Text style={{ color: isDarkMode ? "white" : "black" }}>{dislikeCount}</Text>
        </TouchableOpacity>
      ) : (
        <Text style={{ color: isDarkMode ? "white" : "black" }}>{dislikeCount}</Text>
      )}

      {/* Modal */}
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
              {modalType === "likes" ? "Liked by" : "Disliked by"}
            </Text>

            <FlatList
              data={modalType === "likes" ? userLikes : userDislikes}
              renderItem={renderUser}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
            />

            <Pressable onPress={() => setModalVisible(false)} style={{ marginTop: 10 }}>
              <Text style={{ color:isDarkMode?"white":"black", textAlign: 'right' }}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default LikeButton;