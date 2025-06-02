import React from 'react'
import { ScrollView } from 'react-native'
import Poster from './components/Poster'
import ContentList from '../../common/ContentList'

const Homepage = () => {
  return (
    <ScrollView contentContainerStyle={{paddingBottom:20}} className='flex-1 bg-[#252631]'>
      <Poster/>
      <ContentList searchTerm="Upcoming" type="movie"/>
    </ScrollView>
  )
}

export default Homepage