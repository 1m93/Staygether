import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Dimensions, TextInput } from 'react-native';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';

export default class Map extends React.Component {
    state = {
        location: null,
        errorMsg: null,
    }
    componentDidMount() {
        this.getLocation();
    };
    async getLocation() {
        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
            this.setState({
                errorMsg: 'Permission to access location was denied'
            });
        }
        let location = await Location.getCurrentPositionAsync({});
        this.setState({
            location: location
        });
    }
    render() {
        Location.setApiKey("AIzaSyB2fH5glgpRMqttRtpIkbKGwMcOg8Sstb4");
        let text = 'Waiting..';
        if (this.state.errorMsg) {
            text = this.state.errorMsg;
        } else if (this.state.location) {
            text = JSON.stringify(this.state.location);
            obj = JSON.parse(text);
            console.log(obj.coords);
            if (this.state.location !== null) {
                console.log(text);
                lct = {
                    latitude: Number(obj.coords.latitude),
                    longitude: Number(obj.coords.longitude),
                }
                Location.reverseGeocodeAsync(lct).then(function (address) {
                    console.log(address[0]);
                });
            }
        }

        return (
            <View style={styles.container}>
                {
                    this.state.location === null ?
                        <Text>Vui lòng chờ...</Text> :
                        <View style={styles.container}>
                            <MapView
                                style={styles.mapStyle}
                                initialRegion={{
                                    latitude: obj.coords.latitude,
                                    longitude: obj.coords.longitude,
                                    latitudeDelta: 0.00922,
                                    longitudeDelta: 0.00421
                                }}
                                showsUserLocation={true}
                            >
                            </MapView>
                            <TextInput
                                style={styles.input}
                            />
                        </View>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
    },
    mapStyle: {
        ...StyleSheet.absoluteFillObject,
    },
    input: {
        height: 40,
        borderWidth: 1,
        marginTop: 25,
        marginRight:5,
        marginLeft: 5,
        padding: 5,
        backgroundColor: "#FFF",
    }
});