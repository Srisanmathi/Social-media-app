import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Button, Image, Alert } from 'react-native';
import Firebase from './Firebase';
import KeyboardShift from './util/KeyboardShift'; 

export default class Signup extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      confirm_password: '',
      username_avail: "true",
      datas:""
    };
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

  render() {
    return (
      <KeyboardShift>
        {() => (
          <View style={styles.container}>
            <View style={styles.logoContainer}>
              <Image style={styles.logo} source={require('./pictures/logo.png')} />
              <Text style={styles.title}>You'll need a password</Text>
              <Text>{this.state.datas}</Text>
              <Text style={styles.text}>Make sure it's 6 characters or more</Text>
            </View>
            <TextInput
              value={this.state.username}
              onChangeText={(username) => {
                this.setState({ username } );                
              }}
              placeholder="Username"
              style={styles.input}
            />


            <TextInput
              value={this.state.password}
              onChangeText={(password) => this.setState({ password })}
              placeholder="Password"
              secureTextEntry={true}
              style={styles.input}
            />

            <TextInput
              value={this.state.confirm_password}
              onChangeText={(confirm_password) => this.setState({ confirm_password })}
              placeholder="Confirm Password"
              secureTextEntry={true}
              style={styles.input}
            />


            <Button
              title="Sign Up "
              color="#00bfff"
              onPress={() => {

                try {

                  const { first_name, last_name, email, birthday } = Firebase.registrationInfo;

                  let citiesRef = Firebase.store.collection('Users');
                  citiesRef.where('case_username', '==', this.state.username.toLowerCase()).get()
                      .then(snapshot => {
                          if (snapshot.empty) {
                            
                        }  

                        snapshot.forEach(doc => {
                          Alert.alert("Username is already taken")
                        });
                      })
                      .catch(err => {
                        
                      });

                  if (this.state.password != this.state.confirm_password) {
                    Alert.alert('Passwords does not match');
                  }
                  else if (this.state.password.length < 6) {
                    Alert.alert('Password should be atleast 6 characters long');
                  }
                  else {


                    Firebase.auth.createUserWithEmailAndPassword(email, this.state.password)
                      .then((data) => {
                        Firebase.store.collection("users").add({
                          first_name: first_name,
                          last_name: last_name,
                          username: this.state.username,
                          user_id: data.user.uid,
                          case_username: this.state.username.toLowerCase(),
                          cover_photo: {
                            content_id: "base_cover_photo",
                            url_link: "https://firebasestorage.googleapis.com/v0/b/resolve-78171.appspot.com/o/profile%20pic%2Fbase_images%2Fbright-bulb-close-up-1166643.jpg?alt=media&token=393e1bb4-24a4-418c-87d9-56c60b0def70"
                          },
                          profile_pic: {
                            content_id: "base_profile_pic",
                            url_link: "https://firebasestorage.googleapis.com/v0/b/resolve-78171.appspot.com/o/profile%20pic%2Fbase_images%2Fperson.png?alt=media&token=bdd1ef64-6487-4612-9827-7fd068f3f15e"
                          }
                        });
                        Firebase.store.collection("birthdays").add({
                          birthday: birthday,
                          visible: false,
                          user_id: data.user.uid

                        });


                        this.props.navigation.navigate('InitialInterests');
                      })

                  }
                } catch (e) {
                  Alert.alert(e);
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
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    margin: 20,
  },
  text: {
    marginTop: 15
  },
});