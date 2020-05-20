import React from "react";
import { Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import styles from "./assets/styles";
import HomeScreen from "./containers/Home";
import MatchesScreen from "./containers/Matches";
import MessagesScreen from "./containers/Messages";
import ProfileScreen from "./containers/Profile";
import Icon from "./components/Icon";
import { NavigationContainer, TabActions } from "@react-navigation/native";
import { useFonts } from '@use-expo/font';
import { AppLoading } from "expo";

const Tab = createBottomTabNavigator();

export default App => {
  let [fontsLoaded] = useFonts({
    'tinderclone': require('./assets/fonts/tinderclone.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = "explore";
            } else if (route.name === 'Profile') {
              iconName = "user";
            } else if (route.name === 'Matches') {
              iconName = "heart";
            } else if (route.name === 'Messages') {
              iconName = "chat";
            };
            const iconFocused = focused ? "#7444C0" : "#363636";
            // You can return any component that you like here!
            return (
              <Text style={[styles.iconMenu, { color: iconFocused }]}>
                <Icon name={iconName} />
              </Text>
            );
          },
        })}
        tabBarOptions={{
          activeTintColor: "#7444C0",
          inactiveTintColor: "#363636",
          labelStyle: {
            fontSize: 14,
            textTransform: "uppercase",
            paddingTop: 10
          },
          style: {
            backgroundColor: "#FFF",
            borderTopWidth: 0,
            paddingVertical: 30,
            height: 50,
            marginBottom: 0,
            shadowOpacity: 0.05,
            shadowRadius: 10,
            shadowColor: "#000",
            shadowOffset: { height: 0, width: 0 }
          }
        }}

      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Matches" component={MatchesScreen} />
        <Tab.Screen name="Messages" component={MessagesScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}