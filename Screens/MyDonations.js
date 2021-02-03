import React, { Component } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { DrawerItems } from "react-navigation-drawer";
import MyHeader from "../components/MyHeaderComponent";
import db from "../config";
import { ListItem } from "react-native-elements";
import firebase from "firebase";
export default class Donations extends Component {
  constructor() {
    super();
    this.state = {
      allDonations: [],
      userID: firebase.auth().currentUser.email,
    };
  }

  getDonationDetails = () => {
   
    db.collection("allDonations")
      .where("DonorID", "==", this.state.userID)
      .onSnapshot((snapshot) => {
         var allDonations = [];
        snapshot.forEach((doc) => {
          var details = doc.data();
          details["doc_id"] = doc.id;
          allDonations.push(details);
          this.setState({
            allDonations: allDonations,
          });
        });
      });
  };

  componentDidMount() {
    this.getDonationDetails();
  
  }

sendNotification=(bookDetails,requestStatus)=>{
  var message;
  if (requestStatus === "book sent") {
    message = this.state.userID + " sent you book";
  } else {
    message =
      this.state.userID + " has shown interest in donating the book";
  }
  db.collection("allNotifications").add({
    Id:this.state.userID,
    message: message,
    notificationStatus: "unread",
    date: firebase.firestore.FieldValue.serverTimestamp(),
  });
}

  sendBook = (bookDetails) => {
   
    if (bookDetails.requestedStatus === "Donor Intriuged") {
      console.log(bookDetails)
      db.collection("allDonations")
        .doc(bookDetails.doc_id)
        .update({ requestedStatus: "book sent" });

       this.sendNotification(bookDetails, "book sent");
    }
    else{
      db.collection("allDonations")
      .doc(bookDetails.doc_id)
      .update({ requestedStatus: "Donor Intriuged" });
      this.sendNotification(bookDetails, "Donor Intriuged");
    }
  };

  render() {
    return (
      <View>
        <MyHeader navigation={this.props.navigation} title="Donations" />
        {this.state.allDonations.length === 0 ? (
          <Text>List of all Donations</Text>
        ) : (
          <FlatList
            keyExtractor={(item, index) => {
              index.toString();
            }}
            data={this.state.allDonations}
            renderItem={({ item }) => {
              console.log(item.requestedStatus)
              return (
                <View>
                  <ListItem
                    title={item.BookName}
                    subtitle={item.requestedStatus}
                    
                    rightElement={
                      <TouchableOpacity
                        style={{
                          backgroundColor:
                            item.requestedStatus == "book sent"
                              ? "green"
                              : "red",
                        }}
                        onPress={() => {
                          this.sendBook(item);
                        }}
                      >
                        <Text>
                          {item.requestedStatus == "book sent"
                            ? "Book Sent"
                            : "Send Book"}
                        </Text>
                      </TouchableOpacity>
                    }
                  ></ListItem>
                </View>
              );
            }}
          ></FlatList>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  subContainer: {
    flex: 1,
    fontSize: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: 100,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#32867d",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
  },
  view: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
