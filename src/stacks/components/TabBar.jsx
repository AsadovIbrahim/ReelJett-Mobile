import { View, TouchableOpacity, Text } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons/faHome';
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';
import { faFilm } from '@fortawesome/free-solid-svg-icons/faFilm';
import { faVideo } from '@fortawesome/free-solid-svg-icons/faVideo';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import { useMMKVBoolean } from 'react-native-mmkv';
import { useTranslation } from 'react-i18next';

const TabBar = ({ state, navigation }) => {
  const [isDarkMode] = useMMKVBoolean("darkMode");
  const { t } = useTranslation();

  return (
    <View
      style={{
        backgroundColor: isDarkMode ? '#15121E' : '#ffffff',
      }}
      className="flex-row justify-around items-center py-4"
    >
      {state.routes.map((route, index) => {
        const routeName = route.name;
        const isFocused = state.index === index;

        const iconColor = isFocused
          ? (isDarkMode ? '#ffffff' : '#000000')
          : '#888589';

        let icon = null;
        let label = '';

        switch (routeName) {
          case 'Home':
            icon = <FontAwesomeIcon icon={faHome} color={iconColor} size={24} />;
            label = t('tab_home');
            break;
          case 'Profile':
            icon = <FontAwesomeIcon icon={faUser} color={iconColor} size={24} />;
            label = t('tab_profile');
            break;
          case 'Search':
            icon = <FontAwesomeIcon icon={faSearch} color={iconColor} size={24} />;
            label = t('tab_search');
            break;
          case 'Movies':
            icon = <FontAwesomeIcon icon={faFilm} color={iconColor} size={24} />;
            label = t('tab_movies');
            break;
          case 'Videos':
            icon = <FontAwesomeIcon icon={faVideo} color={iconColor} size={24} />;
            label = t('tab_videos');
            break;
          default:
            label = routeName;
        }

        const onPress = () => {
          const event = navigation.emit({ type: 'tabPress', target: route.key });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(routeName);
          }
        };

        return (
          <TouchableOpacity
            key={index}
            onPress={onPress}
            className="flex-1 items-center"
          >
            <View
              style={{
                backgroundColor: isFocused
                  ? (isDarkMode ? '#2C2C36' : '#e0e0e0')
                  : 'transparent',
              }}
              className="p-2 rounded-2xl"
            >
              {icon}
            </View>
            <Text
              style={{
                color: isFocused
                  ? (isDarkMode ? '#ffffff' : '#000000')
                  : '#888589',
                fontWeight: isFocused ? '600' : 'normal',
                fontSize: 12,
                marginTop: 4,
              }}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TabBar;
