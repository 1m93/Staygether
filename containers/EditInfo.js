import * as React from 'react';
import { View, StyleSheet, Text, Alert, Picker } from 'react-native';
import Button from "../components/Button";
import FormTextInput from "../components/FormTextInput";
import firebase from '../containers/firebase';
import { RFValue } from 'react-native-responsive-fontsize';

export default class EditInfo extends React.Component {
    constructor(props) {
        super(props);
        temp = this.props.navigation.state.params;
        this.state = {
            email: temp.email,
            name: temp.name,
            age: temp.age,
            gender: temp.gender,
            phone: temp.phone,
        };
    }

    render() {

        changeInfo = () => {
            let id = this.state.email.replace(/\./g, ',');
            try {
                firebase.database().ref('UsersData/' + id).update({
                    name: this.state.name,
                    age: this.state.age,
                    phone: this.state.phone,
                    gender: this.state.gender,
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
                    <Text style={{ color: "gray", fontSize: RFValue(12) }}>Họ và tên:</Text>
                    <FormTextInput
                        value={this.state.name}
                        onChangeText={(name) => this.setState({ name })}
                        returnKeyType="next"
                        autoCapitalize='words'
                    />

                    <View style={{ flexDirection: "row", justifyContent: "space-between" }} >
                        <View style={{ width: "45%" }} >
                            <Text style={{ color: "gray", fontSize: RFValue(12) }}>Tuổi:</Text>
                            <FormTextInput
                                value={this.state.age}
                                onChangeText={(age) => this.setState({ age })}
                                returnKeyType="next"
                                keyboardType="number-pad"
                            />
                        </View>

                        <View style={{ width: "45%" }}>
                            <Text style={{ color: "gray", fontSize: RFValue(12) }}>Giới tính:</Text>
                            <View style={styles.picker}>
                                <Picker style={styles.pickerItem}
                                    selectedValue={this.state.gender}
                                    onValueChange={(value, index) => {
                                        this.setState({ gender: value })
                                    }}>
                                    <Picker.Item label="Nam" value="Nam" />
                                    <Picker.Item label="Nữ" value="Nữ" />
                                </Picker>
                            </View>
                        </View>
                    </View>

                    <Text style={{ color: "gray", fontSize: RFValue(12) }}>Số điện thoại:</Text>
                    <FormTextInput
                        value={this.state.phone}
                        onChangeText={(phone) => this.setState({ phone })}
                        returnKeyType="next"
                        keyboardType="phone-pad"
                    />


                    <View style={{ marginTop: 30 }}>
                        <Button label="LƯU THAY ĐỔI" onPress={() => {
                            changeInfo()
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