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
        age = temp.age;
        image = temp.image;
        gender = temp.gender;
        describe = temp.describe;
        require = temp.require;
        phone = temp.phone;
        address = temp.address;
        location = temp.location;
        price = temp.price;
        name = temp.name;
        role = temp.role;
        acreage = temp.acreage;
        roomDescribe = temp.roomDescribe;

        return (
            <ImageBackground
                style={styles.bg}
            >
                <ScrollView style={styles.containerProfile}>
                    <ImageBackground source={{ uri: image }} style={styles.photo}>
                    </ImageBackground>

                    <ProfileItem
                        price={price}
                        name={name}
                        age={age}
                        address={address}
                        location={location}
                        gender={gender}
                        describe={describe}
                        require={require}
                        role={role}
                        acreage={acreage}
                        roomDescribe={roomDescribe}
                    />

                    <View style={styles.actionsProfile}>
                        <TouchableOpacity style={styles.roundedButton} onPress={() => this.props.navigation.navigate('Main')}>
                            <Text style={styles.topIconLeft}>
                                <Icon name="chevronLeft" />
                            </Text>
                            <Text style={styles.textButton}>  Trở về</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.roundedButton} onPress={() => this.props.navigation.navigate('Chat', temp)}>
                            <Text style={styles.iconButton}>
                                <Icon name="chat" />
                            </Text>
                            <Text style={styles.textButton}>  Nhắn tin</Text>
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
