import * as React from 'react';
import { StyleSheet, TextInput, TextInputProps, Keyboard, TouchableWithoutFeedback, View } from 'react-native';

class FormTextInput extends React.Component {
    constructor(props) {
        super(props);
        this.TextInput = React.createRef();
    }
    focus = () => {
        if (this.TextInput.current) {
            this.TextInput.current.focus();
        }
    };
    render() {
        const { style, ...otherProps } = this.props;
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View>
                    <TextInput
                        ref={this.TextInput}
                        selectionColor="#7444C0"
                        style={[styles.textinput, style]}
                        {...otherProps}
                    />
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    textinput: {
        height: 40,
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginBottom: 20
    }
});

export default FormTextInput;