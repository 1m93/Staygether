import React from 'react';
import styles from '../assets/styles';

import { Text, View } from 'react-native';
import Icon from './Icon';

const ProfileItem = ({
    age,
    gender,
    describe,
    require,
    address,
    location,
    price,
    name,
    role,
    acreage,
    roomDescribe,
}) => {
    return (
        <View style={styles.containerProfileItem}>
            <View style={styles.matchesProfileItem}>
                <Text style={styles.matchesTextProfileItem}>
                    {price.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VND
                </Text>
            </View>

            <Text style={styles.name}>{name}</Text>
            <Text style={{ fontSize: 17, color: "#7444C0", marginTop: -10, marginBottom: 0, textAlign: "center" }}>{role}</Text>

            <Text style={styles.descriptionProfileItem}>
                {address}, {location}
            </Text>

            <View style={styles.info}>
                <Text style={styles.iconProfile}>
                    <Icon name="user" />
                </Text>
                <Text style={styles.infoContent}>{gender}, {age} tuổi</Text>
            </View>

            <View style={styles.info}>
                <Text style={styles.iconProfile}>
                    <Icon name="circle" />
                </Text>
                <Text style={styles.infoContent}>{describe}</Text>
            </View>

            <View style={styles.info}>
                <Text style={styles.iconProfile}>
                    <Icon name="hashtag" />
                </Text>
                <Text style={styles.infoContent}>{require}</Text>
            </View>

            {
                role == "Đã có phòng" &&
                (
                    <View style={styles.info}>
                        <Text style={styles.iconProfile}>
                            <Icon name="calendar" />
                        </Text>
                        <Text style={styles.infoContent}>Phòng rộng {acreage} m2, {roomDescribe}</Text>
                    </View>
                )
            }
        </View>
    );
};

export default ProfileItem;
