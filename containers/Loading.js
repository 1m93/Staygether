import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import firebase from 'firebase'
import * as Font from 'expo-font'

let customFonts = {
    'tinderclone': require('../assets/fonts/tinderclone.ttf'),
};

export default class Loading extends React.Component {
    async _loadFontsAsync() {
        await Font.loadAsync(customFonts);
        this.setState({ fontsLoaded: true });
    }
    componentDidMount() {
        this._loadFontsAsync();
        firebase.auth().onAuthStateChanged(user => {
            this.props.navigation.navigate(user ? 'Main' : 'Login');
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Đang tải</Text>
                <ActivityIndicator size="large" color="#7444C0" />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})