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
            age : '',
            image : '',
            info1 : '',
            info2 : '',
            info3 : '',
            info4 : '',
            location : '',
            match : '',
            name : '',
        };
    }
    render() {
        
        var user = firebase.auth().currentUser;
        firebase.database().ref('UsersData/').once('value', (snapshot) => {
            snapshot.forEach((dt) => {
                if (user.email == dt.val().email) {
                    console.log(dt.val())
                    this.setState({
                        age: dt.val().age + 'Tuổi',
                        image: dt.val().url,
                        match: dt.val().price,
                        location: dt.val().address,
                        info1: dt.val().gender,
                        info2: dt.val().describe,
                        info3: dt.val().require,
                        info4: dt.val().phone,
                    
            }, () => {
                console.log(this.state)
                })
            }});
        })

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
                        <TouchableOpacity style={styles.roundedButton} onPress={() => this.props.navigation.navigate('Main')}>
                            <Text style={styles.topIconLeft}>
                                <Icon name="chevronLeft" />
                            </Text>
                            <Text style={styles.textButton}>Trở về</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.roundedButton}>
                            <Text style={styles.iconButton}>
                                <Icon name="chat" />
                            </Text>
                            <Text style={styles.textButton}>Nhắn tin</Text>
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
