import * as React from 'react';
import { Image, StyleSheet, View, Text, Alert } from 'react-native';
import Button from "../components/Button";
import FormTextInput from "../components/FormTextInput";
import logo from "../assets/images/logo.png";
import * as Facebook from 'expo-facebook'
import firebase from './firebase.js';
import * as Font from 'expo-font';

Facebook.initializeAsync('550967015812950', 'Staygether')

let customFonts = {
    'tinderclone': require('../assets/fonts/tinderclone.ttf'),
};

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "test1@gmail.com",
            pass: "123456",
        };
        this.FormTextInput = React.createRef();
    }
    async _loadFontsAsync() {
        await Font.loadAsync(customFonts);
        this.setState({ fontsLoaded: true });
    }
    componentDidMount() {
        this._loadFontsAsync();
    }
    handleEmailSubmitPress = () => {
        if (this.FormTextInput.current) {
            this.FormTextInput.current.focus();
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <Image source={logo} style={styles.logo} />
                <View style={styles.form}>
                    <FormTextInput
                        value={this.state.email}
                        onChangeText={(email) => this.setState({ email })} value={this.state.email}
                        placeholder="Email"
                        keyboardType="email-address"
                        returnKeyType="next"
                        onSubmitEditing={this.handleEmailSubmitPress}
                        autoCapitalize='none'
                    />
                    <FormTextInput
                        ref={this.FormTextInput}
                        secureTextEntry={true}
                        value={this.state.password}
                        onChangeText={(pass) => this.setState({ pass })} value={this.state.pass}
                        placeholder="Mật khẩu"
                        returnKeyType="done"
                        onSubmitEditing={() => this.logIn(this.state.email, this.state.pass)}
                    />
                    <Button label="ĐĂNG NHẬP" onPress={() => this.logIn(this.state.email, this.state.pass)} />
                    <Button label="ĐĂNG NHẬP VỚI FACEBOOK" style={styles.fblogin} onPress={() => this.logFB()} />
                    <Text style={styles.text}>Chưa có tài khoản?</Text>
                    <Button label="ĐĂNG KÝ" style={styles.signup} onPress={() => this.props.navigation.navigate('Signup')} />
                </View>
            </View>
        );
    }


    logIn = (email, pass) => {
        try {
            firebase.auth().signInWithEmailAndPassword(email, pass).then(() => {
                this.props.navigation.navigate('Main');
            }).catch((err) => {
                alert(err.message);
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

const styles = StyleSheet.create({
    logo: {
        flex: 1,
        width: "60%",
        resizeMode: "contain",
        alignSelf: "center"
    },
    container: {
        flex: 1,
        backgroundColor: "#FFF",
        alignItems: "center",
        justifyContent: "space-between",
    },
    form: {
        flex: 1,
        justifyContent: "center",
        width: "80%",
    },
    fblogin: {
        backgroundColor: "#1778F2",
    },
    signup: {
        backgroundColor: "#FFF",
        borderColor: "#7444C0",
        color: "#7444C0",
    },
    text: {
        textAlign: "center",
        marginTop: 20,
        marginBottom: 10
    }
});

export default Login;