import React, { Component } from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import NewMessage from './components/NewMessage';
import Inbox from './components/Inbox';
import Chat from './components/Chat';
import Firebase from './components/Firebase';
import Login from './components/Login';
import Signup from './components/Signup';
import Signup_next from './components/Signup_next';
import ThreeWayNavigation from './components/ThreeWayNavigation';
//Using 'react-navigation'for routing
//createStackNavigator returns a react component
const RootStack = createStackNavigator(

  //route configuration object
  {
    Login:Login,
    Signup: Signup,
    Signup_next: Signup_next,
    NewMessage:NewMessage,
    Inbox: Inbox,
    Chat: Chat,
    ThreeWayNavigation: ThreeWayNavigation
    
  },
  {
    initialRouteName: "Login"
  }

);

const AppContainer = createAppContainer(RootStack);

export default class App extends Component {

  componentWillMount(){
    Firebase.init();
  }  
  
  render() {
    return <AppContainer />;
  }
}  