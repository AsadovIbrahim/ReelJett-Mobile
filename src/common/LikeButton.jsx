import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { useMMKVBoolean } from "react-native-mmkv";
import { storage } from "../utils/MMKVStore";
import { SetLikeCount } from "../utils/fetchs";
import { View } from "react-native";
import { TouchableOpacity } from "react-native";
import { Text } from "react-native";

const LikeButton = ({movieId, initialLike, initialDislike}) => {
    const { t }=useTranslation();
    const [likeCount, setLikeCount] = useState(initialLike);
    const [dislikeCount, setDislikeCount] = useState(initialDislike);
    const [isDarkMode] = useMMKVBoolean("darkMode");
 
    

    const handleLikeClick = async() => {
        if(storage.getString("accessToken")) {
            var r=await SetLikeCount(movieId,true);
            setLikeCount(r.likeCount);
            setDislikeCount(r.dislikeCount);
            
        }
        else {
            // alert(t('must-be-logged-in-text'));
        }
    }
   
    const handleDislikeClick = async() => {
        if(storage.getString("accessToken")) {
            var r=await SetLikeCount(movieId,false);
            setLikeCount(r.likeCount);
            setDislikeCount(r.dislikeCount);
        }
        else {
            // alert(t('must-be-logged-in-text'));
        }
    }
   
    return (
        <View className="flex-row items-center justify-start ms-1 gap-5 px-4 py-2">
            <TouchableOpacity onPress={() => handleLikeClick()} className="gap-1 flex-row items-center space-x-1">
                <FontAwesomeIcon  icon={faThumbsUp} size={20} color={isDarkMode?"white":"#3A3CB3"}  />
                <Text style={{ color: isDarkMode ? "white" : "black" }}>{likeCount}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleDislikeClick()} className="gap-1 flex-row items-center space-x-1">
                <FontAwesomeIcon icon={faThumbsDown} size={20} color={isDarkMode?"white":"#3A3CB3"} />
                <Text style={{ color: isDarkMode ? "white" : "black" }}>{dislikeCount}</Text>
            </TouchableOpacity>
        </View>
        
    )
}
 
export default LikeButton