
import React, { Component } from 'react';

import {
  createStackNavigator,
  createMaterialTopTabNavigator,
  createAppContainer,
} from 'react-navigation';

 
import Following from './Following';
import Followers from './Followers';
import Interests from './Interests';

//To ignore the yellow box warning which pops up on the screen
import { YellowBox } from 'react-native';
import _ from 'lodash';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

//Making TabNavigator which will be called in App StackNavigator
//we can directly export the TabNavigator also but header will not be visible
//as header comes only when we put anything into StackNavigator and then export
const TabNavigator = createMaterialTopTabNavigator(
  {
    Following: { screen: Following },
    Followers: { screen: Followers },
    Interests: { screen: Interests },
  },
  {
    tabBarPosition: 'top',
    swipeEnabled: true,
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor: 'black',
      inactiveTintColor: '#808080',
      style: {
        backgroundColor: 'white',
      },
      labelStyle: {
        textAlign: 'center',
      },
      indicatorStyle: {
        borderBottomColor: '#87B56A',
        borderBottomWidth: 2,
      },
    },
  }
);
 


const AppContainer = createAppContainer(TabNavigator);

export default class ThreeWayNavigation extends Component {
  //for header
  static navigationOptions = {
    title: 'Zoe Schiller',
    headerStyle: {
      backgroundColor: '#00bfff',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  render() {
    return <AppContainer />;
  }
}  