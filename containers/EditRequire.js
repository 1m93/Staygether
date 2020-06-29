import * as React from 'react';
import { View, StyleSheet, Text, Alert, Picker } from 'react-native';
import Button from "../components/Button";
import FormTextInput from "../components/FormTextInput";
import MultiFormTextInput from "../components/MultiFormTextInput";
import firebase from '../containers/firebase';
import { ScrollView } from 'react-native-gesture-handler';

export default class EditRequire extends React.Component {
    constructor(props) {
        super(props);
        temp = this.props.navigation.state.params;
        this.state = {
            email: temp.email,
            role: temp.role,
            price: temp.price,
            location: temp.location,
            address: temp.address,
            describe: temp.describe,
            require: temp.require,
            acreage: temp.acreage,
            roomDescribe: temp.roomDescribe,
        };
    }

    render() {

        changeRequire = () => {
            let id = this.state.email.replace('.', ',');
            try {
                firebase.database().ref('UsersData/' + id).update({
                    email: this.state.email,
                    role: this.state.role,
                    price: this.state.price,
                    location: this.state.location,
                    address: this.state.address,
                    describe: this.state.describe,
                    require: this.state.require,
                    acreage: this.state.acreage,
                    roomDescribe: this.state.roomDescribe,
                }).then(() => {
                    alert('Cập nhật thông tin thành công');
                    this.props.navigation.goBack();
                })
            } catch (err) {
                alert(err);
            };
        }

        return (
            <View style={styles.container}>
                <View style={styles.form}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <View style={{ width: "45%" }}>
                            <Text style={{ color: "gray" }}>Loại người dùng:</Text>
                            <View style={styles.picker}>
                                <Picker style={styles.pickerItem}
                                    selectedValue={this.state.role}
                                    onValueChange={(value, index) => {
                                        this.setState({ role: value })
                                    }}>
                                    <Picker.Item label="Đã có phòng" value="Đã có phòng" />
                                    <Picker.Item label="Chưa có phòng" value="Chưa có phòng" />
                                </Picker>
                            </View>
                        </View>

                        <View style={{ width: "45%" }}>
                            <Text style={{ color: "gray" }}>Khu vực:</Text>
                            <View style={styles.picker}>
                                <Picker style={styles.pickerItem}
                                    selectedValue={this.state.location}
                                    onValueChange={(value, index) => {
                                        this.setState({ location: value })
                                    }}>
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

                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <View style={{ width: "65%" }}>
                            <Text style={{ color: "gray" }}>Điạ chỉ:</Text>
                            <FormTextInput
                                value={this.state.address}
                                onChangeText={(address) => this.setState({ address })} value={this.state.address}
                                returnKeyType="next"
                            />
                        </View>

                        <View style={{ width: "25%" }}>
                            <Text style={{ color: "gray" }}>Giá (VND):</Text>
                            <FormTextInput
                                value={this.state.price}
                                onChangeText={(price) => this.setState({ price })} value={this.state.price}
                                keyboardType="number-pad"
                                returnKeyType="next"
                            />
                        </View>
                    </View>

                    <Text style={{ color: "gray" }}>Mô tả bản thân:</Text>
                    <MultiFormTextInput
                        value={this.state.describe}
                        onChangeText={(describe) => this.setState({ describe })} value={this.state.describe}
                        returnKeyType="next"
                    />

                    <Text style={{ color: "gray" }}>Yêu cầu:</Text>
                    <MultiFormTextInput
                        value={this.state.require}
                        onChangeText={(require) => this.setState({ require })} value={this.state.require}
                        returnKeyType="next"
                    />

                    {
                        this.state.role == "Đã có phòng" &&
                        <View>
                            <Text style={{ color: "gray" }}>Diện tích phòng (m2):</Text>
                            <FormTextInput
                                value={this.state.acreage}
                                onChangeText={(acreage) => this.setState({ acreage })} value={this.state.acreage}
                                returnKeyType="next"
                                keyboardType="number-pad"
                            />

                            <Text style={{ color: "gray" }}>Mô tả phòng:</Text>
                            <MultiFormTextInput
                                value={this.state.roomDescribe}
                                onChangeText={(roomDescribe) => this.setState({ roomDescribe })} value={this.state.roomDescribe}
                                returnKeyType="next"
                            />
                        </View>
                    }

                    <View style={{ marginTop: 0 }}>
                        <Button label="LƯU THAY ĐỔI" onPress={() => {
                            changeRequire()
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
        fontSize: 30,
        marginBottom: 30,
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