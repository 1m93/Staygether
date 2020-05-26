import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Main from '../containers/Main';
import Login from '../containers/Login';
import Uppost from '../containers/Uppost';

const AppNavigator = createStackNavigator(
  {
    Uppost: {
      screen: Uppost,
      navigationOptions: () => ({
          title: 'Uppost',
      })
    },
    Login: {
      screen: Login,
      navigationOptions: () => ({
        title: 'Login',
      })
    },
    Main: {
      screen: Main,
      navigationOptions: () => ({
        title: 'Main',
      })
    }
  },
  {
    initialRouteName: "Login"
  }
);

export default createAppContainer(AppNavigator);