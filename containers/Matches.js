import React from 'react';
import styles from '../assets/styles';

import {
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    FlatList
} from 'react-native';
import CardItem from '../components/CardItem';
import Icon from '../components/Icon';
import firebase from '../containers/firebase';
import shuffleArray from '../components/ShuffleArray';
//import Demo from '../assets/data/demo.js';
var data = [];
var match = [];
var matched = [];
var love = [];
class Matches extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Data: [],
        };
    }

    componentDidMount() {
        var user = firebase.auth().currentUser;
        let id1 = user.email.replace('.', ',');
        var match = []
        var matched = []
        var love = []
        var data = [];
        firebase.database().ref('DataMactch/' + id1 + '/Match').on('value', (snapshot) => {
            snapshot.forEach((dt) => {
                match.push(dt.val().email)
            })
            firebase.database().ref('DataMactch/' + id1 + '/Matched').on('value', (ss) => {
                ss.forEach((dt) => {
                    matched.push(dt.val().email)
                })
                for (let i = 0; i < match.length; i++) {
                    for (let j = 0; j < matched.length; j++) {
                        if (match[i] == matched[j]) {
                            love.push(match[i])
                        }
                    }
                }
                match = []
                matched = []
                firebase.database().ref('UsersData/').on('value', (s) => {
                    for (let k = 0; k < love.length; k++) {
                        s.forEach((dt) => {
                            if (love[k] == dt.val().email) {
                                data.push({
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
                                    phone: dt.val().phone,
                                    role: dt.val().role,
                                    acreage: dt.val().acreage,
                                    roomDescribe: dt.val().roomDescribe,
                                });
                            }
                        })
                    }
                    love = []
                    this.setState({ Data: data }, () => {
                        console.log(this.state.Data)
                    })
                    data = [];
                })
            })
        })
    }

    render() {
        return (
            <ImageBackground
                source={require('../assets/images/bg.png')}
                style={styles.bg}
            >
                <View style={styles.containerMatches}>
                    <ScrollView>
                        <View style={styles.top}>
                            <Text style={styles.title}>Quan Tâm</Text>
                            <TouchableOpacity>
                                <Text style={styles.icon}>
                                    <Icon name="optionsV" />
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <FlatList
                            numColumns={2}
                            data={this.state.Data}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => {
                                    let tmp = {
                                        email: item.email,
                                        name: item.name,
                                        age: item.age,
                                        gender: item.gender,
                                        image: item.image,
                                        address: item.address,
                                        location: item.location,
                                        describe: item.describe,
                                        require: item.require,
                                        price: item.price,
                                        phone: item.phone,
                                        role: item.role,
                                        acreage: item.acreage,
                                        roomDescribe: item.roomDescribe,
                                    }
                                    this.props.myProp.navigation.navigate('Profile', tmp);
                                }}>
                                    <CardItem
                                        image={item.image}
                                        name={item.name}
                                        matchDescription={item.gender + " - " + item.age + " tuổi\n"}
                                        variant
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

export default Matches;