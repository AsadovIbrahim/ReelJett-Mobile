import { View } from 'react-native';

const SkeletonCard = ({ isDarkMode }) => (
  <View
    style={{
      width: 120,
      height: 180,
      borderRadius: 10,
      marginRight: 10,
      backgroundColor: isDarkMode ? '#333' : '#ccc',
    }}
  />
);

export default SkeletonCard;
