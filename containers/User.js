import React from 'react';
import styles from '../assets/styles';

import {
    ScrollView,
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    Modal,
    StyleSheet
} from 'react-native';
import ProfileItem from '../components/ProfileItem';
import Icon from '../components/Icon';
import firebase from '../containers/firebase'
import Button from "../components/Button";
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

export default class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            age: '',
            image: '',
            gender: '',
            describe: '',
            require: '',
            phone: '',
            address: '',
            location: '',
            price: '',
            name: '',
            status: '',
            role: '',
            acreage: '',
            roomDescribe: '',
            isVisible: 'false',
            isVisible2: 'false',
            isVisible3: 'false',
        };
    }

    async componentDidMount() {
        this.getPermissionAsync;
        var user = firebase.auth().currentUser;
        firebase.database().ref('UsersData/' + user.email.replace('.', ',')).on('value', (snapshot) => {
            this.setState({
                email: snapshot.val().email,
                age: snapshot.val().age,
                image: snapshot.val().url,
                price: snapshot.val().price,
                address: snapshot.val().address,
                location: snapshot.val().location,
                gender: snapshot.val().gender,
                describe: snapshot.val().describe,
                require: snapshot.val().require,
                phone: snapshot.val().phone,
                name: snapshot.val().name,
                status: snapshot.val().status,
                role: snapshot.val().role,
                acreage: snapshot.val().acreage,
                roomDescribe: snapshot.val().roomDescribe,
            }, () => {
                console.log(this.state)
            })
        });
    }

    render() {
        upLoadImage = async (uri) => {
            const res = await fetch(uri);
            const blob = await res.blob();
            var ref = firebase.storage().ref().child(this.state.email);
            ref.put(blob).then(() => {
                let id = this.state.email.replace('.', ',');
                firebase.storage().ref().child(this.state.email).getDownloadURL().then(function (url) {
                    console.log(url);
                    try {
                        firebase.database().ref('UsersData/' + id).update({
                            url: url,
                        }).then(alert("Cập nhật ảnh đại diện thành công"))
                    } catch (err) {
                        console.log(err);
                    }
                })
            })
        }

        changeStatus = () => {
            let id = this.state.email.replace('.', ',');
            if (this.state.status == "open") {
                try {
                    firebase.database().ref('UsersData/' + id).update({
                        status: "close",
                    })
                } catch (err) {
                    console.log(err);
                };
            } else {
                try {
                    firebase.database().ref('UsersData/' + id).update({
                        status: "open",
                    })
                } catch (err) {
                    console.log(err);
                };
            }
        }

        editPassword = () => {
            this.setState({
                isVisible2: false
            })
            this.props.myProp2.navigation.navigate('EditPassword');
        }

        editInfo = () => {
            tmp = {
                email: this.state.email,
                name: this.state.name,
                age: this.state.age,
                gender: this.state.gender,
                phone: this.state.phone,
            }
            this.setState({
                isVisible2: false
            })
            this.props.myProp2.navigation.navigate('EditInfo', tmp);
        }

        editRequire = () => {
            tmp = {
                email: this.state.email,
                role: this.state.role,
                price: this.state.price,
                location: this.state.location,
                address: this.state.address,
                describe: this.state.describe,
                require: this.state.require,
                acreage: this.state.acreage,
                roomDescribe: this.state.roomDescribe,
            }
            this.setState({
                isVisible2: false
            })
            this.props.myProp2.navigation.navigate('EditRequire', tmp);
        }

        return (
            <ImageBackground
                source={require('../assets/images/bg.png')}
                style={styles.bg}
            >
                <ScrollView style={styles.containerProfile}>
                    <ImageBackground source={{ uri: this.state.image }} style={styles.photo}>
                    </ImageBackground>

                    <ProfileItem
                        price={this.state.price}
                        name={this.state.name}
                        age={this.state.age}
                        address={this.state.address}
                        location={this.state.location}
                        gender={this.state.gender}
                        describe={this.state.describe}
                        require={this.state.require}
                        role={this.state.role}
                        acreage={this.state.acreage}
                        roomDescribe={this.state.roomDescribe}
                    />

                    <View style={styles.actionsProfile}>
                        <Modal
                            animationType="fade"
                            transparent={true}
                            visible={this.state.isVisible2}
                        >
                            <View style={customStyles2.centerView}>
                                <View style={customStyles2.modalView}>
                                    <Text style={{ fontSize: 20, textAlign: "center", marginBottom: 20 }} >Chỉnh sửa</Text>
                                    <Button label="ĐỔI ẢNH ĐẠI DIỆN" onPress={this._pickImage} style={customStyles2.signup} />
                                    <Button label="THÔNG TIN CÁ NHÂN" onPress={() => editInfo()} style={customStyles2.signup} />
                                    <Button label="THÔNG TIN TÌM NGƯỜI Ở GHÉP" onPress={() => editRequire()} style={customStyles2.signup} />
                                    <Button label="ĐỔI MẬT KHẨU" onPress={() => editPassword()} style={customStyles2.signup} />
                                    <View style={{ display: "flex", flexDirection: "row", marginTop: 10 }}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                this.setState({
                                                    isVisible2: false
                                                });
                                            }}
                                        >
                                            <Text style={{ fontSize: 18, color: "red" }}>Đóng</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                        <TouchableOpacity
                            style={styles.roundedButton}
                            onPress={() => {
                                this.setState({
                                    isVisible2: true,
                                })
                            }}
                        >
                            <Text style={styles.textButton}>Chỉnh sửa</Text>
                        </TouchableOpacity>
                        <Modal
                            animationType="fade"
                            transparent={true}
                            visible={this.state.isVisible}
                        >
                            <View style={customStyles2.centerView}>
                                <View style={customStyles2.modalView}>
                                    {
                                        this.state.status == "open" ?
                                            <Text style={{ color: "#7444C0", fontSize: 18, textAlign: "center" }} >Sau khi đóng profile, thông tin tìm người ở ghép của bạn sẽ không còn xuất hiện trên bảng tin của người khác nữa, bạn có chắc chắn muốn đóng?</Text> :
                                            <Text style={{ color: "#7444C0", fontSize: 18, textAlign: "center" }} >Sau khi mở profile, thông tin tìm người ở ghép của bạn sẽ xuất hiện trên bảng tin của người khác, bạn có chắc chắn muốn mở?</Text>
                                    }
                                    <View style={{ display: "flex", flexDirection: "row", marginTop: 40 }}>

                                        <TouchableOpacity
                                            onPress={() => {
                                                changeStatus();
                                                this.setState({
                                                    isVisible: false
                                                })
                                            }}
                                        >
                                            <Text style={{ fontSize: 18, color: "green", marginRight: 25 }}>Xác nhận</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            onPress={() => {
                                                this.setState({
                                                    isVisible: false
                                                });
                                            }}
                                        >
                                            <Text style={{ fontSize: 18, color: "red" }}>Hủy</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                        {
                            this.state.status == "open" ?
                                <TouchableOpacity
                                    style={styles.roundedButton}
                                    onPress={() => { this.setState({ isVisible: true }); }}
                                >
                                    <Text style={styles.textButton}>Đóng Profile</Text>
                                </TouchableOpacity> :
                                <TouchableOpacity
                                    style={styles.roundedButton}
                                    onPress={() => { this.setState({ isVisible: true }); }}
                                >
                                    <Text style={styles.textButton}>Mở Profile</Text>
                                </TouchableOpacity>
                        }

                        <Modal
                            animationType="fade"
                            transparent={true}
                            visible={this.state.isVisible3}
                        >
                            <View style={customStyles2.centerView}>
                                <View style={customStyles2.modalView}>
                                    <Text style={{ color: "#7444C0", fontSize: 18, textAlign: "center" }} >Bạn có chắc muốn đăng xuất khỏi tài khoản này?</Text>
                                    <View style={{ display: "flex", flexDirection: "row", marginTop: 40 }}>

                                        <TouchableOpacity
                                            onPress={() => {
                                                var user = firebase.auth().currentUser
                                                var id  = user.email.replace('.', ',')
                                                firebase.database().ref('UsersData/' + id + '/token').set('').then(()=>{
                                                    console.log('haylam')
                                                })
                                                firebase.auth().signOut();
                                            }}
                                        >
                                            <Text style={{ fontSize: 18, color: "green", marginRight: 25 }}>Xác nhận</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            onPress={() => {
                                                this.setState({
                                                    isVisible3: false
                                                });
                                            }}
                                        >
                                            <Text style={{ fontSize: 18, color: "red" }}>Hủy</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </Modal>

                        <TouchableOpacity
                            style={styles.roundedButton}
                            onPress={() => {
                                this.setState({
                                    isVisible3: true,
                                });
                            }}
                        >
                            <Text style={styles.textButton}>Đăng xuất</Text>
                        </TouchableOpacity>
                        {/* <TouchableOpacity style={styles.circledButton}>
                            <Text style={styles.iconButton}>
                                <Icon name="optionsH" />
                            </Text>
                        </TouchableOpacity> */}
                    </View>
                </ScrollView>
            </ImageBackground>
        );
    };

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
                this.setState({
                    image: result,
                    isVisible2: false,

                });
                upLoadImage(this.state.image.uri);
            }
            console.log(result);
        } catch (E) {
            console.log(E);
        }
    };
}

customStyles2 = StyleSheet.create({
    centerView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 25,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width: "80%",
    },
    signup: {
        backgroundColor: "#FFF",
        borderColor: "#7444C0",
        color: "#7444C0",
    },
})