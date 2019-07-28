import React, {Component} from 'react';
import { StyleSheet, Text, TextInput, View, Button, Image, Alert } from 'react-native';
import Firebase from './Firebase';
import Email from './util/Email';
import DateTimePicker from "react-native-modal-datetime-picker";
import KeyboardShift from './util/KeyboardShift'; 
import { firestore } from 'firebase';

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

export default class Signup extends Component { 
    
  constructor(props) {
    super(props);    
    this.state = {
       first_name:'',
       last_name:'',
       email : '',  
       phone :'',
      // emailEnabled : true     
    };    
    this.handler = this.handler.bind(this);
  } 

  //for header
  static navigationOptions = {
    title: 'Sign Up',
    headerStyle: {
      backgroundColor: '#00bfff',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };
 
  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };

  diff_years(dt2, dt1) 
 {

  var diff =(dt2.getTime() - dt1.getTime()) / 1000;
  diff /= (60 * 60 * 24);
  return Math.abs(Math.round(diff/365.25));
   
 }
 
  handleDatePicked = date => {
    var date = new Date(date.getFullYear().toString(), date.getMonth().toString(), date.getDate().toString());
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1;
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear(); 
    var date_now = new Date(year,month,day);
    this.state.age = this.diff_years(date, date_now);
    this.setState({ birthday: date.getMonth().toString() + '/' +  date.getDate().toString() + '/' +  date.getFullYear().toString() });
    this.hideDateTimePicker();
  };

  handler= (e) => {
    this.setState({
        email:e
    });
  }

  handlePhoneChange= () => {
    this.setState({
      emailEnabled : !this.state.emailEnabled
  });
  }

  render(){
    return (
      <KeyboardShift>
        {() => (
            <View style={styles.container}>
              <View style={styles.logoContainer}>          
                  <Image style={styles.logo} source={require('./pictures/logo.png')} />
                  <Text style={styles.title}>Create your account</Text>  
              </View>  
              
              <TextInput
                value={this.state.first_name}
                onChangeText={(first_name) => this.setState({ first_name })}
                placeholder="First Name"
                style={styles.input}
              />

              <TextInput
                value={this.state.last_name}
                onChangeText={(last_name) => this.setState({ last_name })}
                isVisible={false}
                placeholder="Last Name"
                style={styles.input}
              />
              {/* {
                this.state.emailEnabled ? 
                    <View> */}
                      <TextInput
                        value={this.state.email}
                        onChangeText={(email) => this.setState({ email })}
                        placeholder="email@gmail.com"
                        style={styles.input}
                      />  
                      {/* <Text 
                        style={styles.text}
                        onPress={this.handlePhoneChange()}>Use phone number instead.
                      </Text>
                    </View>   : 
                    null */}
                     {/* <PhoneInput */}
                    {/* //     placeholder="Enter phone number"
                    //     value={ this.state.phone }
                    //     onChange={ (phone) => this.setState({ phone }) }
                    //   /> 
              //} */}

              <TextInput 
                  isVisible ={ false }
                  style={styles.input}
                  placeholder="mm/dd/yyyy"
                  value={this.state.birthday}
                  onFocus={this.showDateTimePicker}
              />
              <DateTimePicker
                isVisible={this.state.isDateTimePickerVisible}
                onConfirm={this.handleDatePicked}
                onCancel={this.hideDateTimePicker}
              />    

              
              <Button
                title="Next"    
                color="#00bfff"    
                onPress={() => {    
                  
                  const {first_name, last_name,email,birthday} = this.state;
                  Firebase.registrationInfo.first_name = first_name;
                  Firebase.registrationInfo.last_name = last_name;
                  Firebase.registrationInfo.email = email;
                  Firebase.registrationInfo.birthday = birthday;
                  if(this.state.age<13){
                    Alert.alert("You must be over 13 years old to use Resolve");
                  }
                  else{
              
                    this.props.navigation.navigate('Signup_next'); 
                  }        
                }}
              />        
            </View>
       )}
       </KeyboardShift>  
    );
  }  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  logoContainer: {        
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  logo: {
    width: 120,
    height: 120
  },
  title:
  {
    color: 'black',
    margin: 15,
    fontSize: 25,
    fontWeight: 'bold'
  },
  option:
  {
    flexDirection:"row"
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    margin: 20,
  },
  text: {
    marginTop: 5,
    color:"#1e90ff"
  },
});