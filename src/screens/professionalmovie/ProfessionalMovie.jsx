import { ScrollView } from 'react-native';
import ContentList from '../../common/ContentList';


const ProfessionalMovie=()=>{
    return(
        <>
        <ScrollView contentContainerStyle={{ paddingBottom: 20 }} className="flex-1 bg-[#15121E]">
            <ContentList searchTerm="New Release" type="movie"/>
            <ContentList searchTerm="Top Rated" type="movie"/>
            <ContentList searchTerm="Your Favourite" type="movie"/>
        </ScrollView>
        </>
    )
}

export default ProfessionalMovie;