import React, { Component } from 'react'
import { Text, View,FlatList } from 'react-native'
import { DrawerItems } from 'react-navigation-drawer'
import MyHeader from '../components/MyHeaderComponent';
import firebase from 'firebase';
import db from '../config';
import {ListItem} from 'react-native-elements'
export default class Notifications extends Component {
    constructor() {
        super();
        this.state = {
          allNotifications: [],
          userID: firebase.auth().currentUser.email,
        };
      }
    
      getallNotifications = () => {
       
        db.collection("allNotifications")
          .where("Id", "==", this.state.userID)
          .onSnapshot((snapshot) => {
             var allNotifications = [];
            snapshot.forEach((doc) => {
              var details = doc.data();
              details["doc_id"] = doc.id;
              allNotifications.push(details);
              this.setState({
                allNotifications: allNotifications,
              });
            });
          });
      };
    
      componentDidMount() {
        this.getallNotifications();
      
      }
    render() {
        return (
            <View>
                <MyHeader navigation={this.props.navigation} title="Notifications" />
               
                {this.state.allNotifications.length === 0 ? (
          <Text>Wow you actually got notified I didn't know you had friends!</Text>
        ) : (
          <FlatList
            keyExtractor={(item, index) => {
              index.toString();
            }}
            data={this.state.allNotifications}
            renderItem={({ item }) => {
             
              return (
                <View>
                  <ListItem
                    title={item.BookName}
                    subtitle={item.message}
                  ></ListItem>
                </View>
              );
            }}
          ></FlatList>
        )}
      </View>
           
        )
    }
}