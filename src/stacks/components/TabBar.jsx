import { View, TouchableOpacity, Text } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons/faHome';
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';
import { faFilm } from '@fortawesome/free-solid-svg-icons/faFilm';
import { faVideo } from '@fortawesome/free-solid-svg-icons/faVideo';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';

const TabBar = ({ state, descriptors, navigation }) => {
  return (
    <View className="flex-row bg-[#15121E] justify-around items-center py-4 border-t border-[#2A2A2E]">
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = route.name;
        const isFocused = state.index === index;

        let icon = null;

        if (label === 'Home') {
          icon = <FontAwesomeIcon icon={faHome} color={isFocused ? '#ffffff' : '#888589'} size={24} />;
        } else if (label === 'Profile') {
          icon = <FontAwesomeIcon icon={faUser} color={isFocused ? '#ffffff' : '#888589'} size={24} />;
        } else if (label === 'Search') {
          icon = <FontAwesomeIcon icon={faSearch} color={isFocused ? '#ffffff' : '#888589'} size={24} />;
        } else if (label === 'Movies') {
          icon = <FontAwesomeIcon icon={faFilm} color={isFocused ? '#ffffff' : '#888589'} size={24} />;
        } else if (label === 'Videos') {
          icon = <FontAwesomeIcon icon={faVideo} color={isFocused ? '#ffffff' : '#888589'} size={24} />;
        }

        const onPress = () => {
          const event = navigation.emit({ type: 'tabPress', target: route.key });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({ type: 'tabLongPress', target: route.key });
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            className="flex-1 items-center"
          >
            <View className={`p-2 rounded-2xl ${isFocused ? 'bg-[#2C2C36]' : ''}`}>
              {icon}
            </View>
            <Text className={`text-sm mt-1 ${isFocused ? 'text-white font-semibold' : 'text-[#888589]'}`}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TabBar;