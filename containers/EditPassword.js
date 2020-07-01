import * as React from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import Button from "../components/Button";
import FormTextInput from "../components/FormTextInput";
import firebase from '../containers/firebase';
import { RFValue } from 'react-native-responsive-fontsize';

export default class EditPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            oldPass: '',
            newPass: '',
            newRePass: '',
        };
    }
    
    render() {
        changePass = (oldPass, newPass) => {
            var user = firebase.auth().currentUser;
            var cred = firebase.auth.EmailAuthProvider.credential(user.email, oldPass);
            user.reauthenticateWithCredential(cred).then(() => {
                var user = firebase.auth().currentUser;
                user.updatePassword(newPass).then(() => {
                    alert("Đổi mật khẩu thành công");
                    this.props.navigation.goBack();
                }).catch((error) => { alert(error) });
            }).catch((error) => { alert(error) });
        }

        return (
            <View style={styles.container}>
                <View style={styles.form}>
                    <Text style={styles.text1}>THAY ĐỔI MẬT KHẨU</Text>
                    <FormTextInput
                        value={this.state.oldPass}
                        onChangeText={(oldPass) => this.setState({ oldPass })}
                        placeholder="Nhập mật khẩu cũ"
                        keyboardType="password"
                        returnKeyType="next"
                    />
                    <FormTextInput
                        value={this.state.newPass}
                        onChangeText={(newPass) => this.setState({ newPass })} 
                        placeholder="Nhập mật khẩu mới"
                        keyboardType="password"
                        returnKeyType="next"
                    />
                    <FormTextInput
                        value={this.state.newRePass}
                        onChangeText={(newRePass) => this.setState({ newRePass })} 
                        placeholder="Nhập lại mật khẩu mới"
                        keyboardType="password"
                        returnKeyType="next"
                    />
                    <View style={{ marginTop: 30 }}>
                        <Button label="LƯU" onPress={() => {
                            if (this.state.newPass == this.state.newRePass) {
                                changePass(this.state.oldPass, this.state.newPass)
                            } else {
                                alert("Nhập lại mật khẩu chưa trùng khớp")
                            }
                        }} />
                        <Button label="HỦY" style={styles.signup} onPress={() => this.props.navigation.goBack()} />
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
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
    signup: {
        backgroundColor: "#FFF",
        borderColor: "#7444C0",
        color: "#7444C0",
    },
    text1: {
        fontWeight: "bold",
        fontSize: RFValue(23),
        marginBottom: 60,
        textAlign: "center",
        color: "#7444C0"
    },
    picker: {
        height: 40,
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginBottom: 20,
        width: "100%",
    },
    pickerItem: {
        width: "105%",
        alignSelf: "center",
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
})