import React, { Component } from 'react';
import Firebase from './Firebase';
import {
    StyleSheet,
    View,
    FlatList,
    Image,
    Text,
    Alert,
    TouchableOpacity
} from 'react-native';
import CheckBox from 'react-native-check-box';

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

export default class InitialInterests extends Component {
    constructor() {
        super();
        this.state = {
            datas: "",
            interest : [],
            selectedInterests:  [],
            userid:'mPt8LR6r25W8kXBTLUDDLBcxmOx1'
        };
    }
    componentDidMount() {
        Firebase.init();
        let collectionRef = Firebase.store.collection('initial_interests');
        let images =[];
        let obj={};
   
        collectionRef.get()
            .then(snapshot => {   

                if (snapshot.empty) {
                   console.log("No items to show");
                }  
                snapshot.forEach(doc => {                
                    obj = {
                        id: doc.id,
                        src: doc.data().url
                    }
                    images.push(obj);             
                   
                });
                this.setState({ 
                    interest: images
                });
            })
            .catch(err => {
                console.log("Error fetching images");
            });
    }
    onPress = () => {
        this.state.selectedInterests.forEach((i)=>{
            
            Firebase.store.collection("interests")
            .add({
                interest: i.toLowerCase(),
                case_interest:i,
                userid:this.state.userid
            })
            .then(()=>{ 
              this.props.navigation.navigate('ThreeWayNavigation');
              })
            .catch(()=>{  })
        })
         

      }
    
    render() {       
        return (
            <View style={styles.MainContainer}>
                <View style={styles.header}>
                    <Text style={styles.title}>Follow interests ({this.state.selectedInterests.length})</Text>
                    
                    <TouchableOpacity
                    
                      disabled={this.state.selectedInterests.length > 2 ? false : true}
                      style={styles.button}
                      onPress={this.onPress}
                    >
                        <Text style={styles.nextText}> Next </Text>
                    </TouchableOpacity>
                </View>
                

                <FlatList
                    extraData={this.state}
                    data={this.state.interest}
                    renderItem={({ item }) => (
                        <View style={styles.grid}>
                            <Image
                                style={styles.imageThumbnail}
                                source={{ uri: item.src }}
                            />
                            <View style={styles.captionHolder}>
                                <Text style={styles.caption}>{item.id}</Text>
                                

                                <CheckBox    
                                    onClick={()=>{
                                        if(this.state.selectedInterests.includes(item.id)){}
                                        else{
                                            this.setState({ selectedInterests: [...this.state.selectedInterests, item.id] });
                                        }
                                        
                                    }}
                                    
                                    isChecked={                                         
                                          this.state.selectedInterests.includes(item.id)                                       
                                    }       
                                />
                            </View>
                        </View>
                    )}
                    numColumns={2}
                    keyExtractor={(item, index) => index}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    MainContainer: {
        justifyContent: 'center',
        flex: 1,
        paddingTop: 15,
    },
    header:{
        flexDirection: 'row',
        justifyContent:'space-around',
        
        padding: 5,
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#00bfff',
        padding: 10,
        margin:10,
        justifyContent:'center'
      },
    SubmitButtonStyle: { 
  
        marginTop:7,
       paddingTop:12,
       paddingBottom:12,
        marginLeft:35,
        marginRight:65,
       backgroundColor:'#00bfff',
       borderRadius:20,
       borderWidth: 1,
       borderColor: '#fff'
     },
     
    title:
    {
        color: 'black',
        margin: 15,
        fontSize: 25,
        fontWeight: 'bold'
    },
    grid: {
        flex: 1,
        flexDirection: 'column',
        margin: 10,
        backgroundColor: '#D3D3D3',
        padding: 5
    },
    captionHolder: {
        flex: 1,
        flexDirection: 'row',
        margin: 5,
        justifyContent:'space-around'
    },
    imageThumbnail: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 200,
    },
    caption: {
        color: 'black',
         fontSize: 20
    },
    nextText:
    {
        color: 'white',
        fontSize: 15,
        
    }
});



