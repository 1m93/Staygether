import React from 'react';
import { Text, TouchableOpacity, Modal, View, StyleSheet, Picker, ImageBackground } from 'react-native';
import CardStack, { Card } from 'react-native-card-stack-swiper';
import CardItem from '../components/CardItem';
import styles from '../assets/styles';
import firebase from '../containers/firebase';
import shuffleArray from '../components/ShuffleArray';
import Icon from '../components/Icon';

export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            Data: [],
            location: "Chọn khu vực",
            role: "",
            roleSelected: "",
            acreage: [0, 1000],
            acreageSelected: "0, 1000",
            age: [0, 100],
            ageSelected: "0, 100",
            sex: "",
            sexSelected: "",
            isVisible: false,
            isVisible2: false,
        };
    }

    getData = () => {
        var data = [];
        var dataNotShow = [];
        var user = firebase.auth().currentUser;
        id1 = user.email.replace('.', ',');
        var priceDot = 0;
        firebase.database().ref('UsersData/' + id1).on('value', (snapshot) => {
            priceDot = snapshot.val().price;
        })

        firebase.database().ref('DataMactch/' + id1 + '/Match').on('value', (snapshot) => {
            snapshot.forEach((dt) => {
                dataNotShow.push(dt.val().email);
            })
        })
        firebase.database().ref('DataMactch/' + id1 + '/Dislike').on('value', (snapshot) => {
            snapshot.forEach((dt) => {
                dataNotShow.push(dt.val().email);
            })
        })

        firebase.database().ref('UsersData/').on('value', (snapshot) => {
            snapshot.forEach((dt) => {
                if (user.email != dt.val().email
                    && !dataNotShow.includes(dt.val().email)
                    && Math.abs(dt.val().price) - priceDot <= 500000
                    && dt.val().status == "open"
                    && dt.val().age >= this.state.age[0]
                    && dt.val().age <= this.state.age[1]
                    && dt.val().acreage >= this.state.acreage[0]
                    && dt.val().acreage <= this.state.acreage[1]
                    && (this.state.location == "Chọn khu vực" || dt.val().location == this.state.location)
                    && (this.state.role == "" || dt.val().role == this.state.role)
                    && (this.state.sex == "" || dt.val().gender == this.state.sex)
                ) {
                    data.push({
                        role: dt.val().role,
                        image: dt.val().url,
                        price: dt.val().price,
                        name: dt.val().name,
                        describe: dt.val().describe,
                        email: dt.val().email,
                        age: dt.val().age,
                        gender: dt.val().gender,
                        require: dt.val().require,
                        address: dt.val().address,
                        location: dt.val().location,
                        acreage: dt.val().acreage,
                        roomDescribe: dt.val().roomDescribe,
                    });
                }
            });
            data = shuffleArray(data);
            this.setState({ Data: data }, () => {
                console.log(this.state.Data)
            })
        })
    }

    componentDidMount() {
        this.getData();
    }

    sendPushNotification = async (token, name) => {
        const message = {
          to: token,
          sound: 'default',
          title: 'Bạn vừa kết nối với ' + name,
          body: 'Bạn và ' + name  + ' có thể bắt đầu chat để tìm hiểu nhau rồi đấy',
          _displayInForeground: true,
        };
        const response = await fetch('https://exp.host/--/api/v2/push/send', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(message),
        });
      };

    match = (item) =>{
        var user = firebase.auth().currentUser;
        id1 = user.email.replace('.', ',');
        id2 = item.email.replace('.', ',');
        var token1 = ''
        var token2 = ''
        var name1 = ''
        var name2 = ''
        firebase.database().ref('DataMactch/' + id1 + '/Match/' + id2).set({
            email: item.email,
        })
        firebase.database().ref('DataMactch/' + id2 + '/Match').once('value', (snapshot) => {
            snapshot.forEach((dt)=> {
                if (dt.val().email == user.email) {
                    firebase.database().ref('UsersData/').once('value', (ss) => {
                        ss.forEach((temp) => {
                            if (temp.val().email == user.email) {
                                token1 = temp.val().token;
                                name1 = temp.val().name
                            }
                            if (temp.val().email == item.email) {
                                token2 = temp.val().token;
                                name2 = temp.val().name
                            }
                        })
                        this.sendPushNotification(token1, name2)
                        this.sendPushNotification(token2, name1)
                    })
                }
            })
        })
        firebase.database().ref('DataMactch/' + id2 + '/Matched/' + id1).set({
            email: user.email,
        })
    }

    dislike = (item) => {
        var user = firebase.auth().currentUser;
        id1 = user.email.replace('.', ',');
        id2 = item.email.replace('.', ',');
        firebase.database().ref('DataMactch/' + id1 + '/Dislike/' + id2).set({
            email: item.email,
        })
    }

    render() {

        return (
            <ImageBackground
                source={require('../assets/images/bg.png')}
                style={styles.bg}
            >
                <View style={styles.containerHome}>
                    <View style={styles.top}>

                        {/* Phan loai theo khu vuc */}
                        <View>
                            <Modal
                                animationType="fade"
                                transparent={true}
                                visible={this.state.isVisible}
                            >
                                <View style={customStyles.centerView}>
                                    <View style={customStyles.modalView}>
                                        <Text style={{ color: "#7444C0", fontSize: 18, textAlign: "center" }} >Chọn khu vực bạn muốn để dễ dàng tìm kiếm hơn</Text>
                                        <View style={customStyles.picker}>
                                            <Picker
                                                style={customStyles.pickerItem}
                                                selectedValue={this.state.location}
                                                onValueChange={(value, index) => {
                                                    this.setState({
                                                        location: value,
                                                        isVisible: false
                                                    }, () => {
                                                        this.getData();
                                                    });
                                                }}>
                                                <Picker.Item label="Chọn khu vực" value="Chọn khu vực" />
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
                                        <View style={{ display: "flex", flexDirection: "row", marginTop: 40 }}>

                                            <TouchableOpacity
                                                onPress={() => {
                                                    this.setState({
                                                        isVisible: false,
                                                        location: "Chọn khu vực",
                                                    }, () => {
                                                        this.getData()
                                                    });
                                                }}
                                            >
                                                <Text style={{ fontSize: 18, color: "blue", marginRight: 25 }}>Xoá lọc</Text>
                                            </TouchableOpacity>

                                            <TouchableOpacity
                                                onPress={() => {
                                                    this.setState({
                                                        isVisible: false
                                                    });
                                                }}
                                            >
                                                <Text style={{ fontSize: 18, color: "red" }}>Đóng</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </Modal>
                            <TouchableOpacity onPress={() => { this.setState({ isVisible: true }); }} style={styles.city}>
                                <Text style={styles.cityText}>
                                    <Icon name="marker" /> {this.state.location}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        {/* -------------------------------------- */}

                        {/* Loc du lieu theo dieu kien */}
                        <View>
                            <Modal
                                animationType="fade"
                                transparent={true}
                                visible={this.state.isVisible2}
                            >
                                <View style={customStyles.centerView}>
                                    <View style={customStyles.modalView}>
                                        <Text style={{ color: "#7444C0", fontSize: 18, textAlign: "center" }} >Lọc</Text>
                                        <View style={customStyles.picker}>
                                            <Picker
                                                style={customStyles.pickerItem}
                                                selectedValue={this.state.roleSelected}
                                                onValueChange={(value, index) => {
                                                    this.setState({ roleSelected: value });
                                                }}>
                                                <Picker.Item label="Chọn đối tượng" value="" />
                                                <Picker.Item label="Đã có phòng" value="Đã có phòng" />
                                                <Picker.Item label="Chưa có phòng" value="Chưa có phòng" />
                                            </Picker>
                                        </View>

                                        <View style={customStyles.picker}>
                                            <Picker
                                                style={customStyles.pickerItem}
                                                selectedValue={this.state.sexSelected}
                                                onValueChange={(value, index) => {
                                                    this.setState({ sexSelected: value });
                                                }}>
                                                <Picker.Item label="Chọn giới tính" value="" />
                                                <Picker.Item label="Nam" value="Nam" />
                                                <Picker.Item label="Nữ" value="Nữ" />
                                            </Picker>
                                        </View>

                                        <View style={customStyles.picker}>
                                            <Picker
                                                style={customStyles.pickerItem}
                                                selectedValue={this.state.ageSelected}
                                                onValueChange={(value, index) => {
                                                    this.setState({ ageSelected: value });
                                                }}>
                                                <Picker.Item label="Chọn khoảng độ tuổi" value="0, 100" />
                                                <Picker.Item label="Dưới 20" value="0, 20" />
                                                <Picker.Item label="20 đến 25" value="20, 25" />
                                                <Picker.Item label="25 đến 30" value="25, 30" />
                                                <Picker.Item label="Trên 30" value="30, 100" />
                                            </Picker>
                                        </View>

                                        {
                                            this.state.roleSelected == "Đã có phòng" &&
                                            <View style={customStyles.picker}>
                                                <Picker
                                                    style={customStyles.pickerItem}
                                                    selectedValue={this.state.acreageSelected}
                                                    onValueChange={(value, index) => {
                                                        this.setState({ acreageSelected: value });
                                                    }}>
                                                    <Picker.Item label="Chọn diện tích phòng" value="0, 1000" />
                                                    <Picker.Item label="Dưới 20m2" value="0, 20" />
                                                    <Picker.Item label="20m2 đến 30m2" value="20, 30" />
                                                    <Picker.Item label="30m2 đến 45m2" value="30, 45" />
                                                    <Picker.Item label="45m2 đến 60m2" value="45, 60" />
                                                    <Picker.Item label="Trên 60m2" value="60, 1000" />
                                                </Picker>
                                            </View>
                                        }

                                        <View style={{ display: "flex", flexDirection: "row", marginTop: 40 }}>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    this.setState({
                                                        isVisible2: false,
                                                        role: this.state.roleSelected,
                                                        sex: this.state.sexSelected,
                                                        age: JSON.parse("[" + this.state.ageSelected + "]"),
                                                        acreage: JSON.parse("[" + this.state.acreageSelected + "]"),
                                                    }, () => {
                                                        this.getData();
                                                    });
                                                }}
                                            >
                                                <Text style={{ fontSize: 18, color: "green", marginRight: 25 }}>Xác nhận</Text>
                                            </TouchableOpacity>

                                            <TouchableOpacity
                                                onPress={() => {
                                                    this.setState({
                                                        isVisible2: false,
                                                        age: [0, 100],
                                                        ageSelected: "0, 100",
                                                        sex: "",
                                                        sexSelected: "",
                                                        role: "",
                                                        roleSelected: "",
                                                        acreage: [0, 1000],
                                                        acreageSelected: "0, 1000",
                                                    }, () => {
                                                        this.getData();
                                                    });
                                                }}
                                            >
                                                <Text style={{ fontSize: 18, color: "blue", marginRight: 25 }}>Xoá lọc</Text>
                                            </TouchableOpacity>

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
                            <TouchableOpacity onPress={() => { this.setState({ isVisible2: true }); }} style={styles.filters}>
                                <Text style={styles.filtersText}>
                                    <Icon name="filter" /> Lọc
                                </Text>
                            </TouchableOpacity>
                        </View>
                        {/* -------------------------------------- */}

                    </View>

                    <CardStack
                        loop={false}
                        verticalSwipe={false}
                        renderNoMoreCards={() => null}
                        ref={swiper => (this.swiper = swiper)}
                    >
                        {
                            this.state.Data.map((item, index) => (
                                <Card
                                    key={index}
                                    onSwipedLeft={() => {
                                        this.match(item);
                                    }}
                                    onSwipedRight={() => {
                                        this.dislike(item);
                                    }}
                                >
                                    {
                                        item.role == "Chưa có phòng" ?
                                            <CardItem
                                                image={item.image}
                                                name={item.name}
                                                role={item.role}
                                                description={
                                                    "Tuổi: " + item.age + "\n" +
                                                    "Giới tính: " + item.gender + "\n" +
                                                    "Địa chỉ: " + item.address + ", " + item.location + "\n" +
                                                    "Mô tả bản thân: " + item.describe + "\n" +
                                                    "Yêu cầu: " + item.require
                                                }
                                                matches={item.price}
                                                actions
                                                onPressLeft={() => {
                                                    this.swiper.swipeLeft()
                                                }}
                                                onPressRight={() => {
                                                    this.swiper.swipeRight()
                                                }}
                                            /> :
                                            <CardItem
                                                image={item.image}
                                                name={item.name}
                                                role={item.role}
                                                description={
                                                    "Tuổi: " + item.age + "\n" +
                                                    "Giới tính: " + item.gender + "\n" +
                                                    "Địa chỉ: " + item.address + ", " + item.location + "\n" +
                                                    "Diện tích phòng: " + item.acreage + " m2\n" +
                                                    "Mô tả phòng: " + item.roomDescribe + "\n" +
                                                    "Mô tả bản thân: " + item.describe + "\n" +
                                                    "Yêu cầu: " + item.require
                                                }
                                                matches={item.price}
                                                actions
                                                onPressLeft={() => {
                                                    this.swiper.swipeLeft()
                                                }}
                                                onPressRight={() => {
                                                    this.swiper.swipeRight()
                                                }}
                                            />
                                    }
                                </Card>
                            ))
                        }
                    </CardStack>

                </View>
            </ImageBackground>
        );
    };
}

customStyles = StyleSheet.create({
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
    picker: {
        height: 40,
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginTop: 20,
        width: "100%",
    },
    pickerItem: {
        width: "105%",
        alignSelf: "center",
    }
})
