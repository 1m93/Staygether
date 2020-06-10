import React from 'react';
import { Text } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat'; 
import firebase from 'firebase'; 


class Chat extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    title: (navigation.state.params || {}).name || 'Chat!',
  });

  state = {
    messages: [],
  };

  get ref() {
    var email1 = firebase.auth().currentUser.email;
    var email2 = this.props.navigation.state.params.email;
    id1 = email1.replace('.', ',');
    id2 = email2.replace('.', ',');
    if (id1 > id2) {
      return firebase.database().ref('messages/' + id1 + id2);
    }
    else {
      return firebase.database().ref('messages/' + id2 + id1);
    }
    
  }

  on = callback =>
      this.ref
        .limitToLast(20)
        .on('child_added', snapshot => callback(this.parse(snapshot)));

  parse = snapshot => {
    const { timestamp: numberStamp, text, user } = snapshot.val();
    const { key: _id } = snapshot;
    
    const timestamp = new Date(numberStamp);
    
    const message = {
      _id,
      timestamp,
      text,
      user,
    };
   return message;
  }

  off() {
    this.ref.off();
  }

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }

  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }
  
  send = messages => {
    for (let i = 0; i < messages.length; i++) {
      const { text, user } = messages[i];
      const message = {
        text,
        user,
        timestamp: this.timestamp,
      };
      this.append(message);
    }
  };
  append = message => this.ref.push(message);

  get user() {
    return {
      email: firebase.auth().currentUser.email,
      _id: this.uid,
    };
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={this.send}
        user={this.user}
        isTyping={true}
      />
    );
  }

  componentDidMount() {
    this.on(message =>
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message),
      }))
    );
  }
  componentWillUnmount() {
    this.off();
  }
}

export default Chat;
