import React, {Component} from 'react';
import { StyleSheet, Image, Text, TextInput, View, Button, Alert } from 'react-native';
import Firebase from './Firebase';

//Package to make the textbox visible while typing
import KeyboardShift from './util/KeyboardShift'; 

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

export default class Login extends Component {  
  
  constructor(props) {
    super(props);    
    this.state = {
      email: '',
      password: '',
      isIncorrect: false
    };    
  }  

  //for header
  static navigationOptions = {
    title: 'Login',
    headerStyle: {
      backgroundColor: '#00bfff',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  loginHandler = () =>{
             
      Firebase.auth.signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(()=> 
        {
          this.setState({ email:'', password:'', isIncorrect:false });
          this.props.navigation.navigate('ThreeWayNavigation');
        })
      .catch(()=>
        {
          this.setState({ email:'', password:'', isIncorrect:true });
        })
      
  }  
  

  render()
  {

    return ( 
      <KeyboardShift>
        {() => (
      <View style={styles.container}>
      
              <View style={styles.logoContainer}>          
                    <Image style={styles.logo} source={require('./pictures/logo.png')} />
                    <Text style={styles.title}>Let the world work for you</Text>  
              </View>    

              { this.state.isIncorrect ? <Text style={styles.error}>Your email or password is incorrect!</Text>  : null }
              <TextInput
                    value={this.state.email}
                    onChangeText={(email) => this.setState({ email })}
                    placeholder="email@example.com"
                    style={styles.input}
                    autoFocus={true}
                    keyboardType={"email-address"}
              />
            
              <TextInput
                    value={this.state.password}
                    onChangeText={(password) => this.setState({ password })}
                    placeholder={'Password'}
                    secureTextEntry={true}
                    style={styles.input}
                />  
            
              <Button
                    title="Login "
                    color="#00bfff"
                    onPress={ this.loginHandler }          
              />

              <Text style={styles.text}>Join Resolve Today.</Text>

              <Button
                      title="Sign Up "
                      color="#00bfff"
                      onPress={() => 
                        //navigation prop is passed to every component in stack navigator. Use navigate function with name of the route u want to go to 
                        this.props.navigation.navigate('Signup')
                      }
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
  error:{
    color: 'red',
    margin: 7,
    fontSize: 16,
    

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
    margin: 15,
    marginTop:40,
    fontWeight:'bold',
    fontSize: 15,
  },
});