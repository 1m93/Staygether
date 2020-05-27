import * as React from 'react';
import { Image, View, StyleSheet, Text, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
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
        };
    }
    render() {
        uppost = (address, describe, price, require) => {
            const temp = this.props.navigation.state.params;
            email = temp.email;
            age = temp.age;
            gender = temp.gender;
            phone = temp.phone;
            name = temp.name;
            try {
                firebase.database().ref('UsersData/').push({
                    email,
                    name,
                    age,
                    phone,
                    gender,
                    address,
                    describe,
                    price,
                    require,
                }).then(() => {
                    this.props.navigation.navigate('Main');
                })
            } catch (err) {
                console.log(err);
            }
        }

        let { image } = this.state

        upLoadImage = async (uri) => {
            const res = await fetch(uri);
            const blob = await res.blob();
            const temp = this.props.navigation.state.params;
            var ref = firebase.storage().ref().child(temp.email);
            return ref.put(blob);
        }

        return (
            <View style={styles.container}>
                <View style={styles.form}>
                    <Text style={styles.text}>THÔNG TIN BỔ SUNG</Text>
                    <FormTextInput
                        value={this.state.price}
                        onChangeText={(price) => this.setState({ price })} value={this.state.price}
                        placeholder="Giá mong muốn (VND)"
                        keyboardType="number-pad"
                        returnKeyType="next"
                    />
                    <FormTextInput
                        value={this.state.address}
                        onChangeText={(address) => this.setState({ address })} value={this.state.address}
                        placeholder="Địa chỉ"
                        returnKeyType="next"
                    />
                    <MultiFormTextInput
                        value={this.state.describe}
                        onChangeText={(describe) => this.setState({ describe })} value={this.state.describe}
                        placeholder="Mô tả bản thân"
                        returnKeyType="next"
                    />
                    <MultiFormTextInput
                        value={this.state.require}
                        onChangeText={(require) => this.setState({ require })} value={this.state.require}
                        placeholder="Yêu cầu"
                        returnKeyType="next"
                    />
                    <Button label="ĐÍNH KÈM ẢNH" style={styles.signup} onPress={this._pickImage} />
                    {image && <Image source={{ uri: image }} style={{ width: 100, height: 100, alignSelf: "center", marginBottom: 20 }} />}
                    <Button label="HOÀN TẤT" onPress={() => {
                        if (this.state.image !== null) {
                            uppost(this.state.address, this.state.describe, this.state.price, this.state.require);
                            upLoadImage(this.state.image);
                        } else {
                            alert("Chưa đính kèm ảnh");
                        }
                    }} />
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
                this.setState({ image: result.uri });
            }
            console.log(result);
        } catch (E) {
            console.log(E);
        }
    };
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
    text: {
        fontWeight: "bold",
        fontSize: 30,
        marginBottom: 30,
        textAlign: "center",
        color: "#7444C0"
    }
})