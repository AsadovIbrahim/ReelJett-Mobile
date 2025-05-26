import { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { useTranslation } from "react-i18next"
import { useNavigation } from '@react-navigation/native';
import ContentList from '../../common/ContentList';


const ProfessionalMovie=()=>{
    return(
        <>
        <ScrollView contentContainerStyle={{ paddingBottom: 20 }} className="flex-1 bg-[#15121E]">
            <ContentList searchTerm="New Release" type="movie"/>
            <ContentList searchTerm="Popular" type="movie"/>
            <ContentList searchTerm="Favourite" type="movie"/>
        </ScrollView>
        </>
    )
}

export default ProfessionalMovie;