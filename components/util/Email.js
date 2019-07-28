import React, {Component} from 'react';
import { StyleSheet, Image, Text, TextInput, View, Button, Alert } from 'react-native';

export default class Email extends Component{
    constructor(props)
    {
        super(props);
    }
    
    render(){
        return(
            <TextInput
                value={this.props.email}
                onChangeText={this.props.action}
                placeholder="Email"
                style={styles.input}
            />  
        )
    }

}
const styles = StyleSheet.create({
    
    input: {
      width: 200,
      height: 44,
      padding: 10,
      borderWidth: 1,
      borderColor: 'black',
      margin: 20,
    },
    
  });
