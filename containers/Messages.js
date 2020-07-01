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
                var id2 = dt.val().email;
                if (id1 > id2) {
                    var id3 = id1 + id2;
                } else {
                    var id3 = id2 + id1;
                };
                var lastMessage = "";
                var lastName = "";
                firebase.database().ref('messages/' + id3).limitToLast(1).once('value', (x) => {
                    x.forEach((i) => {
                        if (i.val().text == "") {
                            lastMessage = "Đã gửi một ảnh"
                        } else {
                            lastMessage = i.val().text
                        }
                        console.log(lastMessage);
                        console.log(i.val().user.name);
                        lastName = i.val().user.name;
                    })
                });
                firebase.database().ref('UsersData/' + dt.val().email).on('value', (s) => {
                    data.push({
                        lastName: lastName,
                        last: lastMessage,
                        image: s.val().url,
                        email: s.val().email,
                        name: s.val().name,
                    });
                })
            })
            this.setState({ Data: data }, () => {
                console.log(this.state.Data);
                data = []
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
                                        lastMessage={item.lastName + ": " + item.last}
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
