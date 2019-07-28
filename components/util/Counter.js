import Firebase from '../Firebase';

//Used in Chat.js to increment the chat number in Inboxes/inb_messages in real-time database

export default function Counter(conv_id) {

    return new Promise((resolve, reject) => {
      Firebase.database.ref('Inboxes/inbox/' + conv_id).once('value',
        (data) => {  
           num = data.val().num_messages;
        })
        .then(() => resolve(num))
        .catch(() => reject('failed'));
  
    });
  
  }