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

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const temp = this.props.navigation.state.params;
        console.log(temp);
        age = temp.age;
        image = temp.image;
        info1 = temp.gender;
        info2 = temp.describe;
        info3 = temp.require;
        info4 = temp.email;
        location = temp.address;
        match = temp.price;
        name = temp.name;

        console.log(temp.age);

        return (
            <ImageBackground
                source={require('../assets/images/bg.png')}
                style={styles.bg}
            >
                <ScrollView style={styles.containerProfile}>
                    <ImageBackground source={{ uri: image }} style={styles.photo}>
                        <View style={styles.top}>
                            <TouchableOpacity onPress={() => { console.log("a") }}>
                                <Text style={styles.topIconLeft}>
                                    <Icon name="chevronLeft" />
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity>
                                <Text style={styles.topIconRight}>
                                    <Icon name="optionsV" />
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>

                    <ProfileItem
                        matches={match}
                        name={name}
                        age={age}
                        location={location}
                        info1={info1}
                        info2={info2}
                        info3={info3}
                        info4={info4}
                    />

                    <View style={styles.actionsProfile}>
                        <TouchableOpacity style={styles.circledButton}>
                            <Text style={styles.iconButton}>
                                <Icon name="optionsH" />
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.roundedButton}>
                            <Text style={styles.iconButton}>
                                <Icon name="chat" />
                            </Text>
                            <Text style={styles.textButton}>Nhắn tin</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </ImageBackground>
        );
    };
}
