import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Main from './containers/Main';
import Login from './containers/Login';
import Uppost from './containers/Uppost';
import Signup from './containers/Signup';
import Home from './containers/Home';
import Matches from './containers/Matches';
import Profile from './containers/Profile';
import Map from './containers/Map';
import User from './containers/User';
import Chat from './containers/Chat'

console.disableYellowBox = true;

const App = createStackNavigator(
  {
    Map: {
      screen: Map,
      navigationOptions: {
        headerShown: false,
      }
    },
    Chat: {
      screen: Chat,
      
    },
    Matches: {
      screen: Matches,
      navigationOptions: {
        headerShown: false,
      }
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        headerShown: false,
      }
    },
    User: {
      screen: User,
      navigationOptions: {
        headerShown: false,
      }
    },
    Signup: {
      screen: Signup,
      navigationOptions: {
        headerShown: false,
      }
    },
    Uppost: {
      screen: Uppost,
      navigationOptions: {
        headerShown: false,
      }
    },
    Home: {
      screen: Home,
      navigationOptions: {
        headerShown: false,
      }
    },
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