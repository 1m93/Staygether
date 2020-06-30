import * as React from 'react';
import { View, StyleSheet, Text, Alert, Picker } from 'react-native';
import Button from "../components/Button";
import FormTextInput from "../components/FormTextInput";
import MultiFormTextInput from "../components/MultiFormTextInput";
import firebase from '../containers/firebase';

export default class Uppost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            price: "",
            address: "",
            describe: "",
            require: "",
            image: null,
            location: "",
            acreage: "",
            roomDescribe: "",
        };
    }
    render() {
        temp = this.props.navigation.state.params;
        email = temp.email;
        pass = temp.pass;
        age = temp.age;
        gender = temp.gender;
        phone = temp.phone;
        name = temp.name;
        role = temp.role;
        uppost = (address, describe, price, require, location, roomDescribe, acreage, status) => {
            price = price.replace(/,/g, '');
            let id = email.replace(/\./g, ',');
            firebase.storage().ref().child(email).getDownloadURL().then(function (url) {
                console.log(url);
                try {
                    firebase.database().ref('UsersData/' + id).set({
                        email,
                        name,
                        age,
                        phone,
                        gender,
                        address,
                        describe,
                        price,
                        require,
                        url,
                        location,
                        role,
                        roomDescribe,
                        acreage,
                        status,
                    })
                } catch (err) {
                    console.log(err);
                }
            });
            try {
                firebase.auth().createUserWithEmailAndPassword(email, pass).then(() => {
                    this.props.navigation.navigate('Main')
                }).catch(error => {
                    alert(error.message);
                })
            }
            catch (err) {
                Alert.alert('Sign in Failed')
            }
        }

        return (
            <View style={styles.container}>
                <View style={styles.form}>
                    <Text style={styles.text1}>THÔNG TIN BỔ SUNG</Text>

                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <View style={{ width: "30%" }}>
                            <FormTextInput
                                onChangeText={((value) => {
                                    value = value.replace(/,/g, '');
                                    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                    this.setState({
                                        price: value
                                    })
                                })}
                                value={this.state.price}
                                placeholder="Giá (VND)"
                                keyboardType="number-pad"
                                returnKeyType="next"
                            />
                        </View>
                        <View style={{ width: "60%" }}>
                            <View style={styles.picker}>
                                <Picker style={styles.pickerItem}
                                    selectedValue={this.state.location}
                                    onValueChange={(value, index) => {
                                        this.setState({ location: value })
                                    }}>
                                    <Picker.Item label="Chọn khu vực" color="#C7C7CD" />
                                    <Picker.Item label="Quận Ba Đình" value="Quận Ba Đình" />
                                    <Picker.Item label="Quận Hoàn Kiếm" value="Quận Hoàn Kiếm" />
                                    <Picker.Item label="Quận Tây Hồ" value="Quận Tây Hồ" />
                                    <Picker.Item label="Quận Long Biên" value="Quận Long Biên" />
                                    <Picker.Item label="Quận Cầu Giấy" value="Quận Cầu Giấy" />
                                    <Picker.Item label="Quận Đống Đa" value="Quận Đống Đa" />
                                    <Picker.Item label="Quận Hai Bà Trưng" value="Quận Hai Bà Trưng" />
                                    <Picker.Item label="Quận Hoàng Mai" value="Quận Hoàng Mai" />
                                    <Picker.Item label="Quận Thanh Xuân" value="Quận Thanh Xuân" />
                                    <Picker.Item label="Huyện Sóc Sơn" value="Huyện Sóc Sơn" />
                                    <Picker.Item label="Huyện Đông Anh" value="Huyện Đông Anh" />
                                    <Picker.Item label="Huyện Gia Lâm" value="Huyện Gia Lâm" />
                                    <Picker.Item label="Quận Nam Từ Liêm" value="Quận Nam Từ Liêm" />
                                    <Picker.Item label="Huyện Thanh Trì" value="Huyện Thanh Trì" />
                                    <Picker.Item label="Quận Bắc Từ Liêm" value="Quận Bắc Từ Liêm" />
                                    <Picker.Item label="Huyện Mê Linh" value="Huyện Mê Linh" />
                                    <Picker.Item label="Quận Hà Đông" value="Quận Hà Đông" />
                                    <Picker.Item label="Thị xã Sơn Tây" value="Thị xã Sơn Tây" />
                                    <Picker.Item label="Huyện Ba Vì" value="Huyện Ba Vì" />
                                    <Picker.Item label="Huyện Phúc Thọ" value="Huyện Phúc Thọ" />
                                    <Picker.Item label="Huyện Đan Phượng" value="Huyện Đan Phượng" />
                                    <Picker.Item label="Huyện Hoài Đức" value="Huyện Hoài Đức" />
                                    <Picker.Item label="Huyện Quốc Oai" value="Huyện Quốc Oai" />
                                    <Picker.Item label="Huyện Thạch Thất" value="Huyện Thạch Thất" />
                                    <Picker.Item label="Huyện Chương Mỹ" value="Huyện Chương Mỹ" />
                                    <Picker.Item label="Huyện Thanh Oai" value="Huyện Thanh Oai" />
                                    <Picker.Item label="Huyện Thường Tín" value="Huyện Thường Tín" />
                                    <Picker.Item label="Huyện Phú Xuyên" value="Huyện Phú Xuyên" />
                                    <Picker.Item label="Huyện Ứng Hòa" value="Huyện Ứng Hòa" />
                                    <Picker.Item label="Huyện Mỹ Đức" value="Huyện Mỹ Đức" />
                                </Picker>
                            </View>
                        </View>
                    </View>

                    <FormTextInput
                        value={this.state.address}
                        onChangeText={(address) => this.setState({ address })}
                        placeholder="Địa chỉ"
                        returnKeyType="next"
                    />
                    {
                        role == "Đã có phòng" &&
                        <View>
                            <FormTextInput
                                value={this.state.acreage}
                                onChangeText={(acreage) => this.setState({ acreage })} 
                                placeholder="Diện tích phòng (m2)"
                                returnKeyType="next"
                                keyboardType="number-pad"
                            />
                            <MultiFormTextInput
                                value={this.state.roomDescribe}
                                onChangeText={(roomDescribe) => this.setState({ roomDescribe })} 
                                placeholder="Mô tả phòng"
                                returnKeyType="next"
                            />
                        </View>
                    }
                    <MultiFormTextInput
                        value={this.state.describe}
                        onChangeText={(describe) => this.setState({ describe })} 
                        placeholder="Mô tả bản thân"
                        returnKeyType="next"
                    />
                    <MultiFormTextInput
                        value={this.state.require}
                        onChangeText={(require) => this.setState({ require })} 
                        placeholder="Yêu cầu"
                        returnKeyType="next"
                    />
                    <Button label="HOÀN TẤT" onPress={() => {
                        if (this.state.location !== "") {
                            uppost(this.state.address, this.state.describe, this.state.price, this.state.require, this.state.location, this.state.roomDescribe, this.state.acreage, "open");
                        } else {
                            alert("Bạn chưa chọn khu vực");
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
        fontSize: 30,
        marginBottom: 40,
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