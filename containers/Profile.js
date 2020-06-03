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
import Main from './Main';

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const temp = this.props.navigation.state.params;
        age = temp.age + " Tuổi";
        image = temp.image;
        info1 = temp.gender;
        info2 = temp.describe;
        info3 = temp.require;
        info4 = temp.phone;
        location = temp.address;
        match = temp.price;
        name = temp.name;

        return (
            <ImageBackground
                source={require('../assets/images/bg.png')}
                style={styles.bg}
            >
                <ScrollView style={styles.containerProfile}>
                    <ImageBackground source={{ uri: image }} style={styles.photo}>
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
                        <TouchableOpacity style={styles.roundedButton} onPress={() => this.props.navigation.navigate('Main')}>
                            <Text style={styles.topIconLeft}>
                                <Icon name="chevronLeft" />
                            </Text>
                            <Text style={styles.textButton}>Trở về</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.roundedButton} onPress={() => this.props.navigation.navigate('Chat', temp)}>
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
