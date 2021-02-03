import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
  Image,
  ToastAndroid,
} from "react-native";
import db from "../config.js";
import firebase from "firebase";

export default class WelcomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "a@b.com",
      password: "123456",
      isVisibleModal: false,
      confirmPassword: "",
      contact: "",
      address: "",
      firstName: "",
      lastName: "",
    };
  }

  userSignUp = (email, password, confirmPassword) => {
    if (password !== confirmPassword) {
      alert("The passwording planets haven't aligned");
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((/*response*/) => {
          db.collection("users").add({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            contact: this.state.contact,
            address: this.state.address,
            email: this.state.email,
            password: this.state.password,
            isBookRequestActive: false,
          });
          // alert("User Added Successfully",[{text:'ok', onPress:()=>{this.setState({isVisibleModal:false})}}])
          // ToastAndriod.show("User Added Successfully");
        })
        .catch(function (error) {
          var errorcode = error.code;
          alert(error.message);
        });
      //IFTTT
    }
  };

  userLogIn = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        return this.props.navigation.navigate("donateBooks");
      })
      .catch(function (error) {
        var errorcode = error.code;
        alert(error.message);
      });
    //IFTTT
  };

  showModal = () => {
    return (
      <Modal visible={this.state.isVisibleModal}>
        <View style={styles.modal}>
          <ScrollView>
            <KeyboardAvoidingView>
              <Text style={styles.label}>Welcome to Book Santa</Text>
              <TextInput
                placeholder="First Name"
                style={styles.loginBox}
                onChangeText={(text) => {
                  this.setState({ firstName: text });
                }}
              ></TextInput>
              <TextInput
                placeholder="Last Name"
                style={styles.loginBox}
                onChangeText={(text) => {
                  this.setState({ lastName: text });
                }}
              ></TextInput>
              <TextInput
                placeholder="Contact"
                style={styles.loginBox}
                onChangeText={(text) => {
                  this.setState({ contact: text });
                }}
              ></TextInput>
              <TextInput
                placeholder="Address"
                style={styles.loginBox}
                onChangeText={(text) => {
                  this.setState({ address: text });
                }}
              ></TextInput>
              <TextInput
                placeholder="Email"
                style={styles.loginBox}
                onChangeText={(text) => {
                  this.setState({ email: text });
                }}
              ></TextInput>
              <TextInput
                placeholder="Password"
                style={styles.loginBox}
                onChangeText={(text) => {
                  this.setState({ password: text });
                }}
              ></TextInput>
              <TextInput
                placeholder="Comfirm Password"
                style={styles.loginBox}
                onChangeText={(text) => {
                  this.setState({ confirmPassword: text });
                }}
              ></TextInput>
              <TouchableOpacity
                style={styles.registerButton}
                onPress={() => {
                  this.userSignUp(
                    this.state.email,
                    this.state.password,
                    this.state.confirmPassword
                  );
                }}
              >
                <Text style={styles.registerButtonText}>Register</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.registerButton}
                onPress={() => this.setState({ isVisibleModal: false })}
              >
                <Text style={styles.registerButtonText}>Cancel</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </Modal>
    );
  };

  render() {
    return (
      <View style={styles.viewstyle}>
        {this.showModal()}

        <Image
          style={styles.santaImage}
          source={require("../assets/unnamed.png")}
        ></Image>
        <TextInput
          style={styles.TextInput}
          onChangeText={(text) => {
            this.setState({ email: text });
          }}
          placeholder="Email"
          keyboardType="email-address"
          value="a@b.com"
        ></TextInput>
        <TextInput
          style={styles.TextInput}
          onChangeText={(text) => {
            this.setState({ password: text });
          }}
          placeholder="Password"
          keyboardType="visible-password"
          value="123456"
        ></TextInput>
        <TouchableOpacity
          style={styles.Button}
          onPress={() => {
            /*this.userSignUp(this.state.email,this.state.password)*/ this.setState(
              { isVisibleModal: true }
            );
          }}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.Button}
          onPress={() => {
            this.userLogIn(this.state.email, this.state.password);
          }}
        >
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "white",
    flex:1
  },
  viewstyle: {
    flex: 1,
    backgroundColor: "#2C3E50",
    alignItems: "center",
    justifyContent: "center",
  },

  container: {
    flex: 1,
    backgroundColor: "#6fc0b8",
  },
  loginBox: {
    borderWidth: 2,
    borderRadius: 5,
    marginTop: 10,
    width: "80%",
    height: 30,
    borderColor: "black",
    marginLeft: 15,
  },
  button: {
    width: "80%",

    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "#ffff",
    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10.32,
    elevation: 16,
  },
  buttonText: {
    color: "gold",
    fontWeight: "bold",
    alignSelf: "center",
    marginTop: 10,
  },
  label: {
    color: "#E75400",
    fontWeight: "bold",
    marginLeft: 5,
  },
  formInput: {
    width: "90%",

    borderWidth: 1,
    borderRadius: 2,
    borderColor: "grey",
  },
  registerButton: {
    width: 75,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: "#E75400",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginLeft: 35,
    marginTop: 10,
  },
  registerButtonText: {
    fontWeight: "bold",
    color: "#fff",
  },
  cancelButtonText: {
    fontWeight: "bold",
    color: "#32867d",
  },
  scrollview: {
    flex: 1,
    backgroundColor: "#fff",
  },
  signupView: {
    flex: 0.05,
    justifyContent: "center",
    alignItems: "center",
  },
  signupText: {
    fontWeight: "bold",
    color: "#32867d",
  },
  santaView: {
    flex: 0.85,
    justifyContent: "center",
    alignItems: "center",
  },
  santaImage: {
    width: 200,
    height: 200,
  },
  TextInput: {
    borderWidth:2,
    borderRadius:5,
    borderColor:"gold",
    width:150,
    height:35,
    marginTop:10,
    color:"white"
  },
  bookImage: {
    width: "100%",
  },
  Button: {
    backgroundColor: "red",
    borderWidth: 2,
    borderRadius: 5,
    width: 100,
    height: 40,
    marginTop: 10,
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.1,
  },
  TextBox: {
    borderWidth: 2,
  },
});
