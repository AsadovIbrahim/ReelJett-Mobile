import { TouchableOpacity } from "react-native"
import FastImage from "react-native-fast-image"
import { useNavigation } from "@react-navigation/native"
import { useEffect } from "react"
import { Alert } from "react-native"

const ContentCard = ({ item,type }) => {

  const navigation=useNavigation()




  return (
    <TouchableOpacity onPress={()=>{
      // navigation.navigate("Home",{screen:"Details",params:{id:item.id,type:item.media_type?item.media_type:type}})
      navigation.navigate("Home",{screen:"Details",params:{id:item.id,type:"movie",item:item}})
    }}>
      <FastImage style={{width:125,height:175,borderRadius:12}} source={{
        uri:`https://image.tmdb.org/t/p/original${item.poster_path}`,
        // priority:item.media_type=="movie"?FastImage.priority.normal:FastImage.priority.low
        priority:FastImage.priority.normal
      }}
      resizeMode={FastImage.resizeMode.contain}
      >
      </FastImage>
    </TouchableOpacity>
  )
}

export default ContentCard