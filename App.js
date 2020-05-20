import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Main from './containers/Main';
import Login from './containers/login';

const App = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: {
        headerShown: false,
      }
    },
    Main: {
      screen: Main,
      navigationOptions: {
        headerShown: false,
      }
    }
  },
  {
    initialRouteName: "Login"
  }
);

export default createAppContainer(App);