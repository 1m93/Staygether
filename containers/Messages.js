import React from 'react';
import styles from '../assets/styles';

import {
    ScrollView,
    Text,
    TouchableOpacity,
    ImageBackground,
    View,
    FlatList
} from 'react-native';
import Message from '../components/Message';
import Icon from '../components/Icon';
import Demo from '../assets/data/demo.js';
import firebase from '../containers/firebase.js';

class Messages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Data: [],
        };
    }
    componentDidMount() {
        var data = [];
        var email1 = firebase.auth().currentUser.email;
        id1 = email1.replace(/\./g, ',');
        firebase.database().ref('DataMactch/' + id1 + '/messages').on('value', (snapshot) => {
            snapshot.forEach((dt) => {
                firebase.database().ref('UsersData/' + dt.val().email).on('value', (s) => {
                    // if (s.val().email > email1) {
                    //     var id2 = s.val().email.replace(/\./g, ',');
                    //     firebase.database().ref('messages/' + id2 + id1).on('value', (info) => {
                    //         var max = 0
                    //         var text = ''
                    //         var user = ''
                    //         info.forEach((i) => {
                    //             if (i.val().timestamp > max) {
                    //                 max = i.val().timestamp
                    //                 text = i.val().text
                    //                 user = i.val().user.name
                    //             }
                    //         })
                    //         if (text == '') {
                    //             text = 'Đã gửi 1 ảnh'
                    //         }
                            data.push({
                                // text: text,
                                // user: user,
                                image: s.val().url,
                                email: s.val().email,
                                name: s.val().name,
                            });
                    //     })
                    // }
                    // else {
                    //     var id2 = s.val().email.replace(/\./g, ',');
                    //     firebase.database().ref('messages/' + id1 + id2).on('value', (info) => {
                    //         var max = 0
                    //         var text = ''
                    //         var user = ''
                    //         info.forEach((i) => {
                    //             if (i.val().timestamp > max) {
                    //                 max = i.val().timestamp
                    //                 text = i.val().text
                    //                 user = i.val().user.name
                    //             }
                    //         })
                    //         if (text == '') {
                    //             text = 'Đã gửi 1 ảnh'
                    //         }
                            // data.push({
                            //     // text: text,
                            //     // user: user,
                            //     image: s.val().url,
                            //     email: s.val().email,
                            //     name: s.val().name,
                            // });
                    //     })
                    // }
                })
            })
            this.setState({ Data: data }, () => {
                console.log(this.state.Data);
            })
        })
    }
    render() {
        return (
            <ImageBackground
                source={require('../assets/images/bg.png')}
                style={styles.bg}
            >
                <View style={styles.containerMessages}>
                    <ScrollView>
                        <View style={styles.top}>
                            <Text style={styles.title}>Tin nhắn</Text>
                        </View>

                        <FlatList
                            data={this.state.Data}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => this.props.myProps.navigation.navigate('Chat', item)}>
                                    <Message
                                        image={item.image}
                                        name={item.name}
                                    />
                                </TouchableOpacity>
                            )}
                        />
                    </ScrollView>
                </View>
            </ImageBackground>
        );
    }
};

export default Messages;
