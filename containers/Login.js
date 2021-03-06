import * as React from 'react';
import { Image, StyleSheet, View, Text, Alert, TouchableOpacity } from 'react-native';
import Button from "../components/Button";
import FormTextInput from "../components/FormTextInput";
import logo from "../assets/images/logo.png";
import firebase from './firebase.js';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            pass: "",
        };
        this.FormTextInput = React.createRef();
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
                        onChangeText={(email) => this.setState({ email })} 
                        placeholder="Email"
                        keyboardType="email-address"
                        returnKeyType="next"
                        onSubmitEditing={this.handleEmailSubmitPress}
                        autoCapitalize='none'
                        autoCompleteType="email"
                    />
                    <FormTextInput
                        ref={this.FormTextInput}
                        secureTextEntry={true}
                        value={this.state.password}
                        onChangeText={(pass) => this.setState({ pass })} 
                        placeholder="Mật khẩu"
                        returnKeyType="done"
                        onSubmitEditing={() => this.logIn(this.state.email, this.state.pass)}
                        autoCompleteType="password"
                    />
                    <Button label="ĐĂNG NHẬP" onPress={() => this.logIn(this.state.email, this.state.pass)} />
                    <TouchableOpacity onPress={() => {
                        let temp = {
                            email: this.state.email
                        }
                        this.props.navigation.navigate('ForgotPassword', temp)
                    }}>
                        <Text style={{textAlign: "center", color: "#7444C0"}}>Quên mật khẩu</Text>
                    </TouchableOpacity>
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