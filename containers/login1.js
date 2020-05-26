import React, { Component } from "react";

import styles from "./style";
import { Keyboard, Text, View, TextInput, TouchableWithoutFeedback, Alert, KeyboardAvoidingView } from 'react-native';
import { Button } from 'react-native-elements';
import * as Facebook from 'expo-facebook'
import firebase from './firebase.js'
import * as Font from 'expo-font';


Facebook.initializeAsync('550967015812950', 'Staygether')

let customFonts = {
  'tinderclone': require('../assets/fonts/tinderclone.ttf'),
};

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      pass: "",
    };
  }
  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.containerView} behavior="padding">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.loginScreenContainer}>
            <View style={styles.loginFormView}>
              <Text style={styles.logoText}>Staygether</Text>
              <TextInput
                placeholder="Email"
                placeholderColor="#c4c3cb"
                style={styles.loginFormTextInput}
                onChangeText={(email) => this.setState({ email })} value={this.state.email}
              />
              <TextInput
                placeholder="Password"
                placeholderColor="#c4c3cb"
                style={styles.loginFormTextInput}
                secureTextEntry={true}
                onChangeText={(pass) => this.setState({ pass })} value={this.state.pass}
              />
              <Button
                buttonStyle={styles.loginButton}
                onPress={() => this.log(this.state.email, this.state.pass)}
                title="Login"
              />
              <Button
                buttonStyle={styles.loginButton}
                onPress={() => this.sign(this.state.email, this.state.pass)}
                title="Signin"
              />
              <Button
                buttonStyle={styles.fbLoginButton}
                onPress={() => this.logFB()}
                title="Login with Facebook"
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }


  log = (email, pass) => {
    try {
      firebase.auth().createUserWithEmailAndPassword(email, pass).catch(error => {
        alert(error.message);
      })

    }
    catch (err) {
      Alert.alert('Sign in Failed')
    }
  }

  sign = (email, pass) => {
    try {
      firebase.auth().signInWithEmailAndPassword(email, pass).then(() => {
        this.props.navigation.navigate('Uppost');
      }).catch(error => {
        alert(error.message);
      })
    }
    catch (err) {
      console.log(err)
    }
  }

  async logFB() {
    const { type, token } = await Facebook.logInWithReadPermissionsAsync(
      '550967015812950',
      {
        permissions: ["public_profile"]
      }
    );
    if (type == 'success') {
      const check = firebase.auth().FacebookAuthProvider.credential(token)
      firebase.auth().signInWithCredential(check).catch((err) => {
        console.log(err)
      })
    }
  }
}
