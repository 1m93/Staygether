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
  
  constructor (props){
    super(props);
    this.state={
      Data: [],
  };
  }
  componentDidMount() {
    var data = [];
    firebase.database().ref('UsersData/').on('value', (snapshot) =>{
        snapshot.forEach((dt) =>{
          data.push({image: dt.val().url, price:dt.val().price,name: dt.val().name, describe: dt.val().describe, email: dt.val().email});
      });
      data = shuffleArray(data);
      this.setState({Data: data},()=> {
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
                description={item.describe}
                matches={item.price}
                actions
                onPressLeft={() => {
                  this.swiper.swipeLeft()}}
                onPressRight={() => {
                  this.swiper.swipeRight()}}
              />
            </Card>
            ))}
        </CardStack>
        
      </View>
    </ImageBackground>
  );
};
}


