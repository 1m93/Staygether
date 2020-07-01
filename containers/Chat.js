import React from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { GiftedChat, Bubble, Send, Composer, Time, InputToolbar } from 'react-native-gifted-chat';
import firebase from 'firebase';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import avatar from "../assets/images/avatar.png";
import { Icon } from 'react-native-elements'
class Chat extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        title: (navigation.state.params || {}).name || 'Chat!',
        // headerRight:
        //     <Icon
        //         name='info'
        //         color="#7444C0"
        //     />
    });

    state = {
        image: avatar,
        url: '',
        name: '',
        messages: [],
        Data: {
            image: '',
            name: '',
            email: '',
        },
        timePassed: false,
        email1: firebase.auth().currentUser.email,
        email2: this.props.navigation.state.params.email,

    };

    get ref() {
        var id1 = this.state.email1.replace(/\./g, ',');
        var id2 = this.state.email2.replace(/\./g, ',');
        if (id1 > id2) {
            return firebase.database().ref('messages/' + id1 + id2);
        }
        else {
            return firebase.database().ref('messages/' + id2 + id1);
        }

    }

    on = callback =>
        this.ref
            .limitToLast(20)
            .on('child_added', snapshot => callback(this.parse(snapshot)));

    parse = snapshot => {
        const { timestamp: numberStamp, image, text, user } = snapshot.val();
        const { key: _id } = snapshot;
        const timestamp = new Date(numberStamp);
        const createdAt = new Date(numberStamp)

        const message = {
            _id,
            image,
            createdAt,
            timestamp,
            text,
            user,
        };
        return message;
    }

    off() {
        this.ref.off();
    }

    get uid() {
        return (firebase.auth().currentUser || {}).uid;
    }

    get timestamp() {
        return firebase.database.ServerValue.TIMESTAMP;
    }

    sendPushNotification = async (token, name, text) => {
        var message = {
            to: token,
            sound: 'default',
            title: name + ' vừa nhắn tin cho bạn',
            body: name + ': ' + text,
            _displayInForeground: true,
        };

        if (text != '') {
            message = {
                to: token,
                sound: 'default',
                title: name + ' vừa nhắn tin cho bạn',
                body: name + ': ' + text,
            };
        }
        else {
            message = {
                to: token,
                sound: 'default',
                title: name + ' vừa nhắn tin cho bạn',
                body: name + ': đã gửi 1 ảnh',
            };
        }

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


    send = messages => {
        for (let i = 0; i < messages.length; i++) {
            const { text, image, user } = messages[i];
            if (this.state.name != '') {
                if (firebase.storage().ref().child(this.state.name)) {
                    firebase.storage().ref().child(this.state.name).getDownloadURL().then((temp) => {
                        const message = {
                            text,
                            image: temp,
                            user,
                            timestamp: firebase.database.ServerValue.TIMESTAMP,
                        };
                        this.append(message);
                    });
                }
                this.setState({ name: '' }, () => {
                    console.log(this.state.name)
                })
            }
            else {
                const message = {
                    text,
                    image: '',
                    user,
                    timestamp: this.timestamp,
                };
                this.append(message);
            }
        }
    };
    append = message => {
        this.ref.push(message);
        var id1 = this.state.email1.replace(/\./g, ',');
        var id2 = this.state.email2.replace(/\./g, ',');
        var token = ''
        var name = ''
        firebase.database().ref('UsersData/' + id2).once('value', (snapshot) => {
            token = snapshot.val().token
            firebase.database().ref('UsersData/' + id1).once('value', (ss) => {
                name = ss.val().name
                this.sendPushNotification(token, name, message.text)
            })
        })
        firebase.database().ref('DataMactch/' + id1 + '/messages/' + id2).set({
            email: id2,
        })
        firebase.database().ref('DataMactch/' + id2 + '/messages/' + id1).set({
            email: id1,
        })

    }

    get user() {
        return {
            name: this.state.Data.name,
            email: this.state.Data.email,
            _id: this.uid,
            avatar: this.state.Data.image,
        };
    }

    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    };
    upLoadImage = async (uri) => {
        const res = await fetch(uri);
        const blob = await res.blob();
        var name = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        var ref = firebase.storage().ref().child(name);
        this.setState({ name: name }, () => {
            console.log(this.state.name);
        })
        ref.put(blob).then(() => {
            const message = [{
                text: '',
                image: avatar,
                user: this.user,
                timestamp: firebase.database.ServerValue.TIMESTAMP,
            },]
            this.send(message)
        });

    }

    _pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                quality: 1,
            });
            if (!result.cancelled) {
                this.setState({ image: result }, () => {
                    this.upLoadImage(this.state.image.uri);
                });
            }
            console.log(result);
        } catch (E) {
            console.log(E);
        }
    };

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "white" }}>
                <GiftedChat
                    messages={this.state.messages}
                    onSend={this.send}
                    user={this.user}
                    isTyping={true}
                    showUserAvatar={false}
                    alwaysShowSend
                    renderSend={(props) => {
                        return (
                            <View style={{ marginLeft: -13 }}>
                                <Send {...props}>
                                    <Icon
                                        style={{
                                            marginBottom: 10,
                                        }}
                                        name='send'
                                        color="#7444C0"
                                    />
                                </Send>
                            </View>
                        )
                    }}
                    renderBubble={(props) => {
                        return (
                            <Bubble
                                {...props}
                                wrapperStyle={{
                                    left: {
                                        backgroundColor: "#ECECEC",
                                    },
                                    right: {
                                        backgroundColor: "#7444C0",
                                    }
                                }}
                            />
                        )
                    }}
                    renderComposer={(props) => {
                        return (
                            <View style={{ flexDirection: "row" }}>
                                <View style={{ width: "8%", alignSelf: "flex-end", marginBottom: 10 }}>
                                    <Icon
                                        onPress={() => {
                                            this._pickImage();
                                        }}
                                        name='image'
                                        color="#7444C0"
                                    />
                                </View>
                                <View style={{ width: "90%", marginLeft: -10 }}>
                                    <Composer
                                        {...props}
                                        placeholder={'Soạn tin nhắn'}
                                    />
                                </View>
                            </View>
                        )
                    }}
                    renderTime={(props) => {
                        return (
                            <Time
                                {...props}
                                timeTextStyle={{
                                    left: {
                                        color: "#757E90"
                                    },
                                    right: {
                                        color: "#a9a9a9"
                                    }
                                }}
                            />
                        )
                    }}
                    textInputStyle={{
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                        backgroundColor: "#f5f5f5",
                        borderRadius: 20
                    }}
                    loadEarlier={true}
                    renderLoading={() => <ActivityIndicator size="large" color="#7444C0" />}
                    renderInputToolbar={(props) => (
                        <InputToolbar {...props} containerStyle={{ borderTopWidth: 0 }} />
                    )}
                />
            </View>
        );
    }

    componentDidMount() {
        this.getPermissionAsync();
        var data = {
            image: '',
            email: '',
            name: '',
        }
        var id1 = this.state.email1.replace(/\./g, ',');
        firebase.database().ref('UsersData/' + id1).on('value', (snapshot) => {
            data = {
                image: snapshot.val().url,
                email: snapshot.val().email,
                name: snapshot.val().name,
            }
            this.setState({ Data: data }, () => {
                console.log(this.state.Data);
            })
        })
        this.on(message =>
            this.setState(previousState => ({
                messages: GiftedChat.append(previousState.messages, message),
            }))
        );
    }
    componentWillUnmount() {
        this.off();
    }
}

export default Chat;
