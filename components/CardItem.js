import React from 'react';
import styles from '../assets/styles';

import { Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import Icon from './Icon';

const CardItem = ({
    actions,
    role,
    description,
    matchDescription,
    image,
    matches,
    name,
    onPressLeft,
    onPressRight,
    variant
}) => {
    // Custom styling
    const fullWidth = Dimensions.get('window').width;
    const imageStyle = [
        {
            borderRadius: 8,
            width: variant ? fullWidth / 2 - 30 : fullWidth - 80,
            // height: variant ? 170 : 350,
            height: variant ? fullWidth / 2 - 30 : fullWidth - 100,
            margin: variant ? 0 : 20
        }
    ];

    const nameStyle = [
        {
            paddingTop: variant ? 10 : 15,
            paddingBottom: variant ? 5 : 7,
            color: '#363636',
            fontSize: variant ? 15 : 30
        }
    ];

    return (
        <View style={styles.containerCardItem}>
            {/* IMAGE */}
            <Image source={{ uri: image }} style={imageStyle} />

            {/* MATCHES */}
            {matches && (
                <View style={styles.matchesCardItem}>
                    <Text style={styles.matchesTextCardItem}>
                        {matches.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VND
                    </Text>
                </View>
            )}

            {/* NAME */}
            <Text style={nameStyle}>{name}</Text>

            {/* ROLE */}
            {role && (
                <Text style={{ fontSize: 17, color: "#7444C0", marginTop: -12, marginBottom: 7 }}>{role}</Text>
            )}

            {/* DESCRIPTION */}
            {description && (
                <Text style={styles.descriptionCardItem}>{description}</Text>
            )}

            {matchDescription && (
                <Text style={styles.matchDescription}>{matchDescription}</Text>
            )}

            {/* ACTIONS */}
            {actions && (
                <View style={styles.actionsCardItem}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => onPressLeft()}
                    >
                        <Text style={styles.dislike}>
                            <Icon name="dislike" />
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => onPressRight()}
                    >
                        <Text style={styles.like}>
                            <Icon name="like" />
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

export default CardItem;
