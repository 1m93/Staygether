import React from 'react';
import { View, ImageBackground } from 'react-native';
import CardStack, { Card } from 'react-native-card-stack-swiper';
import City from '../components/City';
import Filters from '../components/Filters';
import CardItem from '../components/CardItem';
import styles from '../assets/styles';
import Demo from '../assets/data/demo.js';
import firebase from './firebase.js'


export default class Home extends React.Component {
  
  constructor (props){
    super(props);
    this.state={
      Data: [],
  };
  }
 
  componentDidMount() {
    this.renderData();
  }

  renderData() {
    var data = [];
    firebase.database().ref('UsersStatus').on('value', (snapshot) =>{
        snapshot.forEach((dt) =>{
          data.push({image: dt.val().image, match:dt.val().match,name: dt.val().name, description: dt.val().description, email: dt.val().email});
      })})
    this.setState({Data: data},()=> {
      console.log(this.state.Data)
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
        {this.state.Data.map((item, index) => (
        <CardStack
          loop={false}
          verticalSwipe={false}
          renderNoMoreCards={() => null}
          ref={swiper => (this.swiper = swiper)}
        >
            <Card key={index}>
              <CardItem
                image={require('../assets/images/02.jpg')}
                name={item.name}
                description={item.description}
                matches={item.match}
                actions
                onPressLeft={() => {
                  this.swiper.swipeLeft()}}
                onPressRight={() => {
                  this.swiper.swipeRight()}}
              />
            </Card>
        </CardStack>
        ))}
      </View>
    </ImageBackground>
  );
};
}


