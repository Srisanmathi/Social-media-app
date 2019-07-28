import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import Firebase from './Firebase';
import { Text, View, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';


export default class Interests extends Component {

    constructor(props) {
        super(props);
        this.state = {
            interest: "",
            items: [],
            image: [],
            userid: 'mPt8LR6r25W8kXBTLUDDLBcxmOx1'
        };
    }
   
    componentDidMount() {
        //Firebase.init();
        let collectionRef = Firebase.store.collection('interests');

        let obj = {};

        unsubscribe = collectionRef.where('userid', '==', this.state.userid)
            .onSnapshot(snapshot => {
                let images = [];

                if (snapshot.empty) {
                    console.log("No interests to show");
                }
                snapshot.forEach(doc => {
                    obj = {
                        doc_id: doc.id,
                        interest: doc.data().interest
                    }
                    images.push(obj);

                });
                this.setState({
                    image: images
                });
            })
    }

    handleAddInterest = () => {
        Firebase.store.collection("interests")
            .add({
                interest: this.state.interest.toLowerCase(),
                case_interest: this.state.interest,
                userid: this.state.userid
            })
            .then(() => {
                this.setState({ interest: "" })
            })
            .catch(() => {
                console.log("error adding new interest")
            })
    };

    ButtonClick = (doc_id) => {
        Firebase.store.collection("interests")
            .doc(doc_id)
            .delete().then(function() {
                console.log("Document successfully deleted!");
            }).catch(function(error) {
                console.error("Error removing document: ", error);
            });
    }

    componentWillUnmount() {
        unsubscribe();
    }

    render() {

        return (

            <View style={styles.container}>


                <TextInput
                    value={this.state.interest}
                    onChangeText={(interest) => this.setState({ interest })}
                    placeholder="#interest"
                    style={styles.input}
                />
                <Button
                    title="Add Interest"
                    buttonStyle={styles.button}
                    onPress={() => this.handleAddInterest()}
                />




                <FlatList
                    extraData={this.state}
                    data={this.state.image}
                    renderItem={({ item }) => (
                        <View style={styles.PrimaryContainer}>


                            <Text style={styles.interestName}>{item.interest}</Text>

                            <TouchableOpacity
                                style={styles.SubmitButtonStyle}
                                activeOpacity={.5}
                                onPress={() => this.ButtonClick(item.doc_id)}
                            >
                                <Text style={styles.TextStyle}>   Unfollow   </Text>
                            </TouchableOpacity>


                        </View>

                    )}
                    numColumns={1}
                    keyExtractor={(item, index) => item.id}

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
    add: {
        flex: 1,
        margin: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

    },
    input: {
        width: 250,
        height: 44,
        padding: 10,
        margin: 10,
        borderWidth: 1,
        borderColor: 'black',

    },

    button: {
        height: 44
    },
    PrimaryContainer: {
        flex: 1,
        margin: 10,
        padding: 5,
        width: 400,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: '#D3D3D3',
        borderBottomWidth: 1,


    },


    NameContainer: {
        flex: 1,
        // marginLeft: 10,
        // // flexDirection: 'column',
        // width: 130,
        // height:60,


    },
    title:
    {
        color: 'black',
        margin: 15,
        fontSize: 30,
        fontWeight: 'bold'
    },
    interestName:
    {
        color: 'black',
        margin: 10,
        fontSize: 15,
        fontWeight: 'bold',

    },
    username:
    {
        color: 'black',
        //   margin: 15,
        fontSize: 15,

    },
    FollowButton: {
        width: 130,
        // flex: 1,
        // justifyContent: 'center',
        // backgroundColor: '#F5FCFF',
    },

    SubmitButtonStyle: {
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#00bfff',
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#fff'
    },

    TextStyle: {
        color: '#fff',
        textAlign: 'center',
    }
});      