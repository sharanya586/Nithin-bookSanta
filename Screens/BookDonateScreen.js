import React from "react";
import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import db from "../config.js";
import { ListItem } from "react-native-elements";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { useTheme } from "react-navigation";
import MyHeader from "../components/MyHeaderComponent.js";
export default class Donate extends React.Component {
  constructor() {
    super();
    this.state = {
      RequestBookList: [],
    };
  }

  componentDidMount() {
    this.getRequestBookList();
  }

  getRequestBookList = () => {
    db.collection("Requested_Books").onSnapshot((Snapshot) => {
      var RequestBookList = Snapshot.docs.map((document) => document.data());
      this.setState({ RequestBookList: RequestBookList });
    });
  };

  render() {
    return (
      <ScrollView>
        <View style={{ backgroundColor: "black" }}>
          <MyHeader navigation={this.props.navigation} title="Donate" />
          <Text>Donate</Text>
          <FlatList
            keyExtractor={(item, index) => {
              index.toString();
            }}
            data={this.state.RequestBookList}
            renderItem={({ item, i }) => {
              return (
                <ListItem
                  title={item.BookName}
                  subtitle={item.Reason}
                  key={i}
                  rightElement={
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => {
                        this.props.navigation.navigate("recieverDetails", {
                          details: item,
                        });
                      }}
                    >
                      <Text>Donate</Text>
                    </TouchableOpacity>
                  }
                bottomDivider
                ></ListItem>
              );
            }}
            
          ></FlatList>
        </View>
      </ScrollView>
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
    
  },
  view: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
