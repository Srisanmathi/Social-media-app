import React, { Component } from 'react';
import Firebase from './Firebase';
import { Avatar } from 'react-native-elements';
import { Text, View, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';

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


export default class Inbox extends Component {

    //for header
    static navigationOptions = {
        title: 'Inbox',
        headerStyle: {
            backgroundColor: '#00bfff',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };
    constructor(props) {
        super(props);
        this.state = {
            inboxes: [],
            userid: 'mPt8LR6r25W8kXBTLUDDLBcxmOx1'
        };
    }
    componentDidMount() {
        //Firebase.init();
        ref = Firebase.database.ref('Inboxes/inbox');

        listener = ref.on('value',
            (data) => {
                let inbox = [];
                let val = data.val();    //data.val() is an object
                let keys = Object.keys(val);       //keys is an array containing keys                
                keys.forEach((key) => {
                    let obj = {
                        conv_name: val[key].conv_name,
                        conv_pic: val[key].pic,
                        last_message: val[key].last_message,
                        time_of_LM: val[key].time_of_LM,
                        conv_id: key
                    }

                    inbox.push(obj);
                })
                this.setState({
                    inboxes: inbox
                })
            },
            (err) => {
                console.log("error", err);
            });

    }

    clickFunction = (conv_id, conv_name) => {
        this.props.navigation.navigate('Chat', {
            conv_id: conv_id,
            conv_name: conv_name
        });

    };
    addNewMessage = () => {
        this.props.navigation.navigate('NewMessage');
    };

    formatAMPM(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }

    date_diff_indays = (dt1, dt2) => {
        let difference = Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (1000 * 60 * 60 * 24));
        if (difference == 0) {
            return this.formatAMPM(dt1);
        }
        else if (difference == 1) {
            return 'yesterday';
        }
        else {
            return dt1.toLocaleDateString();
        }
    }

    componentWillUnmount() {
        listener.off();
    }

    render() {

        return (

            <View style={styles.container}>
                <FlatList
                    extraData={this.state}
                    data={this.state.inboxes}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.click}
                            activeOpacity={.5}
                            onPress={() => this.clickFunction(item.conv_id, item.conv_name)}
                        >
                            <View style={styles.profileContainer}>

                                <View style={styles.avatarNameLastMessContainer}>
                                    <Avatar
                                        rounded
                                        size="medium"
                                        // source={{
                                        //     uri:
                                        //       'https://placeimg.com/140/140/any',
                                        //   }}
                                        source={require('./ProfilePic.png')}

                                    />
                                    <View style={styles.nameLastMessContainer}>
                                        <Text style={styles.title}>{item.conv_name}</Text>
                                        <Text>{item.last_message}</Text>
                                    </View>

                                </View>

                                {/* item.time_of_LM - milliseconds since 1970
                                new Date(item.time_of_LM) - converts to javascript date object
                                new Date(item.time_of_LM).toLocaleDateString() - convert into MM/DD/YY  format */}

                                <Text> {this.date_diff_indays(new Date(item.time_of_LM), new Date())}  </Text>
                            </View>
                        </TouchableOpacity>


                    )}
                    numColumns={1}
                    keyExtractor={(item, index) => index.toString()}
                //creates problem while deleting. Give a unique key then
                />

                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={this.addNewMessage}
                    style={styles.TouchableOpacityStyle}>
                    <Image
                        //We are making FAB using TouchableOpacity with an image
                        //We are using online image here
                        source={{
                            uri: 'http://aboutreact.com/wp-content/uploads/2018/08/bc72de57b000a7037294b53d34c2cbd1.png',
                        }}
                        //You can use you project image Example below
                        //source={require('./images/float-add-icon.png')}
                        style={styles.FloatingButtonStyle}
                    />
                </TouchableOpacity>


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
    click: {
        padding: 10,
        borderBottomColor: '#D3D3D3',
        borderBottomWidth: 1,
    },

    profileContainer:
    {
        flex: 1,
        padding: 5,
        width: 400,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",

    },
    avatarNameLastMessContainer:
    {
        flex: 1,
        padding: 5,
        marginLeft: 10,
        width: 400,
        flexDirection: 'row',
        alignItems: "center",

    },
    nameLastMessContainer:
    {
        marginLeft: 10,
    },

    title:
    {
        color: 'black',
        marginBottom: 5,
        fontSize: 16,
        fontWeight: 'bold'
    },

    username:
    {
        color: 'black',
        fontSize: 15,

    },
    TouchableOpacityStyle: {
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,

    },

    FloatingButtonStyle: {
        resizeMode: 'contain',
        width: 50,
        height: 50,

    },
});      