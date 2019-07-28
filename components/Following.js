import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import Search from './util/Search';
import Firebase from './Firebase';
import { NavigationEvents } from "react-navigation";

export default class Following extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      following: [],
      userid: 'mPt8LR6r25W8kXBTLUDDLBcxmOx1',
      userDocid: '5oIlxvY2KqR821GAuM6Z',
      otherUserid:'',
      followingList: [],    //list of id's
      isFollowing: true
    };
  }
   
  componentDidMount() {

    //Firebase.init();
    collectionRef = Firebase.store.collection('users');
    let images = [];
    let obj = {};
    let object = {};
    userid = 'mPt8LR6r25W8kXBTLUDDLBcxmOx1';
    docid = '5oIlxvY2KqR821GAuM6Z';


    //followingUserList array contains a list of following id's 
    let listener = collectionRef.doc(this.state.userDocid).collection('following_followers')
      .onSnapshot(snapshot => {
        console.log("=========>triggered!");
        let followingUserList = [];
        if (snapshot.empty) {
          console.log("Following none");
        }
        snapshot.forEach(doc => {
          if (doc.data().following == true) {
            followingUserList.push(doc.data().other_user_id);
          }
        });

        this.setState({
          followingList: [...followingUserList]
        });
        console.log("=========>followingUserList!", this.state.followingList);
        //fetching the following people
    collectionRef.onSnapshot(snapshot => {
      let followingUserList = [];
      if (snapshot.empty) {
        console.log("No items to show");
      }
      snapshot.forEach(doc => {
        if (this.state.followingList.includes(doc.data().user_id)) {
          obj = {
            id: doc.id,
            name: doc.data().first_name + ' ' + doc.data().last_name,
            url: doc.data().profile_pic.url_link,
            username: doc.data().username,
            user_id: doc.data().user_id
          }
          followingUserList.push(obj);
          //Alert.alert(images[0]['user_id']);
        }
      });

      this.setState({
        following: [...followingUserList]
      });

    })
      })


    


  }

  ButtonClickCheckFunction = (user_id, followingStatus) => {
    let { followingList } = this.state;
    if(followingStatus){
      var index = followingList.indexOf(user_id);
      followingList.splice(index, 1);
      this.setState({ followingList })
      console.log("followingList!", this.state.followingList);
    }
    else{
      Firebase.store.collection("users").doc(this.state.userDocid).collection('following_followers').doc('yeo3BG82fmQAa5VvwZopIEMj5pb2')
      .update({
        following: true,
        time_following: new Date()
      })
      .then(() => {console.log("followingList!", this.state.followingList); })
      .catch(() => { })
      
    }
    
    

    // Firebase.store.collection("users").doc(docid).collection('following_followers').doc(user_id).set({
    //     follower:false,
    //     following:true,
    //     other_user_id: user_id,
    //     time_following: new Date()

    //   });

    //   Firebase.store.collection("users").doc(id).collection('following_followers').doc(userid).set({
    //     follower:true,
    //     following:false,
    //     other_user_id: userid,
    //     time_follower: new Date()

    //   });
  }

  componentWillUnmount() {
    listener();

    

    //   let {image, followingList} = this.state;

    // image.forEach((user)=>{
    //   if(followingList.includes(user.user_id)){
    //     console.log(user.user_id,' is still being followed');
    //   }
    //   else{
    // Firebase.store.collection("users").doc('5oIlxvY2KqR821GAuM6Z').collection('following_followers').doc('yeo3BG82fmQAa5VvwZopIEMj5pb2').update({
    //   following:false,           
    //   //time_following: Firebase.firestore.FieldValue.delete()

    // }).then(()=>{
    //   console.log("=====unfollowed");
    // });
    //     Firebase.store.collection("users").doc('Ru8wlOXVRxZD0Z23igcz').collection('following_followers').doc('mPt8LR6r25W8kXBTLUDDLBcxmOx1').update({
    //       follower:false,           
    //       time_follower: firebase.firestore.FieldValue.delete()

    //     });
    //     console.log(user.user_id,' is now unfollowed');
    //   }
    // })
  }

  render() {
    return (
      <View>
        <NavigationEvents  
        //For now, it it has been done only for a single entry    
                onDidBlur={() => {
                  Firebase.store.collection("users").doc(this.state.userDocid).collection('following_followers').doc('yeo3BG82fmQAa5VvwZopIEMj5pb2')
                  .update({
                    following: false,
                    time_following: null
                  })
                  .then(() => { console.log("---------->successfully unfollowed!") })
                  .catch(() => { })
            
                }}
              />

        <Search name="Zoe's" action='following' />
        <FlatList
          extraData={this.state}
          data={this.state.following}
          renderItem={({ item }) => (

            <View style={styles.PrimaryContainer}>

              <View style={styles.Avatar}>
                <Avatar
                  rounded
                  size="medium"
                  source={{
                    uri: item.url,
                  }}
                />
              </View>
              <View style={styles.NameContainer}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.username}>@{item.username}</Text>

              </View>
              {/* {
                              Firebase.store.collection("users").doc(docid).collection('following_followers').doc(item.user_id)
                                .get()
                                .then(snapshot => {   

                                    // if (snapshot.empty) {
                                    //    console.log("No items to show");
                                    // }  
                                    // else{
                                    //     snapshot.forEach(doc => {
                                    //     isFollowing = doc.following;
                                    //     })
                                    // }
                                    
                                })
                                .catch(err => {
                                    console.log("Error fetching images");
                                })
                            } */}
              <View style={styles.FollowButton}>

                <TouchableOpacity
                  style={styles.SubmitButtonStyle}
                  activeOpacity={.5}
                  onPress={() => {
                    let followingStatus = this.state.followingList.includes(item.user_id);
                    this.ButtonClickCheckFunction(item.user_id, followingStatus)
                  }
                  }

                >
                  <Text style={styles.TextStyle}>
                    {this.state.followingList.includes(item.user_id) ? 'Unfollow' : 'Follow'}
                  </Text>
                </TouchableOpacity>
              </View>

            </View>

          )}
          numColumns={1}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({

  MainContainer: {
    flex: 1,
    paddingTop: 15,
  },

  PrimaryContainer: {
    margin: 5,
    flexDirection: 'row',
    //borderWidth: 1,
    padding: 7,
    //borderColor:'gray',
    borderBottomColor: '#D3D3D3',
    borderBottomWidth: 1,

  },

  Avatar: {
    width: 60
  },
  NameContainer: {
    // flex: 1, 
    marginLeft: 10,
    // flexDirection: 'column',
    width: 130,
    height: 60,


  },
  title:
  {
    color: 'black',
    margin: 15,
    fontSize: 25,
    fontWeight: 'bold'
  },
  name:
  {
    color: 'black',
    //   margin: 15,
    fontSize: 15,
    fontWeight: 'bold'
  },
  username:
  {
    color: 'black',
    //   margin: 15,
    fontSize: 15,

  },
  FollowButton: {
    width: 230,
    // flex: 1,
    // justifyContent: 'center',
    // backgroundColor: '#F5FCFF',
  },

  SubmitButtonStyle: {


    marginTop: 7,
    paddingTop: 12,
    paddingBottom: 12,
    marginLeft: 35,
    marginRight: 65,
    backgroundColor: '#00bfff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#fff'
  },

  TextStyle: {
    color: '#fff',
    textAlign: 'center',
  }

});







