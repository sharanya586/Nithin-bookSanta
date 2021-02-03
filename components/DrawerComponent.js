import React, { Component } from "react";
import { Text, View } from "react-native";
import SettingScreen from "../Screens/SettingsScreen";
import { AppTabNavigator } from "./AppTabNavigator.js";
import CustomSideBarMenu from "./CustomSideBarMenu";
import { createDrawerNavigator } from "react-navigation-drawer";
import Donations from "../Screens/MyDonations";
import Notifications from "../Screens/MyNotifications";
import MineAllMine from "../Screens/RecivedBooksScreen";
import {Icon} from 'react-native-elements'
export const AppDrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: AppTabNavigator,
      navigationOptions: {
        drawerIcon: <Icon name="home" type="fontawesome5" />,
      },
    },
    Settings: {
      screen: SettingScreen,
      navigationOptions: {
        drawerIcon: <Icon name="setting" type="ant-design" />,
        drawerLabel: "Settings",
      },
    },
    Donations: {
      screen: Donations,
      navigationOptions: {
        drawerIcon: <Icon name="gift" type="font-awesome" />,
        drawerLabel: "My Donations",
      },
    },
    Notifications: {
      screen: Notifications,
      navigationOptions: {
        drawerIcon: <Icon name="bell" type="font-awesome" />,
        drawerLabel: "Notifications",
      },
    },
    RecivedBooks: {
      screen: MineAllMine,
      navigationOptions: {
        drawerIcon: <Icon name="gift" type="font-awesome" />,
        drawerLabel: "My Received Books",
      },
    },
  },
  { contentComponent: CustomSideBarMenu },
  { initalRoutename: "Home" }
);
