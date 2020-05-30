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
              <Card key={index}>
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
                    var user = firebase.auth().currentUser;
                    arr1 = user.email.split('.');
                    arr2 = item.email.split('.');
                    let id1 = '', id2 = '';
                    for (let i = 0; i < arr1.length - 1; i++) {
                        id1 = id1 + arr1[i] + ',';
                    }
                    id1 = id1 + arr1[arr1.length - 1];
                    for (let i = 0; i < arr2.length - 1; i++) {
                      id2 = id2 + arr2[i] + ',';
                    }
                    id2 = id2 + arr2[arr2.length - 1];
                    firebase.database().ref('DataMactch/' + id1 + '/Match').push({
                      email: item.email,
                    })
                    firebase.database().ref('DataMactch/' + id2 + '/Matched').push({
                      email: user.email,
                    })

                    this.swiper.swipeLeft()
                  }}
                  onPressRight={() => {
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


