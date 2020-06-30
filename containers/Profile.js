import React from 'react';
import styles from '../assets/styles';

import {
    ScrollView,
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    Modal,
} from 'react-native';
import ProfileItem from '../components/ProfileItem';
import Icon from '../components/Icon';
import firebase from '../containers/firebase';

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible3: false,
        };
    }
    render() {
        const temp = this.props.navigation.state.params;
        email = temp.email;
        age = temp.age;
        image = temp.image;
        gender = temp.gender;
        describe = temp.describe;
        require = temp.require;
        phone = temp.phone;
        address = temp.address;
        location = temp.location;
        price = temp.price;
        name = temp.name;
        role = temp.role;
        acreage = temp.acreage;
        roomDescribe = temp.roomDescribe;

        return (
            <ImageBackground
                style={styles.bg}
            >
                <ScrollView style={styles.containerProfile}>
                    <ImageBackground source={{ uri: image }} style={styles.photo}>
                    </ImageBackground>

                    <ProfileItem
                        price={price}
                        name={name}
                        age={age}
                        address={address}
                        location={location}
                        gender={gender}
                        describe={describe}
                        require={require}
                        role={role}
                        acreage={acreage}
                        roomDescribe={roomDescribe}
                    />

                    <View style={styles.actionsProfile}>
                        <TouchableOpacity style={styles.roundedButton} onPress={() => this.props.navigation.navigate('Main')}>
                            <Text style={styles.topIconLeft}>
                                <Icon name="chevronLeft" />
                            </Text>
                            <Text style={styles.textButton}>  Trở về</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.roundedButton} onPress={() => this.props.navigation.navigate('Chat', temp)}>
                            <Text style={styles.iconButton}>
                                <Icon name="chat" />
                            </Text>
                            <Text style={styles.textButton}>  Nhắn tin</Text>
                        </TouchableOpacity>

                        <Modal
                            animationType="fade"
                            transparent={true}
                            visible={this.state.isVisible3}
                        >
                            <View style={customStyles2.centerView}>
                                <View style={customStyles2.modalView}>
                                    <Text style={{ color: "#7444C0", fontSize: 18, textAlign: "center" }} >Bạn có chắc muốn xóa người này khỏi danh sách quan tâm?</Text>
                                    <View style={{ display: "flex", flexDirection: "row", marginTop: 40 }}>

                                        <TouchableOpacity
                                            onPress={() => {
                                                var user = firebase.auth().currentUser;
                                                var id = user.email.replace(/\./g, ',');
                                                var id2 = email.replace(/\./g, ',');
                                                firebase.database().ref('DataMactch/' + id + '/Match/' + id2).remove().then(() => {
                                                    this.props.navigation.navigate('Main');
                                                    this.setState({
                                                        isVisible3: false
                                                    })
                                                })
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
                            <Text style={styles.iconButton}>
                                <Icon name="dislike" />
                            </Text>
                            <Text style={styles.textButton}>  Xóa</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </ImageBackground>
        );
    };
}
