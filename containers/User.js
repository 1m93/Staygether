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

export default class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            age: '',
            image: '',
            info1: '',
            info2: '',
            info3: '',
            info4: '',
            location: '',
            match: '',
            name: '',
            status: '',
            isVisible: 'false',
        };
    }

    async componentDidMount() {
        var user = firebase.auth().currentUser;
        firebase.database().ref('UsersData/' + user.email.replace('.', ',')).once('value').then(function (snapshot) {
            this.setState({
                email: snapshot.val().email,
                age: snapshot.val().age,
                image: snapshot.val().url,
                match: snapshot.val().price,
                location: snapshot.val().address,
                info1: snapshot.val().gender,
                info2: snapshot.val().describe,
                info3: snapshot.val().require,
                info4: snapshot.val().phone,
                name: snapshot.val().name,
                status: snapshot.val().status,
            }, () => {
                console.log(this.state)
            })
        }.bind(this));
    }

    render() {
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
                this.setState({
                    status: "close",
                })
            } else {
                try {
                    firebase.database().ref('UsersData/' + id).update({
                        status: "open",
                    })
                } catch (err) {
                    console.log(err);
                };
                this.setState({
                    status: "open",
                })
            }
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
                        matches={this.state.match}
                        name={this.state.name}
                        age={this.state.age}
                        location={this.state.location}
                        info1={this.state.info1}
                        info2={this.state.info2}
                        info3={this.state.info3}
                        info4={this.state.info4}
                    />

                    <View style={styles.actionsProfile}>
                        <TouchableOpacity
                            style={styles.roundedButton}
                            onPress={() => this.props.myProp2.navigation.navigate('Loading')}
                        >
                            <Text style={styles.textButton}>Chỉnh sửa</Text>
                        </TouchableOpacity>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={this.state.isVisible}
                        >
                            <View style={customStyles.centerView}>
                                <View style={customStyles.modalView}>
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
                        <TouchableOpacity
                            style={styles.roundedButton}
                            onPress={() => {
                                firebase.auth().signOut();
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
})