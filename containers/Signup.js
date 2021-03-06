import * as React from 'react';
import { Image, StyleSheet, View, Text, Alert, Picker, SafeAreaView } from 'react-native';
import Button from "../components/Button";
import FormTextInput from "../components/FormTextInput";
import avatar from "../assets/images/avatar.png";
import firebase from "../containers/firebase.js";
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
            gender: "",
            image: avatar,
            role: "",
        }
    }

    render() {
        signUp = (email, pass, name, age, phone, gender, role) => {
            var price = 0, address = '', describe = '', require = '';
            let temp = {
                email: email,
                pass: pass,
                name: name,
                age: age,
                phone: phone,
                gender: gender,
                price: price,
                address: address,
                describe: describe,
                require: require,
                role: role,
            };
            try {
                upLoadImage(this.state.image.uri);
                this.props.navigation.navigate('Uppost', temp);
            }
            catch (err) {
            }
        }

        upLoadImage = async (uri) => {
            const res = await fetch(uri);
            const blob = await res.blob();
            var ref = firebase.storage().ref().child(this.state.email);
            return ref.put(blob);
        }

        return (
            <View style={styles.container}>
                <View style={styles.form}>
                    <TouchableOpacity style={styles.avatarBtn} onPress={this._pickImage}>
                        <Image style={styles.avatarImg} source={this.state.image} />
                        <Text style={{ textAlign: "center" }}>Ảnh Đại Diện</Text>
                    </TouchableOpacity>
                    <FormTextInput
                        value={this.state.email}
                        onChangeText={(email) => this.setState({ email })} 
                        placeholder="Email"
                        keyboardType="email-address"
                        returnKeyType="next"
                        autoCapitalize='none'
                    />
                    <FormTextInput
                        secureTextEntry={true}
                        value={this.state.pass}
                        onChangeText={(pass) => this.setState({ pass })} 
                        placeholder="Mật khẩu"
                        returnKeyType="next"
                    />
                    <FormTextInput
                        secureTextEntry={true}
                        value={this.state.repassword}
                        onChangeText={(repass) => this.setState({ repass })} 
                        placeholder="Nhập lại mật khẩu"
                        returnKeyType="next"
                    />
                    <FormTextInput
                        value={this.state.name}
                        onChangeText={(name) => this.setState({ name })} 
                        placeholder="Họ Tên"
                        returnKeyType="next"
                        autoCapitalize='words'
                    />

                    <View style={{ flexDirection: "row", justifyContent: "space-between" }} >
                        <View style={{ width: "30%" }}>
                            <FormTextInput
                                value={this.state.age}
                                onChangeText={(age) => this.setState({ age })} 
                                placeholder="Tuổi"
                                returnKeyType="next"
                                keyboardType="number-pad"
                            />
                        </View>
                        <View style={{ width: "60%" }}>
                            <FormTextInput
                                value={this.state.phone}
                                onChangeText={(phone) => this.setState({ phone })} 
                                placeholder="Số điện thoại"
                                returnKeyType="next"
                                keyboardType="phone-pad"
                            />
                        </View>
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "space-between" }} >
                        <View style={{ width: "30%" }}>
                            <View style={styles.picker}>
                                <Picker style={styles.pickerItem}
                                    selectedValue={this.state.gender}
                                    onValueChange={(value, index) => {
                                        this.setState({ gender: value })
                                    }}>
                                    <Picker.Item label="Chọn giới tính" color="#C7C7CD" />
                                    <Picker.Item label="Nam" value="Nam" />
                                    <Picker.Item label="Nữ" value="Nữ" />
                                </Picker>
                            </View>
                        </View>
                        <View style={{ width: "60%" }}>
                            <View style={styles.picker}>
                                <Picker style={styles.pickerItem}
                                    selectedValue={this.state.role}
                                    onValueChange={(value, index) => {
                                        this.setState({ role: value })
                                    }}>
                                    <Picker.Item label="Chọn đối tượng" color="#C7C7CD" />
                                    <Picker.Item label="Đã có phòng" value="Đã có phòng" />
                                    <Picker.Item label="Chưa có phòng" value="Chưa có phòng" />
                                </Picker>
                            </View>
                        </View>
                    </View>

                    <Button label="TIẾP THEO" onPress={() => {
                        if (this.state.pass === this.state.repass) {
                            if (this.state.image !== avatar) {
                                if (this.state.gender !== "") {
                                    if (this.state.role !== "") {
                                        signUp(this.state.email, this.state.pass, this.state.name, this.state.age, this.state.phone, this.state.gender, this.state.role);
                                    } else {
                                        alert("Bạn chưa chọn đối tượng");
                                    }
                                } else {
                                    alert("Bạn chưa chọn giới tính");
                                }
                            } else {
                                alert("Vui lòng thay ảnh đại diện");
                            }
                        } else {
                            alert("Mật khẩu không trùng khớp");
                        }
                    }} />
                    <Text style={styles.text}>Đã có tài khoản?</Text>
                    <Button label="ĐĂNG NHẬP" style={styles.signup} onPress={() => this.props.navigation.navigate('Login')} />
                </View>
            </View>
        );
    }

    componentDidMount() {
        this.getPermissionAsync();
    }

    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    };

    _pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });
            if (!result.cancelled) {
                this.setState({ image: result });
            }
            console.log(result);
        } catch (E) {
            console.log(E);
        }
    };
}

const styles = StyleSheet.create({
    avatarBtn: {
        width: 150,
        height: 170,
        alignSelf: "center",
        marginBottom: 20,
    },
    avatarImg: {
        width: 150,
        height: 150,
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
        marginTop: 0,
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
        width: "100%",
    },
    pickerItem: {
        width: "105%",
        alignSelf: "center",
    },
    avatar: {
        backgroundColor: "#FFF",
        borderColor: "#7444C0",
        color: "#7444C0",
    },
});

export default Signup;