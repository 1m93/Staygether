import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Main from './containers/Main';
import Login from './containers/Login';
import Uppost from './containers/Uppost';
import Signup from './containers/Signup';
import Home from './containers/Home';
import Matches from './containers/Matches';
import Profile from './containers/Profile';
import User from './containers/User';
import Chat from './containers/Chat';
import Loading from './containers/Loading';

console.disableYellowBox = true;

const mainStack = createStackNavigator(
    {
        Main: {
            screen: Main,
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
        Home: {
            screen: Home,
            navigationOptions: {
                headerShown: false,
            }
        },
    }
);

const App = createSwitchNavigator(
    {
        Loading: {
            screen: Loading,
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
        Login: {
            screen: Login,
            navigationOptions: {
                headerShown: false,
            }
        },
        mainStack: mainStack,
    },
    {
        initialRouteName: "Loading"
    }
);

export default createAppContainer(App);