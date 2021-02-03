import React from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableHighlight,
  TouchableOpacity
} from "react-native";

import db from "../config.js";
import firebase from "firebase";
import MyHeader from "../components/MyHeaderComponent.js";


export default class Request extends React.Component {
  constructor() {
    super();
    this.state = {
      Reason: "",
      BookName: "",
      UserID: firebase.auth().currentUser.email,
      requestedBookName: "",
      bookStatus: "",
      docId: "",
      requestID: "",
      dataSource: "",
      showFlatlist: "",
      userDocID:" "
    };
  }

  isBookRequestActive = () => {
    db.collection("users")
      .where("email", "==", this.state.UserID)
      .onSnapshot((snapshot) =>
        snapshot.forEach((doc) => {
          this.setState({
            isBookRequestActive: doc.data().isBookRequestActive,
            userDocID: doc.id,
          });
          console.log(this.state.userDocID);
        })
      );
  };

  componentDidMount() {
    this.isBookRequestActive();
  }

  getBookRequest = () => {
    db.collection("Requested_Books")
      .where("UserId", "==", this.state.UserID)
      .onSnapshot((snapshot) =>
        snapshot.forEach((doc) => {
          if (doc.data().book_status !== "recived") {
            this.setState({
              requestedBookName: doc.data().BookName,
              bookStatus: doc.data().book_status,
              docId: doc.id,
            });
          }
        })
      );
  };

  updateBookRequestStatus = () => {
    db.collection("users")
      .where("email", "==", this.state.UserID)
      .get()
      .then((snapshot) =>
        snapshot.forEach((doc) => {
          var document = doc.data();
          db.collection("users")
            .doc(docId)
            .update({ isBookRequestActive: false });
        })
      );
  };

  recivedBooks = (x) => {
    db.collection("recivedBooks").add({
      UserID: this.state.UserID,
      BookName: this.state.requestedBookName,
      bookStatus: "recived",
      requestID: this.state.requestID,
    });
  };

  addRequest = (BookName, Reason) => {
    db.collection("Requested_Books").add({
      BookName: BookName,
      Reason: Reason,
      UserId: this.state.UserID,
      UniqueID: Math.random().toString(36).substring(8),
      book_status: "requested",
    });
    alert("Your book has started the process.");
    this.setState({ Reason: "", BookName: "" });
    db.collection("users")
      .where("email", "==", this.state.UserID)
      .get()
      
      .then((snapshot) =>
        snapshot.forEach((doc) => {
          console.log(doc.id);
          db.collection("users")
            .doc(doc.id)
            .update({ isBookRequestActive: true });
        })
      );
  };

  async getBooksFromApi(BookName) {
    //AIzaSyDjILFQF5f7Ygz2vniA3PRvFc_oG9j9q7g
    this.setState({ BookName: BookName });
    if (bookName.length > 2) {
      var books = await BookSearch.searchbook(
        bookName,
        "AIzaSyASyOjOtJla-X-b3io2eLoaUc_bIRFSIIc"
      );
      this.setState({
        dataSource: books.data,
        showFlatlist: true,
      });
    }
  }

  renderItem = ({ item, i }) => {
    //console.log("image link ");

    let obj = {
      title: item.volumeInfo.title,
      selfLink: item.selfLink,
      buyLink: item.saleInfo.buyLink,
      imageLink: item.volumeInfo.imageLinks,
    };
    return (
      <TouchableHighlight
        style={{
          alignItems: "center",
          backgroundColor: "#DDDDDD",
          padding: 10,

          width: "90%",
        }}
        activeOpacity={0.6}
        underlayColor="#DDDDDD"
        onPress={() => {
          this.setState({
            showFlatlist: false,
            bookName: item.volumeInfo.title,
          });
        }}
        bottomDivider
      >
        <Text> {item.volumeInfo.title} </Text>
      </TouchableHighlight>
    );
  };

  render() {
    this.getBookRequest();
    if (this.state.isBookRequestActive === true) {
      return (
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text>BookName:{this.state.requestedBookName}</Text>
          <Text>Requested</Text>
          <TouchableOpacity
            style={{
              backgroundColor: "green",
              borderWidth: 1,
              borderColor: "orange",
            }}
            onPress={() => {
              this.updateBookRequestStatus(),
                this.recivedBooks(this.state.requestedBookName);
            }}
          >
            <Text>I recived the book.</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={{ alignItems: "center", flex: 1 }}>
          <MyHeader navigation={this.props.navigation} title="Request" />
          <Text>My Mascot</Text>
          <Image
            source={require("../assets/download2.png")}
            style={{ width: 50, height: 50 }}
          ></Image>
          <Text>Request</Text>
          <TextInput
            style={{ borderWidth: 2, width: 100, height: 35 }}
            placeholder={"Name"}
            onChangeText={(text) =>{ this.getBooksFromApi(text)}}
            value={this.state.BookName}
          ></TextInput>

{  this.state.showFlatlist ?

(  <FlatList
data={this.state.dataSource}
renderItem={this.renderItem}
enableEmptySections={true}
style={{ marginTop: 10 }}
keyExtractor={(item, index) => index.toString()}
/> )
:(
  
  <View style={{alignItems:'center'}}>
<TextInput
            style={{ borderWidth: 2, width: 100, height: 35, marginTop: 20 }}
            placeholder={"Reason"}
            onChangeText={(text) => this.setState({ Reason: text })}
            value={this.state.Reason}
          ></TextInput>
          <TouchableOpacity
            style={{
              width: 100,
              height: 40,
              backgroundColor: "lightgreen",
              borderWidth: 2,
              marginTop: 20,
              shadowColor: "#000000",
              shadowOffset: { width: 10, height: 10 },
              shadowOpacity: 0.5,
              shadowRadius: 10.32,
              elevation: 10,
            }}
            onPress={() => {
              this.addRequest(this.state.BookName, this.state.Reason);
            }}
          >
            <Text>Request</Text>
          </TouchableOpacity>
  </View>

)}
          
        </View>
      );
    }
  }
}
