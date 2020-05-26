import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

class Button extends React.Component {
    render() {
        const { style, ...otherProps } = this.props;
        const { label, onPress } = this.props;
        return (
            <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
                <Text style={[styles.text, style]}>{label}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#7444C0",
        marginBottom: 12,
        paddingVertical: 12,
        borderRadius: 4,
        borderWidth: StyleSheet.hairlineWidth,
    },
    text: {
        color: "#FFF",
        textAlign: "center",
        height: 20,
    }
});

export default Button;