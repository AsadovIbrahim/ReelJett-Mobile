import { Keyboard, Image, TextInput, FlatList, Text, View, ScrollView } from "react-native";
import { useTranslation } from "react-i18next";
import { useMMKVString,useMMKVBoolean } from "react-native-mmkv";
import { useEffect, useState } from "react";
import { GetComments, AddComment } from "../utils/fetchs";
import CommentItem from "./CommentItem";
import { storage } from "../utils/MMKVStore";


const Comments = ({ myContent,movieId }) => {
  const { t } = useTranslation();
  const [commentContent, setCommentContent] = useState("");
  const [comments, setComments] = useState([]);
  const [imageUri, setImageUri] = useState();
  const accessToken = useMMKVString("accessToken");
  const [isDarkMode] = useMMKVBoolean("darkMode");


   useEffect(() => {
   if (movieId) {
     loadingComments();
     setImageUri(storage.getString("profilePhoto"));
   }
   }, [movieId]);


  const loadingComments = async () => {
    try {
      const response = await GetComments(movieId);
      setComments(response);
    } catch (error) {
      console.log("Error fetching comments:", error);
      setComments([]); 
    }
  };

  const handleSubmit = async () => {
  if (!commentContent.trim()) return;
  try {
    const res = await AddComment(movieId, commentContent);
    const sorted = res.sort(
      (a, b) => new Date(a.sendingDate) - new Date(b.sendingDate)
    );
    setComments(sorted);
    setCommentContent("");
    Keyboard.dismiss();
  } catch (error) {
    console.log("Error submitting comment:", error);
  }
};


  return (
    <View style={{padding:20}} className={isDarkMode?"color-black":"color-gray-300"}>
      <Text className="text-base font-bold mb-2" style={{color:isDarkMode?"white":"black"}}>
        {comments?.length} {t("comment-text")}
      </Text>

      <View className="flex-row items-center mb-4">
        <Image
          source={{ uri: imageUri }}
          className="w-10 h-10 rounded-full mr-3 border border-gray-300"
        />
        <View className="flex-1 flex-row border border-gray-300 rounded-lg px-3 items-center">
          <TextInput
            className="flex-1 h-15 text-base"
            style={{color:isDarkMode?"white":"black"}}
            value={commentContent}
            onChangeText={setCommentContent}
            placeholder={
              accessToken ? t("add-comment-text") : t("must-be-logged-in-text")
            }
            editable={!!accessToken}
            onSubmitEditing={handleSubmit}
            placeholderTextColor="#999"
          />
        </View>
      </View>


      {Array.isArray(comments) && comments.map((comment) => (
        <CommentItem movieId={movieId} myContent={myContent} refreshParent={loadingComments} key={comment.id} comment={comment}  />
      ))}

    </View>
  );
};

export default Comments;