import { View, TouchableOpacity, Text } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons/faHome';
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';
import { faFilm } from '@fortawesome/free-solid-svg-icons/faFilm';
import { faVideo } from '@fortawesome/free-solid-svg-icons/faVideo';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import { useMMKVBoolean } from 'react-native-mmkv';

const TabBar = ({ state, navigation }) => {
  const [isDarkMode] = useMMKVBoolean("darkMode");

  return (
    <View
      style={{
        backgroundColor: isDarkMode ? '#15121E' : '#ffffff',
      }}
      className="flex-row justify-around items-center py-4"
    >
      {state.routes.map((route, index) => {
        const label = route.name;
        const isFocused = state.index === index;

        // İkon rəngi
        const iconColor = isFocused
          ? (isDarkMode ? '#ffffff' : '#000000')
          : '#888589';

        let icon = null;

        if (label === 'Home') {
          icon = <FontAwesomeIcon icon={faHome} color={iconColor} size={24} />;
        } else if (label === 'Profile') {
          icon = <FontAwesomeIcon icon={faUser} color={iconColor} size={24} />;
        } else if (label === 'Search') {
          icon = <FontAwesomeIcon icon={faSearch} color={iconColor} size={24} />;
        } else if (label === 'Movies') {
          icon = <FontAwesomeIcon icon={faFilm} color={iconColor} size={24} />;
        } else if (label === 'Videos') {
          icon = <FontAwesomeIcon icon={faVideo} color={iconColor} size={24} />;
        }

        const onPress = () => {
          const event = navigation.emit({ type: 'tabPress', target: route.key });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
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
