import React from 'react';
import { ScrollView } from 'react-native';
import Poster from './components/Poster';
import ContentList from '../../common/ContentList';
import { useMMKVBoolean } from 'react-native-mmkv';

const Homepage = () => {
  const [isDarkMode] = useMMKVBoolean("darkMode");

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      style={{ flex: 1, backgroundColor: isDarkMode ? '#252631' : '#ffffff' }}
    >
      <Poster />
      <ContentList searchTerm="Upcoming" type="movie" />
    </ScrollView>
  );
};

export default Homepage;
