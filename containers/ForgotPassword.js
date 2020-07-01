import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import Button from "../components/Button";
import FormTextInput from "../components/FormTextInput";
import firebase from '../containers/firebase';
import { RFValue } from 'react-native-responsive-fontsize';

class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        temp = this.props.navigation.state.params;
        this.state = {
            email: temp.email,
        };
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.form}>
                    <Text style={styles.text1}>QUÊN MẬT KHẨU?</Text>
                    <Text style={{ marginBottom: 10, fontSize: RFValue(12) }}>Nhập Email:</Text>
                    <FormTextInput
                        value={this.state.email}
                        onChangeText={(email) => this.setState({ email })}
                        placeholder="Email"
                        keyboardType="email-address"
                        returnKeyType="next"
                        onSubmitEditing={this.handleEmailSubmitPress}
                        autoCapitalize='none'
                    />
                    <View style={{ marginTop: 30 }}>
                        <Button label="GỬI EMAIL" onPress={() => {
                            try {
                                firebase.auth().sendPasswordResetEmail(this.state.email).then(() => {
                                    alert("Chúng tôi đã gửi cho bạn email để đặt lại mật khẩu tài khoản của mình, hãy kiểm tra hộp thư của bạn ngay");
                                    this.props.navigation.navigate('Login');
                                })
                            } catch (err) {
                                alert(err);
                            }
                        }} />
                        <Button label="QUAY LẠI" style={styles.signup} onPress={() => this.props.navigation.navigate('Login')} />
                    </View>
                </View>
            </View>
        )
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
    },
    text1: {
        fontSize: RFValue(22),
        marginBottom: 60,
        color: "#7444C0"
    },
});

export default ForgotPassword;