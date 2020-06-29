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
        id1 = email1.replace('.', ',');        
        firebase.database().ref('DataMactch/' + id1 + '/messages').on('value', (snapshot)=>{
            snapshot.forEach((dt) => {
                firebase.database().ref('UsersData/'+ dt.val().email).on('value',(snapshot)=> {
                    data.push({
                        image: snapshot.val().url,
                        email: snapshot.val().email,
                        name: snapshot.val().name,
                    });
                })
            })
            this.setState({Data:data}, () =>{
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
                            <TouchableOpacity>
                                <Text style={styles.icon}>
                                    <Icon name="optionsV" />
                                </Text>
                            </TouchableOpacity>
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
