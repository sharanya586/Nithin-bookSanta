import React from "react";
import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import db from "../config.js";
import { ListItem } from "react-native-elements";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { useTheme } from "react-navigation";
import firebase from "firebase";
import MyHeader from "../components/MyHeaderComponent.js";
export default class MineAllMine extends React.Component {
  constructor() {
    super();
    this.state = {
      UserID: firebase.auth().currentUser.email,
      RecivedBookList: [],
    };
  }

  componentDidMount() {
    this.getRecivedBookList();
  }

  getRecivedBookList =  () => {
    console.log("is this fucntion called");
     db
      .collection("recivedBooks")
      .where("UserID", "==", this.state.UserID)
      .where("bookStatus", "==", "recived")
      .onSnapshot((snapshot) => {
        var RecivedBookList =[];
         snapshot.docs.map((doc) => {
          var document = doc.data();
          console.log(document)
          RecivedBookList.push(document)
          this.setState({
            RecivedBookList: RecivedBookList,
          });
          console.log(this.state.RecivedBookList);
        });
      });
  };

  keyExtractor = (item, index) => {
    index.toString();
  };

  renderItem = ({ item, i }) => {
    return (
      <ListItem
        key={i}
        title={item.BookName}
        subtitle={item.BookStatus}
        titleStyle={{ color: "black", fontWeight: "bold" }}
        bottomDivider
      />
    );
  };

  render() {
    return (
      <View>
        <MyHeader navigation={this.props.navigation} title="Received books" />
        {this.state.RecivedBookList.length === 0 ? (
          <View>
            <Text>List Of Recived Books:</Text>
          </View>
        ) : (
          <FlatList
            keyExtractor={this.keyExtractor}
            data={this.state.RecivedBookList}
            renderItem={this.renderItem}
          />
        )}
      </View>
    );
  }
}
