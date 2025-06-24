import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileStack from './ProfileStack';
import HomeStack from './HomeStack';
import TabBar from './components/TabBar';
import SearchStack from './SearchStack';
import ProfessionalMovieStack from './ProfessionalMovieStack';
import PersonalMovieStack from './PersonalMovieStack';

const Tab = createBottomTabNavigator();

const TabStack = () => {
  return (
    <Tab.Navigator
      tabBar={
        ({ state , navigation }:any) =>
          <TabBar
            state={state}
            navigation={navigation}
          />
      }
      screenOptions={{ headerShown: false }}>
      <Tab.Screen name='Home' component={HomeStack} />
      <Tab.Screen name='Movies' component={ProfessionalMovieStack} />
      <Tab.Screen name='Videos' component={PersonalMovieStack} />
      <Tab.Screen name='Search' component={SearchStack} />
      <Tab.Screen name='Profile' component={ProfileStack} />
    </Tab.Navigator>
  )
}

export default TabStack