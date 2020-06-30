import React, { Component } from "react";
import { Text, Alert, View, Button, Vibration, Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import styles from "../assets/styles";
import HomeScreen from "./Home";
import MatchesScreen from "./Matches";
import MessagesScreen from "./Messages";
import UserScreen from "./User";
import Icon from "../components/Icon";
import firebase from '../containers/firebase';
import { NavigationContainer, TabActions } from "@react-navigation/native";
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

const Tab = createBottomTabNavigator();

class Main extends React.Component {
    state = { 
        currentUser: firebase.auth().currentUser,
        expoPushToken: '',
        notification: {}, 
    }
    registerForPushNotificationsAsync = async () => {
        if (Constants.isDevice) {
          const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
          let finalStatus = existingStatus;
          if (existingStatus !== 'granted') {
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
          }
          if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
          }
          token = await Notifications.getExpoPushTokenAsync();
          console.log(token);
          this.setState({ expoPushToken: token });
        } else {
          alert('Must use physical device for Push Notifications');
        }
    
        if (Platform.OS === 'android') {
          Notifications.createChannelAndroidAsync('default', {
            name: 'default',
            sound: true,
            priority: 'max',
            vibrate: [0, 250, 250, 250],
          });
        }
        var id = this.state.currentUser.email.replace(/\./g, ',');
        firebase.database().ref('UsersData/' + id + '/token').set(token).then(()=>{
            console.log('haylam')
        })
    };
    
    componentDidMount() {
        this.registerForPushNotificationsAsync();
        // Handle notifications that are received or selected while the app
        // is open. If the app was closed and then opened by tapping the
        // notification (rather than just tapping the app icon to open it),
        // this function will fire on the next tick after the app starts
        // with the notification data.
        this._notificationSubscription = Notifications.addListener(this._handleNotification);
    }
    
    _handleNotification = notification => {
        Vibration.vibrate();
        console.log(notification);
        this.setState({ notification: notification });
    };

    render() {
        const { currentUser } = this.state
        return (
            <NavigationContainer>
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused }) => {
                            let iconName;

                            if (route.name === 'Trang chủ') {
                                iconName = "explore";
                            } else if (route.name === 'Cá nhân') {
                                iconName = "user";
                            } else if (route.name === 'Quan tâm') {
                                iconName = "heart";
                            } else if (route.name === 'Tin nhắn') {
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
                            paddingVertical: 20,
                            height: 50,
                            marginBottom: 0,
                            shadowOpacity: 0.05,
                            shadowRadius: 10,
                            shadowColor: "#000",
                            shadowOffset: { height: 0, width: 0 }
                        }
                    }}

                >
                    <Tab.Screen name="Trang chủ" component={HomeScreen} />
                    <Tab.Screen name="Quan tâm">
                        {() => <MatchesScreen myProp={this.props} />}
                    </Tab.Screen>
                    <Tab.Screen name="Tin nhắn" > 
                        {() => <MessagesScreen myProps={this.props} />}
                    </Tab.Screen>
                    <Tab.Screen name="Cá nhân">
                        {() => <UserScreen myProp2={this.props} />}
                    </Tab.Screen>
                </Tab.Navigator>
            </NavigationContainer>
        );
    }
}

export default Main;