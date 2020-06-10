import React from 'react';
import styles from '../assets/styles';

import {
    ScrollView,
    View,
    Text,
    ImageBackground,
    TouchableOpacity
} from 'react-native';
import ProfileItem from '../components/ProfileItem';
import Icon from '../components/Icon';
import firebase from '../containers/firebase'

export default class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            age: '',
            image: '',
            info1: '',
            info2: '',
            info3: '',
            info4: '',
            location: '',
            match: '',
            name: '',
        };
    }

    async componentDidMount() {
        var user = firebase.auth().currentUser;
        firebase.database().ref('UsersData/' + user.email.replace('.', ',')).once('value').then(function (snapshot) {
            this.setState({
                age: snapshot.val().age,
                image: snapshot.val().url,
                match: snapshot.val().price,
                location: snapshot.val().address,
                info1: snapshot.val().gender,
                info2: snapshot.val().describe,
                info3: snapshot.val().require,
                info4: snapshot.val().phone,
                name: snapshot.val().name,
            }, () => {
                console.log(this.state)
            })
        }.bind(this));
    }

    render() {

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
                        <TouchableOpacity style={styles.roundedButton}>
                            {/* <Text style={styles.topIconLeft}>
                                <Icon name="chevronLeft" />
                            </Text> */}
                            <Text style={styles.textButton}>Chỉnh sửa</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.roundedButton}
                            onPress={() => {
                                firebase.auth().signOut();
                            }}>
                            {/* <Text style={styles.iconButton}>
                                <Icon name="chat" />
                            </Text> */}
                            <Text style={styles.textButton}> Đăng xuất</Text>
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
