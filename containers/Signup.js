import * as React from 'react';
import { Image, StyleSheet, View, Text, Alert, Picker } from 'react-native';
import Button from "../components/Button";
import FormTextInput from "../components/FormTextInput";
import logo from "../assets/images/logo.png";
import firebase from "../containers/firebase.js"

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            pass: "",
            repass: "",
            name: "",
            age: "",
            phone: "",
            gender: "nam",
        }
    }

    render() {
        log = (email, pass, name, age, phone, gender) => {
            try {
                firebase.auth().createUserWithEmailAndPassword(email, pass).then(() => {
                    this.props.navigation.navigate('Uppost')
                }).catch(error => {
                    alert(error.message);
                })
                firebase.database().ref('UsersData/').push({
                    email,
                    name,
                    age,
                    phone,
                    gender,
                }).catch((error) => {
                    console.log('error ', error)
                })
            }
            catch (err) {
                Alert.alert('Sign in Failed')
            }
        }

        return (
            <View style={styles.container}>
                <View style={styles.form}>
                    <Image source={logo} style={styles.logo} />
                    <FormTextInput
                        value={this.state.email}
                        onChangeText={(email) => this.setState({ email })} value={this.state.email}
                        placeholder="Email"
                        keyboardType="email-address"
                        returnKeyType="next"
                    />
                    <FormTextInput
                        secureTextEntry={true}
                        value={this.state.pass}
                        onChangeText={(pass) => this.setState({ pass })} value={this.state.pass}
                        placeholder="Mật khẩu"
                        returnKeyType="next"
                    />
                    <FormTextInput
                        secureTextEntry={true}
                        value={this.state.repassword}
                        onChangeText={(repass) => this.setState({ repass })} value={this.state.repass}
                        placeholder="Nhập lại mật khẩu"
                        returnKeyType="next"
                    />
                    <FormTextInput
                        value={this.state.name}
                        onChangeText={(name) => this.setState({ name })} value={this.state.name}
                        placeholder="Họ Tên"
                        returnKeyType="next"
                    />
                    <FormTextInput
                        value={this.state.age}
                        onChangeText={(age) => this.setState({ age })} value={this.state.age}
                        placeholder="Tuổi"
                        returnKeyType="next"
                        keyboardType="number-pad"
                    />
                    <FormTextInput
                        value={this.state.phone}
                        onChangeText={(phone) => this.setState({ phone })} value={this.state.phone}
                        placeholder="Số điện thoại"
                        returnKeyType="next"
                        keyboardType="phone-pad"
                    />
                    <View>
                        <Picker style={styles.picker}
                            selectedValue={this.state.gender}
                            onValueChange={(value, index) => {
                                this.setState({ gender: value })
                            }}>
                            <Picker.Item label="Nam" value="Nam" />
                            <Picker.Item label="Nữ" value="Nữ" />
                        </Picker>
                    </View>
                    <Button label="ĐĂNG KÝ" onPress={() => {
                        if (this.state.pass === this.state.repass) {
                            log(this.state.email, this.state.pass, this.state.name, this.state.age, this.state.phone, this.state.gender);
                            alert('Đăng ký thành công');
                        } else {
                            alert('Mật khẩu không trùng khớp');
                        }
                    }} />
                    <Text style={styles.text}>Đã có tài khoản?</Text>
                    <Button label="ĐĂNG NHẬP" style={styles.signup} onPress={() => this.props.navigation.navigate('Login')} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    logo: {
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
        marginTop: -40,
    },
    text: {
        textAlign: "center",
        marginTop: 20,
        marginBottom: 10
    },
    signup: {
        backgroundColor: "#FFF",
        borderColor: "#7444C0",
        color: "#7444C0",
    },
    picker: {
        height: 40,
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginBottom: 20,
    },
});

export default Signup;