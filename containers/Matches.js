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
class Matches extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Data: [],
        };
    }
    componentDidMount() {
        var data = [];
        firebase.database().ref('UsersData/').on('value', (snapshot) => {
            snapshot.forEach((dt) => {
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
                    phone: dt.val().phone,
                });
            });
            data = shuffleArray(data);
            this.setState({ Data: data }, () => {
                console.log(this.state.Data)
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
                                        describe: item.describe,
                                        require: item.require,
                                        price: item.price,
                                        phone: item.phone,
                                    }
                                    this.props.myProp.navigation.navigate('Profile', tmp);
                                }}>
                                    <CardItem
                                        image={item.image}
                                        name={item.name}
                                        description={item.gender + " - " + item.age + " tuổi\n"}
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