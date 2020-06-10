import React from 'react';
import { View, ImageBackground } from 'react-native';
import CardStack, { Card } from 'react-native-card-stack-swiper';
import City from '../components/City';
import Filters from '../components/Filters';
import CardItem from '../components/CardItem';
import styles from '../assets/styles';
import Demo from '../assets/data/demo.js';
import { render } from 'react-dom';
import firebase from '../containers/firebase';
import shuffleArray from '../components/ShuffleArray';

export default class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      Data: [],
    };
  }
  componentDidMount() {
    var data = [];
    var dataNotShow = [];
    var user = firebase.auth().currentUser;
    
    id1 = user.email.replace('.', ',');
    firebase.database().ref('DataMactch/' + id1 + '/Match').on('value', (snapshot) => {
      snapshot.forEach((dt) => {
        dataNotShow.push(dt.val().email);
      })
    })
    firebase.database().ref('DataMactch/' + id1 + '/Dislike').on('value', (snapshot) => {
      snapshot.forEach((dt) => {
        dataNotShow.push(dt.val().email);
      })
    })

    firebase.database().ref('UsersData/').once('value', (snapshot) => {
      snapshot.forEach((dt) => {
        if ((user.email != dt.val().email) && (!dataNotShow.includes(dt.val().email))) {
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
          });
        }
      });
      data = shuffleArray(data);
      this.setState({ Data: data }, () => {
        console.log(this.state.Data)
      })
    })
  }

  render() {
    function match(item) {
      var user = firebase.auth().currentUser;
      id1 = user.email.replace('.', ',');
      id2 = item.email.replace('.', ',');
      firebase.database().ref('DataMactch/' + id1 + '/Match/' + id2).set({
        email: item.email,
      })
      firebase.database().ref('DataMactch/' + id2 + '/Matched/' + id1).set({
        email: user.email,
      })
    }

    function dislike(item) {
      var user = firebase.auth().currentUser;
      id1 = user.email.replace('.', ',');
      id2 = item.email.replace('.', ',');
      firebase.database().ref('DataMactch/' + id1 + '/Dislike/' + id2).set({
        email: item.email,
      })
    }

    return (
      <ImageBackground
        source={require('../assets/images/bg.png')}
        style={styles.bg}
      >
        <View style={styles.containerHome}>
          <View style={styles.top}>
            <City />
            <Filters />
          </View>

          <CardStack
            loop={false}
            verticalSwipe={false}
            renderNoMoreCards={() => null}
            ref={swiper => (this.swiper = swiper)}
          >
            {this.state.Data.map((item, index) => (
              <Card
                key={index}
                onSwipedLeft={() => {
                  match(item);
                }}
                onSwipedRight={() => {
                  dislike(item);
                }}
              >
                <CardItem
                  image={item.image}
                  name={item.name}
                  description={
                    "Tuổi: " + item.age + "\n" +
                    "Giới tính: " + item.gender + "\n" +
                    "Địa chỉ: " + item.address + "\n" +
                    "Mô tả: " + item.describe + "\n" +
                    "Yêu cầu: " + item.require
                  }
                  matches={item.price}
                  actions
                  onPressLeft={() => {
                    match(item);
                    this.swiper.swipeLeft()
                  }}
                  onPressRight={() => {
                    dislike(item);
                    this.swiper.swipeRight()
                  }}
                />
              </Card>
            ))}
          </CardStack>

        </View>
      </ImageBackground>
    );
  };
}


