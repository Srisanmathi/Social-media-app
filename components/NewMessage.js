import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import Firebase from './Firebase';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';


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



export default class NewMessage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      toUser: '',
      conversationName:'',
      message: '',
      userid: 'mPt8LR6r25W8kXBTLUDDLBcxmOx1'
    };
  }

  componentDidMount() {
    //Firebase.init();
    database = Firebase.database;
  }

  //for header
  static navigationOptions = {
    title: 'New Message',
    headerStyle: {
      backgroundColor: '#00bfff',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  onSend = () => {

    conv_id = database.ref().child('Inboxes/user_convs').push().key;
    // ref() gives database refernce to root node
    // child() gives relative database reference to path string from ref()
    //type of key is string
    console.log("conversation id========>", conv_id);    
    var usersRef = Firebase.store.collection("users");
    var query = usersRef.where("username", "==", this.state.toUser)
    .get()
    .then(snapshot => { 
        if (snapshot.empty) {
        Alert.alert("User doesn't exist");
        } 
        Alert.alert("==>User",snapshot.data());
        snapshot.forEach(doc => { 
        obj = {
        id: doc.id,
        src: doc.data().interest
        }
        images.push(obj); 
        });
        this.setState({ 
        image: images
        });
    })
    .catch(err => {  });
    
    ;


    let user_ids = ['mPt8LR6r25W8kXBTLUDDLBcxmOx1', 'yeo3BG82fmQAa5VvwZopIEMj5pb2'];
    let date = Date.now();
    
    //updating user_convs
    user_ids.forEach((user_id) => {
      database.ref('Inboxes/user_convs/' + user_id).update({ [conv_id]: true });
    })

    //updating inbox
    database.ref('Inboxes/inbox/' + conv_id).set({
      users: {},
      time_initiated: date,
      last_message: this.state.message,
      time_of_LM: date,
      conv_name: this.state.conversationName,
      conv_pic: "",
      num_messages: 1
    })
      .then(() => {
        user_ids.forEach((user_id) => {
          database.ref('Inboxes/inbox/' + conv_id + '/users/' + user_id).set({
            participant: true,
            last_seen: null
          })
        })

      })
      .catch((err) => {
        console.log("Error", err);
      }
      )
    

    //updating inb_messages
    database.ref('Inboxes/inb_messages/' + conv_id + '/0')
      .update({
        text: this.state.message,
        user: this.state.userid,
        time_sent: date
      })

      this.setState({
        message: '',
        toUser:'',
        conversationName:''
      });
      this.props.navigation.navigate('Chat', {
        conv_id: conv_id,
        conv_name: this.state.conversationName
    });
  }


  render() {

    return (

      <View>
        <View style={styles.header}>
          <Text style={styles.title}>Send Message </Text>

          <TouchableOpacity

            style={styles.button}
            onPress={this.onSend}
          >
            <Text style={styles.nextText}> Send </Text>
          </TouchableOpacity>

        </View>
        <TextInput
          value={this.state.toUser}
          onChangeText={(toUser) => this.setState({ toUser })}
          placeholder="To: (Username)"
          style={styles.name}
        />
        <TextInput
          value={this.state.conversationName}
          onChangeText={(conversationName) => this.setState({ conversationName })}
          placeholder="Conversation Name"
          style={styles.name}
        />
        <TextInput
          value={this.state.message}
          onChangeText={(message) => this.setState({ message })}
          placeholder="Type a message..."
          style={styles.message}
          multiline={true}
          numberOfLines={2}
          editable={true}
          maxLength={40}
          textAlignVertical={'top'}
        />
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    padding: 5,
  },
  title:
  {
    color: 'black',
    margin: 10,
    fontSize: 25,
    fontWeight: 'bold'
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#00bfff',
    padding: 10,
    margin: 10,
    justifyContent: 'center'
  },
  nextText:
  {
    color: 'white',
    fontSize: 15,

  },
  name: {
    height: 44,
    width:250,
    padding: 10,
    borderWidth: 1,
    borderColor: '#808080',
    margin: 10,
    marginLeft:20
  },
  message: {
    height: 100,
    padding: 10,
    borderWidth: 1,
    borderColor: '#808080',
    margin: 10,
    marginHorizontal:20
  },


});      