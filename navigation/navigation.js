import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Main from '../containers/Main';
import Login from '../containers/login';

const AppNavigator = createStackNavigator(
  {
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